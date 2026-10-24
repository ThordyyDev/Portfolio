/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowUpRight,
  ArrowUp,
  Github,
  Mail,
  Check,
  Copy,
  SlidersHorizontal,
  X,
  Home,
  Briefcase,
  Cpu,
  MessageSquare,
  Quote,
} from 'lucide-react';
import {
  INITIAL_PROFILE,
  INITIAL_CASE_STUDIES,
  SKILL_GROUPS,
  PortfolioProfile,
  CaseStudy,
} from './data/portfolioData';
import { CaseStudyModal } from './components/CaseStudyModal';
import { ScrambleText, useScramble } from './components/ScrambleText';
import { CursorTrailZone } from './components/CursorTrailZone';

interface NavItemData {
  id: string;
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const NAV_ITEMS: NavItemData[] = [
  { id: 'home', label: 'Home', href: '#', icon: Home },
  { id: 'works', label: 'Works', href: '#works', icon: Briefcase },
  { id: 'tech-stack', label: 'TechStack', href: '#tech-stack', icon: Cpu },
  { id: 'contact', label: 'Contact', href: '#contact', icon: MessageSquare },
];

function NavTabItem({
  item,
  isActive,
  isHovered,
  onMouseEnter,
  onMouseLeave,
  onClick,
}: {
  item: NavItemData;
  isActive: boolean;
  isHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick: (e: React.MouseEvent) => void;
}) {
  const Icon = item.icon;

  return (
    <a
      href={item.href}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`relative flex-1 inline-flex items-center justify-center gap-1 sm:gap-2 px-1.5 sm:px-5 py-1.5 sm:py-2 text-[11px] sm:text-sm font-medium rounded-full whitespace-nowrap select-none transition-colors duration-200 overflow-hidden ${
        isActive
          ? 'text-black font-semibold'
          : isHovered
          ? 'text-white'
          : 'text-zinc-400'
      }`}
    >
      {/* Active White Pill — Locked on Home */}
      {isActive && (
        <motion.div
          layoutId="nav-active-pill"
          className="absolute inset-0 bg-white rounded-full shadow-sm"
          transition={{ type: 'spring', stiffness: 420, damping: 32 }}
        />
      )}

      {/* Hover Pill — Smooth Glide */}
      {isHovered && !isActive && (
        <motion.div
          layoutId="nav-hover-pill"
          className="absolute inset-0 bg-zinc-800/80 rounded-full"
          transition={{ type: 'spring', stiffness: 420, damping: 32 }}
        />
      )}

      <span className="relative z-10 inline-flex items-center gap-1 sm:gap-2 whitespace-nowrap leading-none">
        <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
        <span className="whitespace-nowrap">{item.label}</span>
      </span>
    </a>
  );
}

function DisciplineHeader({
  groupIndex,
  domain,
  description,
}: {
  groupIndex: string;
  domain: string;
  description: string;
}) {
  return (
    <div className="space-y-2 pb-4 border-b border-zinc-800 cursor-default select-none">
      <span className="text-xs font-mono text-zinc-500 tabular-nums">
        DISCIPLINE {groupIndex}
      </span>
      <h3 className="font-display text-xl font-bold text-white tracking-tight">
        {domain}
      </h3>
      <p className="text-xs text-zinc-400 leading-relaxed">
        {description}
      </p>
    </div>
  );
}

function SkillRowItem({
  skill,
  isSelected,
  onSelect,
}: {
  skill: { name: string; proficiency: string; years: string };
  isSelected: boolean;
  onSelect: () => void;
}) {
  const { displayed, trigger } = useScramble(skill.name, { duration: 360, speed: 20 });

  return (
    <button
      type="button"
      onClick={onSelect}
      onMouseLeave={() => trigger()}
      className={`w-full py-3 px-2 flex items-center justify-between text-left transition-colors rounded cursor-pointer select-none ${
        isSelected
          ? 'bg-white text-black font-medium'
          : 'hover:bg-zinc-900/80 text-zinc-200'
      }`}
    >
      <span className="text-sm font-medium whitespace-nowrap">
        {displayed}
      </span>
      <div
        className={`flex items-center gap-2 text-xs font-mono tabular-nums ${
          isSelected ? 'text-black' : 'text-zinc-400'
        }`}
      >
        <span>{skill.proficiency}</span>
        <span aria-hidden="true">·</span>
        <span>{skill.years}</span>
      </div>
    </button>
  );
}

function PortraitCard({ profile }: { profile: PortfolioProfile }) {
  const { displayed, trigger } = useScramble(profile.name, { duration: 420, speed: 20 });

  return (
    <div
      onMouseEnter={() => trigger()}
      onMouseLeave={() => trigger()}
      className="relative w-full max-w-sm sm:max-w-md lg:max-w-none h-[340px] sm:h-[440px] lg:h-full rounded-2xl overflow-hidden border border-zinc-800 bg-[#09090b] flex flex-col justify-between group shadow-2xl cursor-default"
    >
      {/* Portrait Image */}
      <img
        src={profile.portraitUrl}
        alt={`${profile.name} portrait`}
        referrerPolicy="no-referrer"
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
      />

      {/* Gradient Scrim */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent pointer-events-none" />

      {/* Clean Bottom Label with Scramble Effect */}
      <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 flex items-center justify-between gap-2 text-xs text-zinc-300">
        <span
          onMouseEnter={(e) => {
            e.stopPropagation();
            trigger();
          }}
          className="font-mono text-[11px] text-zinc-300 hover:text-white transition-colors truncate tracking-wide"
        >
          {displayed}
        </span>
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 sm:px-2.5 sm:py-1 text-[10px] font-mono rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 whitespace-nowrap shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Available for Roles
        </span>
      </div>
    </div>
  );
}

const INQUIRY_OPTIONS = [
  'Frontend / Web Dev',
  'Full-Stack / Backend',
  'Internship / Collab',
];

function InquiryTypeItem({
  scope,
  isActive,
  isHovered,
  onMouseEnter,
  onMouseLeave,
  onSelect,
}: {
  scope: string;
  isActive: boolean;
  isHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`relative px-3 py-2.5 text-xs font-medium rounded-lg text-center cursor-pointer select-none transition-colors duration-200 overflow-hidden flex items-center justify-center whitespace-nowrap ${
        isActive
          ? 'text-black font-semibold'
          : isHovered
          ? 'text-white'
          : 'text-zinc-400'
      }`}
    >
      {/* Active White Pill with Smooth Spring Physics */}
      {isActive && (
        <motion.div
          layoutId="inquiry-active-pill"
          className="absolute inset-0 bg-white rounded-lg shadow-sm"
          transition={{ type: 'spring', stiffness: 420, damping: 32 }}
        />
      )}

      {/* Hover Pill — Smooth Glide */}
      {isHovered && !isActive && (
        <motion.div
          layoutId="inquiry-hover-pill"
          className="absolute inset-0 bg-zinc-800/80 rounded-lg"
          transition={{ type: 'spring', stiffness: 420, damping: 32 }}
        />
      )}

      <span className="relative z-10 block whitespace-nowrap tracking-normal font-medium leading-none">
        {scope}
      </span>
    </button>
  );
}

export default function App() {
  const [profile, setProfile] = useState<PortfolioProfile>(INITIAL_PROFILE);
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>(INITIAL_CASE_STUDIES);

  // Synchronize state directly with code changes and clean up old cache
  useEffect(() => {
    try {
      localStorage.clear();
    } catch {
      // ignore
    }
    setProfile(INITIAL_PROFILE);
    setCaseStudies(INITIAL_CASE_STUDIES);
  }, []);

  const [activeNav, setActiveNav] = useState('home');
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const [hoveredScope, setHoveredScope] = useState<string | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Auto-track active navigation tab on scroll & manage scroll-to-top visibility
  useEffect(() => {
    const handleScroll = () => {
      // Show scroll-to-top button only when scrolled down past 350px
      setShowScrollTop(window.scrollY > 350);

      const scrollPos = window.scrollY + 200;
      const contactEl = document.getElementById('contact');
      const techEl = document.getElementById('tech-stack');
      const worksEl = document.getElementById('works');

      if (contactEl && scrollPos >= contactEl.offsetTop) {
        setActiveNav('contact');
      } else if (techEl && scrollPos >= techEl.offsetTop) {
        setActiveNav('tech-stack');
      } else if (worksEl && scrollPos >= worksEl.offsetTop) {
        setActiveNav('works');
      } else {
        setActiveNav('home');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [activeSkillFilter, setActiveSkillFilter] = useState<string | null>(
    null
  );
  const [selectedStudy, setSelectedStudy] = useState<CaseStudy | null>(null);

  // Contact form state
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactScope, setContactScope] = useState('Full-Stack / Backend');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);

  const handleUpdateStudyImage = (studyId: string, newImageUrl: string) => {
    setCaseStudies((prev) =>
      prev.map((s) => (s.id === studyId ? { ...s, imageUrl: newImageUrl } : s))
    );
    setSelectedStudy((prev) =>
      prev && prev.id === studyId ? { ...prev, imageUrl: newImageUrl } : prev
    );
  };

  const handleAddCaseStudy = (newStudy: CaseStudy) => {
    setCaseStudies((prev) => [newStudy, ...prev]);
  };

  const handleSelectSkill = (skillName: string) => {
    if (activeSkillFilter === skillName) {
      setActiveSkillFilter(null);
    } else {
      setActiveSkillFilter(skillName);
      setActiveCategory('All');
      const worksEl = document.getElementById('works');
      if (worksEl) {
        worksEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 1800);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName.trim() || !contactEmail.trim() || !contactMessage.trim())
      return;
    setContactSubmitted(true);
  };

  // Portrait CSS filter classes
  const portraitFilterClass = {
    'leica-mono': 'grayscale contrast-125 brightness-95',
    'silver-gelatin': 'grayscale contrast-110 brightness-105',
    'high-contrast': 'grayscale contrast-150 brightness-90',
    natural: '',
  }[profile.portraitFilter];

  // Filtered Case Studies
  const filteredStudies = caseStudies.filter((study) => {
    const matchesCategory =
      activeCategory === 'All' || study.category === activeCategory;
    const matchesSkill =
      !activeSkillFilter ||
      study.skills.some(
        (s) => s.toLowerCase() === activeSkillFilter.toLowerCase()
      );
    return matchesCategory && matchesSkill;
  });

  const categories = [
    'All',
    'Web Development',
    'Mobile Development',
    'Game Development',
  ];

  const resolveImgSrc = (url: string) => {
    if (!url) return '';
    if (
      url.startsWith('http://') ||
      url.startsWith('https://') ||
      url.startsWith('data:') ||
      url.startsWith('/')
    ) {
      return url;
    }
    return `/${url}`;
  };

  return (
    <div className="min-h-screen grid-bg text-[#FAFAFA] font-sans selection:bg-white selection:text-black overflow-x-hidden">
      {/* NAV BAR — Extended Harmonious Floating Dock */}
      <header className="sticky top-0 z-40 bg-[#050505]/85 backdrop-blur-md border-b border-zinc-800/60 py-2.5 sm:py-3.5 px-3 sm:px-6">
        <div className="max-w-[1200px] mx-auto flex items-center justify-center">
          <nav
            aria-label="Primary Navigation"
            onMouseLeave={() => setHoveredNav(null)}
            className="w-full max-w-[620px] flex items-center justify-between p-1.5 rounded-full bg-zinc-950/85 border border-zinc-800/90 backdrop-blur-xl shadow-[0_10px_35px_-5px_rgba(0,0,0,0.7),0_0_0_1px_rgba(255,255,255,0.04)]"
          >
            {NAV_ITEMS.map((item) => (
              <NavTabItem
                key={item.id}
                item={item}
                isActive={item.id === 'home'}
                isHovered={hoveredNav === item.id}
                onMouseEnter={() => setHoveredNav(item.id)}
                onMouseLeave={() => {}}
                onClick={(e) => {
                  if (item.href === '#') {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
              />
            ))}
          </nav>
        </div>
      </header>

      <main>
        {/* SPLIT-SCREEN HERO & FULL-WIDTH METRICS STRIP */}
        <section className="pt-8 pb-14 sm:pt-16 sm:pb-24 border-b border-zinc-800/80">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-10 sm:space-y-16">
            {/* 2-Column Split with items-stretch */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
              {/* Left Column: Typographic Hierarchy */}
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-7 flex flex-col justify-between space-y-6 sm:space-y-8 py-1 sm:py-2"
              >
                <div className="space-y-4 sm:space-y-6">
                  {/* Clean Status & Role Kicker — Mobile Adaptive */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-2.5 text-xs font-mono">
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 w-fit">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Available for Projects & Internships
                    </span>
                    <div className="flex items-center gap-2 text-zinc-400 pl-0.5 sm:pl-0 text-[11px] sm:text-xs">
                      <span>Cebu, PH</span>
                      <span className="text-zinc-600" aria-hidden="true">·</span>
                      <span>Full-Stack, Mobile & Game Dev</span>
                    </div>
                  </div>

                  {/* Display Headline with Relaxed Leading & Harmonic Wrapping */}
                  <h1 className="font-display text-2xl sm:text-4xl lg:text-[3.2rem] font-bold tracking-tight text-white leading-[1.22] sm:leading-[1.18] [text-wrap:balance]">
                    Hi, I&apos;m ThordyyDev{' '}
                    <span className="text-zinc-400 font-normal">
                      — Building practical software with{' '}
                    </span>
                    <span className="font-serif italic font-normal text-zinc-100">
                      purpose and curiosity.
                    </span>
                  </h1>

                  {/* Lead Bio Prose */}
                  <p className="text-sm sm:text-[1.05rem] text-zinc-300 leading-relaxed max-w-[56ch]">
                    {profile.leadBio}
                  </p>
                </div>

                {/* Editorial Philosophy Card & Primary CTAs */}
                <div className="space-y-5 sm:space-y-6 pt-5 sm:pt-6 border-t border-zinc-800/80">
                  {/* High-Legibility Philosophy Callout Card */}
                  <div className="p-3.5 sm:p-4.5 rounded-xl bg-zinc-900/50 border border-zinc-800/80 backdrop-blur-sm flex items-start gap-3 shadow-sm">
                    <Quote className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <p className="text-xs sm:text-[0.925rem] text-zinc-200 font-sans leading-relaxed font-normal">
                        “{profile.editorialPhilosophy}”
                      </p>
                      <span className="text-[10px] sm:text-[11px] font-mono text-zinc-400 block tracking-wider uppercase">
                        Philosophy &amp; Approach
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons — Full Width Stack on Mobile, Inline on Desktop */}
                  <div className="grid grid-cols-1 sm:flex sm:items-center gap-2.5 sm:gap-3">
                    <a
                      href="#works"
                      className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold text-black bg-white rounded-lg hover:bg-zinc-200 transition-all shadow-sm whitespace-nowrap cursor-pointer"
                    >
                      Explore Works
                      <ArrowUpRight className="w-4 h-4" />
                    </a>

                    <a
                      href={profile.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-medium text-white bg-zinc-900 border border-zinc-800 rounded-lg hover:bg-zinc-800 hover:border-zinc-700 transition-all whitespace-nowrap"
                    >
                      <Github className="w-4 h-4" />
                      GitHub Profile
                    </a>

                    <a
                      href="#contact"
                      className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-medium text-zinc-300 border border-zinc-800 rounded-lg hover:bg-zinc-900 hover:text-white transition-all whitespace-nowrap"
                    >
                      <Mail className="w-4 h-4" />
                      Contact Me
                    </a>
                  </div>
                </div>
              </motion.div>

              {/* Right Column: Clean Author Portrait — Controlled Height on Mobile */}
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="lg:col-span-5 flex flex-col items-center justify-center"
              >
                <PortraitCard profile={profile} />
              </motion.div>
            </div>

            {/* Full-Width Quantitative KPI Row — 2x2 Grid on Mobile, 4 Columns on Desktop */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-8 pt-8 sm:pt-12 border-t border-zinc-800/80">
              {profile.metrics.map((m, idx) => (
                <div
                  key={idx}
                  className="p-3.5 sm:p-0 rounded-xl bg-zinc-900/40 sm:bg-transparent border border-zinc-800/60 sm:border-0 space-y-1"
                >
                  <div className="font-mono text-2xl sm:text-3xl md:text-4xl font-semibold text-white tabular-nums tracking-tight">
                    {m.value}
                  </div>
                  <div className="text-xs sm:text-sm font-medium text-zinc-200 line-clamp-1">
                    {m.label}
                  </div>
                  <div className="text-[11px] sm:text-xs text-zinc-500 font-mono line-clamp-1">
                    {m.timeframe}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SUBTLE ANIMATED MARQUEE SECTION DIVIDER */}
        <div
          aria-hidden="true"
          className="py-3.5 bg-[#09090b] border-b border-zinc-800/80 overflow-hidden select-none"
        >
          <div className="animate-marquee flex items-center gap-10 text-xs font-mono text-zinc-400 tracking-widest uppercase">
            <span>Web Development</span>
            <span>·</span>
            <span>Mobile Development</span>
            <span>·</span>
            <span>Game Development</span>
            <span>·</span>
            <span>TypeScript</span>
            <span>·</span>
            <span>PostgreSQL</span>
            <span>·</span>
            <span>Supabase</span>
            <span>·</span>
            <span>Python & Django</span>
            <span>·</span>
            <span>PHP & MySQL</span>
            <span>·</span>
            <span>C++ & C#</span>
            <span>·</span>
            <span>OOP Architecture</span>
            <span>·</span>
            <span>Responsive Web Design</span>
            <span>·</span>
            <span>Git & GitHub Workflow</span>
            <span>·</span>
            <span>Web Development</span>
            <span>·</span>
            <span>Mobile Development</span>
            <span>·</span>
            <span>Game Development</span>
            <span>·</span>
            <span>TypeScript</span>
            <span>·</span>
            <span>PostgreSQL</span>
            <span>·</span>
            <span>Supabase</span>
            <span>·</span>
            <span>Python & Django</span>
            <span>·</span>
            <span>PHP & MySQL</span>
            <span>·</span>
            <span>C++ & C#</span>
            <span>·</span>
            <span>OOP Architecture</span>
            <span>·</span>
            <span>Responsive Web Design</span>
            <span>·</span>
            <span>Git & GitHub Workflow</span>
          </div>
        </div>

        {/* 01. SELECTED WORKS & DETAILED PROJECT CASE STUDIES (DYNAMIC BENTO GRID) */}
        <CursorTrailZone>
        <section
          id="works"
          className="py-24 border-b border-zinc-800/80 scroll-mt-20"
        >
          <div className="max-w-[1200px] mx-auto px-6 space-y-12">
            {/* Section Header & Interactive Filter Controls */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-10 border-b border-zinc-800/80">
              <div className="space-y-3 max-w-2xl">
                <p className="text-xs font-mono text-zinc-400 tracking-wider">
                  01. SELECTED WORKS & PROJECTS
                </p>
                <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-white [text-wrap:balance]">
                  Featured Projects &{' '}
                  <span className="font-serif italic font-normal text-zinc-200">
                    Interactive Case Studies.
                  </span>
                </h2>
                <p className="text-sm md:text-base text-zinc-400 leading-relaxed">
                  Practical software implementations across Web Development, Mobile Apps, Game Engines, and Database Systems.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3.5 py-1.5 text-xs font-mono font-medium rounded-lg transition-all whitespace-nowrap cursor-pointer border ${
                      activeCategory === cat
                        ? 'bg-white text-black border-white shadow-sm font-semibold'
                        : 'bg-zinc-900/80 text-zinc-400 border-zinc-800/90 hover:text-white hover:border-zinc-700'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Active Skill Filter Notice */}
            {activeSkillFilter && (
              <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-700 text-xs">
                <div className="flex items-center gap-2 text-zinc-200">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-zinc-400" />
                  <span>
                    Filtering works by technical capability:{' '}
                    <strong className="text-white font-mono">
                      {activeSkillFilter}
                    </strong>
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveSkillFilter(null)}
                  className="inline-flex items-center gap-1 text-zinc-400 hover:text-white cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                  Clear Filter
                </button>
              </div>
            )}

            {/* Dynamic Bento Box Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredStudies.map((study, idx) => {
                const isWide = study.bentoSpan === 'wide';
                return (
                  <motion.article
                    key={study.id}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    whileHover={{ y: -4, transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] } }}
                    whileTap={{ scale: 0.985 }}
                    transition={{
                      duration: 0.45,
                      delay: idx * 0.05,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    onClick={() => setSelectedStudy(study)}
                    className={`group cursor-pointer rounded-2xl bg-[#09090b] border border-zinc-800/90 hover:border-zinc-500 transition-colors overflow-hidden flex flex-col justify-between ${
                      isWide ? 'md:col-span-2' : 'md:col-span-1'
                    }`}
                  >
                    {/* Media Showcase Container */}
                    <div className="relative aspect-video overflow-hidden bg-[#050505] border-b border-zinc-800/80">
                      <img
                        src={resolveImgSrc(study.imageUrl)}
                        alt={study.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />

                      <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs font-mono text-zinc-300 tabular-nums">
                        <span>
                          {study.index} · {study.category}
                        </span>
                        <span className="inline-flex items-center gap-1 text-white group-hover:translate-x-0.5 transition-transform">
                          Read Case Study
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>

                    {/* Editorial Body & Aligned Metadata */}
                    <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                      <div className="space-y-3">
                        {/* Top Metadata Row: Status Badge + Year / Read time */}
                        <div className="flex items-center justify-between gap-2 text-xs font-mono min-h-[24px]">
                          <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium border ${
                              study.status === 'Completed'
                                ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/25'
                                : 'bg-amber-500/10 text-amber-300 border-amber-500/25'
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                study.status === 'Completed'
                                  ? 'bg-emerald-400'
                                  : 'bg-amber-400 animate-pulse'
                              }`}
                            />
                            {study.status}
                          </span>

                          <div className="flex items-center gap-2 text-zinc-500 text-xs tabular-nums">
                            <span>{study.year}</span>
                            <span className="text-zinc-700">·</span>
                            <span>{study.readTime}</span>
                          </div>
                        </div>

                        <h3 className="font-display text-xl md:text-2xl font-bold text-white tracking-tight group-hover:text-zinc-200 transition-colors line-clamp-1">
                          {study.title}
                        </h3>

                        <p className="text-sm text-zinc-400 leading-relaxed line-clamp-2 h-10">
                          {study.summary}
                        </p>
                      </div>

                      {/* Unboxed Skill Taxonomy Line - Strict Single-Line Alignment */}
                      <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between gap-3 text-xs font-mono text-zinc-400">
                        <div className="flex items-center gap-1.5 overflow-hidden text-ellipsis whitespace-nowrap min-w-0">
                          {study.skills.slice(0, 3).map((skill, sIdx) => (
                            <React.Fragment key={skill}>
                              <span className="shrink-0">{skill}</span>
                              {sIdx < Math.min(study.skills.length, 3) - 1 && (
                                <span
                                  aria-hidden="true"
                                  className="text-zinc-600 shrink-0"
                                >
                                  ·
                                </span>
                              )}
                            </React.Fragment>
                          ))}
                          {study.skills.length > 3 && (
                            <span className="text-zinc-500 text-[11px] shrink-0 font-medium">
                              +{study.skills.length - 3}
                            </span>
                          )}
                        </div>

                        <a
                          href={study.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          aria-label={`GitHub repository for ${study.title}`}
                          className="text-zinc-400 hover:text-white transition-colors shrink-0 p-1 hover:bg-zinc-800 rounded-md"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>
        </CursorTrailZone>

        {/* 02. TECHNICAL STACK & SKILL MATRIX */}
        <section
          id="tech-stack"
          className="py-24 border-b border-zinc-800/80 scroll-mt-20"
        >
          <div className="max-w-[1200px] mx-auto px-6 space-y-14">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-10 border-b border-zinc-800/80">
              <div className="space-y-3 max-w-2xl">
                <p className="text-xs font-mono text-zinc-400 tracking-wider">
                  02. TECH STACK & CAPABILITIES
                </p>
                <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-white [text-wrap:balance]">
                  Technical Skills &{' '}
                  <span className="font-serif italic font-normal text-zinc-200">
                    Interactive Stack Matrix.
                  </span>
                </h2>
                <p className="text-sm md:text-base text-zinc-400 leading-relaxed">
                  Select any technical skill below to filter projects and case studies by that exact capability.
                </p>
              </div>

              {activeSkillFilter && (
                <button
                  type="button"
                  onClick={() => setActiveSkillFilter(null)}
                  className="px-3.5 py-2 text-xs font-mono text-black bg-white rounded-lg hover:bg-zinc-200 transition-colors whitespace-nowrap shrink-0 cursor-pointer self-start lg:self-auto"
                >
                  Active Filter: {activeSkillFilter} (Reset)
                </button>
              )}
            </div>

            {/* 3-Column Monograph Skill Matrix */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {SKILL_GROUPS.map((group) => (
                <div key={group.index} className="space-y-6">
                  <DisciplineHeader
                    groupIndex={group.index}
                    domain={group.domain}
                    description={group.description}
                  />

                  {/* Tabular Skill Rows with Text Scramble on Mouse Leave */}
                  <div className="divide-y divide-zinc-800/70">
                    {group.skills.map((skill) => (
                      <SkillRowItem
                        key={skill.name}
                        skill={skill}
                        isSelected={activeSkillFilter === skill.name}
                        onSelect={() => handleSelectSkill(skill.name)}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 03. DIRECT CONTACT */}
        <section id="contact" className="py-24 scroll-mt-20">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {/* Left Contact Column */}
              <div className="lg:col-span-6 space-y-8">
                <div className="space-y-3">
                  <p className="text-xs font-mono text-zinc-400 tracking-wider">
                    03. CONTACT & GET IN TOUCH
                  </p>
                  <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-white [text-wrap:balance]">
                    Let's Build Something{' '}
                    <span className="font-serif italic font-normal text-zinc-200">
                      Together.
                    </span>
                  </h2>
                  <p className="text-sm md:text-base text-zinc-400 leading-relaxed max-w-xl">
                    Available for internships, freelance web development, collaborative projects, or general inquiries.
                  </p>
                </div>

                {/* Direct Coordinates */}
                <div className="space-y-4 pt-4 border-t border-zinc-800/80">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-3 border-b border-zinc-800/60">
                    <span className="text-xs font-mono text-zinc-400">
                      ELECTRONIC MAIL
                    </span>
                    <div className="flex items-center gap-3">
                      <a
                        href={`mailto:${profile.email}`}
                        className="text-sm font-mono text-white hover:underline"
                      >
                        {profile.email}
                      </a>
                      <button
                        type="button"
                        onClick={handleCopyEmail}
                        className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-mono text-zinc-300 border border-zinc-800 rounded hover:bg-zinc-900 hover:text-white transition-colors cursor-pointer"
                      >
                        {emailCopied ? (
                          <>
                            <Check className="w-3 h-3" />
                            Copied
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            Copy
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-3 border-b border-zinc-800/60">
                    <span className="text-xs font-mono text-zinc-400">
                      GITHUB PROFILE
                    </span>
                    <a
                      href={profile.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-mono text-white hover:underline"
                    >
                      {profile.githubUrl.replace(/^https?:\/\//, '')}
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-3 border-b border-zinc-800/60">
                    <span className="text-xs font-mono text-zinc-400">
                      LOCATION & TIMEZONE
                    </span>
                    <span className="text-sm font-mono text-zinc-200">
                      {profile.location} (UTC+8)
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Contact Dispatch Form */}
              <div className="lg:col-span-6 p-6 md:p-8 rounded-2xl bg-[#09090b] border border-zinc-800">
                {contactSubmitted ? (
                  <div className="py-12 text-center space-y-4">
                    <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center mx-auto">
                      <Check className="w-5 h-5" />
                    </div>
                    <h3 className="font-display text-2xl font-bold text-white">
                      Dispatch Recorded
                    </h3>
                    <p className="text-sm text-zinc-400 max-w-md mx-auto leading-relaxed">
                      Thank you, {contactName}. Your inquiry regarding{' '}
                      <span className="text-white">{contactScope}</span> has
                      been prepared for {profile.email}.
                    </p>
                    <div className="pt-4 flex items-center justify-center gap-3">
                      <a
                        href={`mailto:${
                          profile.email
                        }?subject=${encodeURIComponent(
                          `${contactScope} — Inquiry from ${contactName}`
                        )}&body=${encodeURIComponent(contactMessage)}`}
                        className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-black bg-white rounded-lg hover:bg-zinc-200 transition-colors"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        Open in Mail Client
                      </a>
                      <button
                        type="button"
                        onClick={() => {
                          setContactSubmitted(false);
                          setContactName('');
                          setContactEmail('');
                          setContactMessage('');
                        }}
                        className="px-4 py-2 text-xs font-medium text-zinc-300 border border-zinc-800 rounded-lg hover:bg-zinc-900 cursor-pointer"
                      >
                        Send Another Message
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label
                          htmlFor="contact-name"
                          className="block text-xs font-mono text-zinc-400"
                        >
                          YOUR NAME *
                        </label>
                        <input
                          id="contact-name"
                          type="text"
                          required
                          value={contactName}
                          onChange={(e) => setContactName(e.target.value)}
                          placeholder="Bill Cipher"
                          className="w-full px-3.5 py-2.5 text-sm text-white bg-[#050505] border border-zinc-800 rounded-lg focus:outline-none focus:border-white transition-colors"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label
                          htmlFor="contact-email"
                          className="block text-xs font-mono text-zinc-400"
                        >
                          YOUR EMAIL *
                        </label>
                        <input
                          id="contact-email"
                          type="email"
                          required
                          value={contactEmail}
                          onChange={(e) => setContactEmail(e.target.value)}
                          placeholder="billcipher@mindscape.com"
                          className="w-full px-3.5 py-2.5 text-sm text-white bg-[#050505] border border-zinc-800 rounded-lg focus:outline-none focus:border-white transition-colors"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-mono text-zinc-400">
                        INQUIRY TYPE
                      </label>
                      <div
                        onMouseLeave={() => setHoveredScope(null)}
                        className="grid grid-cols-1 sm:grid-cols-3 gap-1.5 p-1 bg-[#050505] border border-zinc-800 rounded-lg"
                      >
                        {INQUIRY_OPTIONS.map((scope) => (
                          <InquiryTypeItem
                            key={scope}
                            scope={scope}
                            isActive={contactScope === scope}
                            isHovered={hoveredScope === scope}
                            onMouseEnter={() => setHoveredScope(scope)}
                            onMouseLeave={() => {}}
                            onSelect={() => setContactScope(scope)}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label
                        htmlFor="contact-message"
                        className="block text-xs font-mono text-zinc-400"
                      >
                        PROJECT BRIEF OR MESSAGE *
                      </label>
                      <textarea
                        id="contact-message"
                        rows={4}
                        required
                        value={contactMessage}
                        onChange={(e) => setContactMessage(e.target.value)}
                        placeholder="Outline your architectural goals, timeline, or team context..."
                        className="w-full px-3.5 py-2.5 text-sm text-white bg-[#050505] border border-zinc-800 rounded-lg focus:outline-none focus:border-white transition-colors"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-xs font-medium text-black bg-white rounded-lg hover:bg-zinc-200 transition-colors cursor-pointer"
                    >
                      <Mail className="w-4 h-4" />
                      Send Inquiry
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* QUIET EDITORIAL FOOTER */}
      <footer className="border-t border-zinc-800/80 py-10 bg-[#050505]">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div className="flex items-center gap-2">
            <span className="text-zinc-500">Powered by</span>
            <a
              href={profile.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-300 font-medium hover:text-white transition-colors"
            >
              @ThordyyDev
            </a>
          </div>

          <div className="flex items-center gap-6">
            <a
              href={profile.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              GitHub
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="hover:text-white transition-colors"
            >
              Email
            </a>
          </div>
        </div>
      </footer>

      {/* FULLSCREEN CASE STUDY READER MODAL */}
      <AnimatePresence>
        {selectedStudy && (
          <CaseStudyModal
            key={selectedStudy.id}
            study={selectedStudy}
            onClose={() => setSelectedStudy(null)}
            onUpdateStudyImage={handleUpdateStudyImage}
            onSelectSkillFilter={handleSelectSkill}
          />
        )}
      </AnimatePresence>

      {/* FLOATING BACK TO TOP BUTTON — Appears smoothly on scroll down */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            key="scroll-to-top"
            type="button"
            initial={{ opacity: 0, y: 16, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.85 }}
            transition={{ type: 'spring', stiffness: 400, damping: 28 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Scroll back to top"
            className="group fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-40 flex items-center justify-center gap-1.5 p-2.5 sm:px-3.5 sm:py-2.5 rounded-full bg-zinc-950/90 border border-zinc-800/90 backdrop-blur-xl text-zinc-400 hover:text-black hover:bg-white hover:border-white shadow-[0_10px_30px_-5px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,255,255,0.06)] transition-all duration-300 cursor-pointer"
          >
            <ArrowUp className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
            <span className="hidden sm:inline text-xs font-mono font-medium tracking-wide">TOP</span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
