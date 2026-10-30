/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
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
  Menu,
  Briefcase,
  Layers,
  Award,
  Users,
  MessageSquare,
  FileText,
  ExternalLink,
  Sparkles,
  Terminal,
  Activity,
  Code2,
} from 'lucide-react';
import {
  INITIAL_PROFILE,
  INITIAL_CASE_STUDIES,
  INITIAL_EXPERIENCES,
  INITIAL_CERTIFICATIONS,
  INITIAL_AFFILIATIONS,
  TECH_STACK_PILLS,
  SKILL_GROUPS,
  PortfolioProfile,
  CaseStudy,
  ExperienceItem,
  CertificationItem,
  AffiliationItem,
} from './data/portfolioData';
import { CaseStudyModal } from './components/CaseStudyModal';
import { ScrambleText, useScramble } from './components/ScrambleText';
import { CursorTrailZone } from './components/CursorTrailZone';

// Navigation links for the sidebar
const NAV_SECTIONS = [
  { id: 'projects', label: 'Projects', href: '#projects', num: '01' },
  { id: 'experience', label: 'Experience', href: '#experience', num: '02' },
  { id: 'stack', label: 'Stack', href: '#stack', num: '03' },
  { id: 'certifications', label: 'Certifications', href: '#certifications', num: '04' },
  { id: 'affiliations', label: 'Affiliations', href: '#affiliations', num: '05' },
  { id: 'contact', label: 'Contact', href: '#contact', num: '06' },
];

const QUICK_LINKS = [
  { label: 'Resume', href: 'https://github.com/ThordyyDev', icon: FileText },
  { label: 'GitHub', href: 'https://github.com/ThordyyDev', icon: Github },
  { label: 'Collabs', href: '#contact', icon: Sparkles },
];

const INQUIRY_OPTIONS = [
  'Frontend / Web Dev',
  'Full-Stack / Backend',
  'Internship / Collab',
];

// Clean Brand Logos for Certifications
function CertificationLogo({ type }: { type: CertificationItem['issuerType'] }) {
  if (type === 'google') {
    return (
      <svg className="w-8 h-8" viewBox="0 0 24 24">
        <path
          fill="#4285F4"
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        />
        <path
          fill="#34A853"
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        />
        <path
          fill="#FBBC05"
          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
        />
        <path
          fill="#EA4335"
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
        />
      </svg>
    );
  }
  if (type === 'meta') {
    return (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="#0081FB">
        <path d="M12 2.04c-5.5 0-10 4.49-10 10.02 0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.53-4.5-10.02-10-10.02Z" />
      </svg>
    );
  }
  if (type === 'oracle') {
    return (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="#F80000">
        <path d="M16.42 4.45H7.58C3.4 4.45 0 7.85 0 12.03s3.4 7.58 7.58 7.58h8.84c4.18 0 7.58-3.4 7.58-7.58s-3.4-7.58-7.58-7.58zm-.3 11.45H7.88c-2.13 0-3.87-1.74-3.87-3.87s1.74-3.87 3.87-3.87h8.24c2.13 0 3.87 1.74 3.87 3.87s-1.74 3.87-3.87 3.87z" />
      </svg>
    );
  }
  if (type === 'freecodecamp') {
    return (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="#0A0A23">
        <path
          fill="#002EAD"
          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14.5c0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5V13h3v3.5zm0-5h-3V7.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5V11.5z"
        />
      </svg>
    );
  }
  return <Award className="w-8 h-8 text-white" />;
}

export default function App() {
  const [profile, setProfile] = useState<PortfolioProfile>(INITIAL_PROFILE);
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>(INITIAL_CASE_STUDIES);
  const [activeSection, setActiveSection] = useState('projects');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Filters & Modal
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [activeSkillFilter, setActiveSkillFilter] = useState<string | null>(null);
  const [selectedStudy, setSelectedStudy] = useState<CaseStudy | null>(null);

  // Contact form state
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactScope, setContactScope] = useState('Full-Stack / Backend');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const { displayed: scrambledName, trigger: triggerNameScramble } = useScramble(
    'Jhuly Godinez III',
    { duration: 400, speed: 18 }
  );

  // Sync scroll position with active sidebar section
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);

      const scrollPos = window.scrollY + 250;
      for (const sec of [...NAV_SECTIONS].reverse()) {
        const el = document.getElementById(sec.id);
        if (el && scrollPos >= el.offsetTop) {
          setActiveSection(sec.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleUpdateStudyImage = (studyId: string, newImageUrl: string) => {
    setCaseStudies((prev) =>
      prev.map((s) => (s.id === studyId ? { ...s, imageUrl: newImageUrl } : s))
    );
    setSelectedStudy((prev) =>
      prev && prev.id === studyId ? { ...prev, imageUrl: newImageUrl } : prev
    );
  };

  const handleSelectSkill = (skillName: string) => {
    if (activeSkillFilter === skillName) {
      setActiveSkillFilter(null);
    } else {
      setActiveSkillFilter(skillName);
      setActiveCategory('All');
      const projectsEl = document.getElementById('projects');
      if (projectsEl) {
        projectsEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName.trim() || !contactEmail.trim() || !contactMessage.trim())
      return;

    const subject = encodeURIComponent(`${contactScope} — Inquiry from ${contactName}`);
    const body = encodeURIComponent(
      `Name: ${contactName}\nEmail: ${contactEmail}\nInquiry Type: ${contactScope}\n\n${contactMessage}`
    );

    // Directly open Gmail compose in a new tab without external prompts
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=jhulygodinezedu@gmail.com&su=${subject}&body=${body}`;
    window.open(gmailUrl, '_blank');

    setContactSubmitted(true);
  };

  // Filtered Projects
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
    <div className="min-h-screen bg-[#050505] text-[#FAFAFA] font-sans selection:bg-white selection:text-black">
      {/* ========================================================= */}
      {/* MOBILE STICKY HEADER                                      */}
      {/* ========================================================= */}
      <header className="md:hidden sticky top-0 z-40 bg-[#050505]/90 backdrop-blur-md border-b border-zinc-900 px-4 py-3.5 flex items-center justify-between">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="font-mono text-sm font-semibold tracking-tight text-white hover:text-zinc-300 transition-colors"
        >
          Jhuly Godinez III
        </a>
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
          className="p-1.5 rounded-lg border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700 bg-zinc-950 transition-colors"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </header>

      {/* MOBILE SLIDE-OUT DRAWER */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed inset-x-0 top-[53px] z-30 bg-[#050505] border-b border-zinc-800/90 p-5 space-y-6 shadow-2xl"
          >
            <div className="space-y-1">
              {NAV_SECTIONS.map((sec) => (
                <a
                  key={sec.id}
                  href={sec.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-3 py-2 text-sm font-mono rounded-lg transition-colors ${
                    activeSection === sec.id
                      ? 'bg-white text-black font-semibold'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                  }`}
                >
                  <span className="text-zinc-500 mr-2">{sec.num}</span>
                  {sec.label}
                </a>
              ))}
            </div>

            <div className="pt-4 border-t border-zinc-900 flex items-center justify-between text-xs font-mono text-zinc-400">
              <a
                href={`mailto:${profile.email}`}
                className="hover:text-white transition-colors"
              >
                {profile.email}
              </a>
              <a
                href={profile.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                @ThordyyDev
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex min-h-screen">
        {/* ========================================================= */}
        {/* DESKTOP FIXED LEFT SIDEBAR (BRYL LIM INSPIRATION)          */}
        {/* ========================================================= */}
        <aside className="hidden md:flex flex-col justify-between w-64 lg:w-72 fixed inset-y-0 left-0 bg-[#050505] border-r border-zinc-900/90 z-30 p-6 overflow-y-auto select-none">
          {/* Top Brand & Quick Links */}
          <div className="space-y-8">
            {/* Author Name Brand Header */}
            <div>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  triggerNameScramble();
                }}
                onMouseEnter={() => triggerNameScramble()}
                className="block font-mono text-base font-semibold tracking-tight text-white hover:text-zinc-300 transition-colors"
              >
                {scrambledName}
              </a>
              <span className="text-[11px] font-mono text-zinc-500 block mt-0.5">
                Full-Stack &amp; Mobile Engineer
              </span>
            </div>

            {/* Quick Utility Links (Shop/Blog/Collabs in inspiration) */}
            <div className="space-y-1.5 text-xs font-mono">
              {QUICK_LINKS.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="flex items-center gap-2.5 px-2 py-1.5 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-900/60 transition-colors"
                  >
                    <Icon className="w-3.5 h-3.5 shrink-0 text-zinc-500" />
                    <span>{link.label}</span>
                  </a>
                );
              })}
            </div>

            {/* Main Navigation Sections */}
            <div className="pt-4 border-t border-zinc-900/80 space-y-1">
              <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest block px-2 mb-2">
                Navigation
              </span>
              {NAV_SECTIONS.map((sec) => {
                const isActive = activeSection === sec.id;
                return (
                  <a
                    key={sec.id}
                    href={sec.href}
                    className={`group flex items-center justify-between px-2.5 py-1.5 text-xs font-mono rounded-md transition-all ${
                      isActive
                        ? 'text-white font-medium bg-zinc-900/90'
                        : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/40'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span
                        className={`text-[10px] ${
                          isActive ? 'text-white' : 'text-zinc-600'
                        }`}
                      >
                        {sec.num}
                      </span>
                      <span>{sec.label}</span>
                    </span>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-white" />
                    )}
                  </a>
                );
              })}
            </div>
          </div>

          {/* Bottom Sidebar Status & Contact */}
          <div className="pt-8 border-t border-zinc-900/80 space-y-4 text-xs font-mono">
            {/* Quick Action Pills */}
            <div className="space-y-1 text-[11px] text-zinc-400">
              <a
                href="#contact"
                className="flex items-center justify-between px-2 py-1.5 rounded-md bg-zinc-950 border border-zinc-900 hover:border-zinc-700 hover:text-white transition-colors"
              >
                <span>Ask anything</span>
                <kbd className="px-1.5 py-0.5 rounded bg-zinc-900 text-zinc-500 text-[9px] border border-zinc-800">
                  ALT + K
                </kbd>
              </a>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="w-full flex items-center justify-between px-2 py-1.5 rounded-md bg-zinc-950 border border-zinc-900 hover:border-zinc-700 hover:text-white transition-colors cursor-pointer text-left"
              >
                <span>{emailCopied ? 'Email Copied!' : 'Copy Email'}</span>
                <kbd className="px-1.5 py-0.5 rounded bg-zinc-900 text-zinc-500 text-[9px] border border-zinc-800">
                  {emailCopied ? '✓' : 'ALT + C'}
                </kbd>
              </button>
            </div>

            {/* Live Status indicator */}
            <div className="flex items-center gap-2 px-2 text-zinc-400 text-[11px]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Available for 2026 roles</span>
            </div>

            {/* Direct Contact Blurb */}
            <div className="px-2 pt-2 border-t border-zinc-900/70 text-[11px] text-zinc-500 space-y-1">
              <p>For work, collabs &amp; inquiries:</p>
              <a
                href={`mailto:${profile.email}`}
                className="block text-zinc-300 hover:text-white truncate transition-colors"
              >
                ✉ {profile.email}
              </a>
            </div>
          </div>
        </aside>

        {/* ========================================================= */}
        {/* MAIN CONTENT CANVAS (FOCUSED & REFINED)                    */}
        {/* ========================================================= */}
        <main className="flex-1 md:ml-64 lg:ml-72 min-w-0">
          <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-12 py-10 sm:py-16 space-y-24">
            {/* ===================================================== */}
            {/* HERO INTRODUCTION (IMAGE 1 BRYL LIM STYLE)           */}
            {/* ===================================================== */}
            <section id="hero" className="space-y-10 pt-2 sm:pt-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8 sm:gap-10">
                {/* Dithered / Monochrome Author Portrait */}
                <div className="relative group shrink-0">
                  <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-950 shadow-2xl relative">
                    <img
                      src={resolveImgSrc(profile.portraitUrl)}
                      alt={profile.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover grayscale contrast-125 brightness-95 transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                  </div>
                  <span className="absolute -bottom-2 -right-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono text-[10px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Online
                  </span>
                </div>

                {/* Typography and Bio */}
                <div className="space-y-4 max-w-xl">
                  <div>
                    <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
                      {profile.name}
                    </h1>
                    <p className="font-mono text-xs sm:text-sm text-zinc-400 mt-1">
                      IT Student · Full-Stack, Mobile &amp; Game Developer
                    </p>
                  </div>

                  <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-normal">
                    I build modern web &amp; mobile applications, game engines, and cloud backends. Focused on clean architecture and practical tools.
                  </p>

                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-normal">
                    Right now I'm building cool new stuff every day. I love turning rough ideas into things people actually use.
                  </p>

                  {/* Clean Links Row */}
                  <div className="flex flex-wrap items-center gap-3 pt-1 text-xs font-mono">
                    <a
                      href={profile.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-400 hover:text-white transition-colors inline-flex items-center gap-1"
                    >
                      github <ArrowUpRight className="w-3 h-3" />
                    </a>
                    <span className="text-zinc-700">/</span>
                    <a
                      href={profile.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-400 hover:text-white transition-colors inline-flex items-center gap-1"
                    >
                      linkedin <ArrowUpRight className="w-3 h-3" />
                    </a>
                    <span className="text-zinc-700">/</span>
                    <a
                      href={`mailto:${profile.email}`}
                      className="text-zinc-400 hover:text-white transition-colors inline-flex items-center gap-1"
                    >
                      email <ArrowUpRight className="w-3 h-3" />
                    </a>
                    <span className="text-zinc-700">/</span>
                    <a
                      href="#contact"
                      className="text-zinc-400 hover:text-white transition-colors inline-flex items-center gap-1"
                    >
                      inquiries <ArrowUpRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Highlights & Quantitative KPI Bar (Image 1 Style) */}
              <div className="space-y-4 pt-4 border-t border-zinc-900/90">
                {/* Affiliations Banner Strip */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-900/80 flex items-center gap-3">
                    <Terminal className="w-4 h-4 text-zinc-400 shrink-0" />
                    <div className="min-w-0">
                      <div className="text-xs font-semibold text-white truncate">
                        GDG on Campus
                      </div>
                      <div className="text-[10px] font-mono text-zinc-500 uppercase">
                        Student Developer
                      </div>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-900/80 flex items-center gap-3">
                    <Users className="w-4 h-4 text-zinc-400 shrink-0" />
                    <div className="min-w-0">
                      <div className="text-xs font-semibold text-white truncate">
                        PSIA &amp; AAP
                      </div>
                      <div className="text-[10px] font-mono text-zinc-500 uppercase">
                        Active Member
                      </div>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-900/80 flex items-center gap-3">
                    <Github className="w-4 h-4 text-zinc-400 shrink-0" />
                    <div className="min-w-0">
                      <div className="text-xs font-semibold text-white truncate">
                        Open Source
                      </div>
                      <div className="text-[10px] font-mono text-zinc-500 uppercase">
                        GitHub Campus
                      </div>
                    </div>
                  </div>
                </div>

                {/* Big Metric Counters */}
                <div className="grid grid-cols-3 gap-4 pt-2">
                  <div className="space-y-1">
                    <div className="font-mono text-2xl sm:text-3xl font-semibold text-white tracking-tight flex items-center gap-1">
                      <span>3+ yrs</span>
                      <ArrowUpRight className="w-4 h-4 text-zinc-600" />
                    </div>
                    <div className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">
                      Shipping &amp; Coding
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="font-mono text-2xl sm:text-3xl font-semibold text-white tracking-tight flex items-center gap-1">
                      <span>6+</span>
                      <ArrowUpRight className="w-4 h-4 text-zinc-600" />
                    </div>
                    <div className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">
                      Projects &amp; Repos
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="font-mono text-2xl sm:text-3xl font-semibold text-white tracking-tight flex items-center gap-1">
                      <span>10+</span>
                      <ArrowUpRight className="w-4 h-4 text-zinc-600" />
                    </div>
                    <div className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">
                      Core Technologies
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* ===================================================== */}
            {/* 01 — PROJECTS SECTION (IMAGE 2 STYLE)                 */}
            {/* ===================================================== */}
            <CursorTrailZone>
              <section id="projects" className="space-y-8 scroll-mt-12">
                {/* Section Header */}
                <div className="flex items-center justify-between pb-3 border-b border-zinc-900">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-zinc-500">01 —</span>
                    <h2 className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                      Projects
                    </h2>
                  </div>
                  <div className="flex items-center gap-3">
                    {/* Category Filter Pills */}
                    <div className="hidden sm:flex items-center gap-1.5">
                      {categories.map((cat) => (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => setActiveCategory(cat)}
                          className={`px-2.5 py-1 text-[11px] font-mono rounded-md transition-colors cursor-pointer ${
                            activeCategory === cat
                              ? 'bg-white text-black font-semibold'
                              : 'text-zinc-400 hover:text-white bg-zinc-950 border border-zinc-900'
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                    <a
                      href={profile.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-xs text-zinc-400 hover:text-white transition-colors inline-flex items-center gap-1"
                    >
                      ALL PROJECTS <ArrowUpRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                {/* Active Skill Filter Notice */}
                {activeSkillFilter && (
                  <div className="flex items-center justify-between px-3.5 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-xs font-mono">
                    <span className="text-zinc-300">
                      Filtering by skill:{' '}
                      <strong className="text-white">{activeSkillFilter}</strong>
                    </span>
                    <button
                      type="button"
                      onClick={() => setActiveSkillFilter(null)}
                      className="text-zinc-400 hover:text-white inline-flex items-center gap-1 cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" /> Clear
                    </button>
                  </div>
                )}

                {/* Project Cards (Stacked/Grid clean layout inspired by Bryl Lim Image 2) */}
                <div className="grid grid-cols-1 gap-6">
                  {filteredStudies.map((study) => (
                    <motion.div
                      key={study.id}
                      whileHover={{ y: -3 }}
                      transition={{ duration: 0.2 }}
                      onClick={() => setSelectedStudy(study)}
                      className="group cursor-pointer rounded-2xl bg-[#09090b] border border-zinc-800/80 hover:border-zinc-600 transition-colors overflow-hidden flex flex-col sm:flex-row shadow-lg"
                    >
                      {/* Media preview */}
                      <div className="sm:w-72 sm:shrink-0 aspect-video sm:aspect-auto overflow-hidden bg-black relative border-b sm:border-b-0 sm:border-r border-zinc-800/80">
                        <img
                          src={resolveImgSrc(study.imageUrl)}
                          alt={study.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover grayscale contrast-110 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent sm:hidden" />
                      </div>

                      {/* Card Content */}
                      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between gap-2 text-[11px] font-mono">
                            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300">
                              &lt; {study.category.toUpperCase()} &gt;
                            </span>
                            <span className="text-zinc-500">{study.year}</span>
                          </div>

                          <h3 className="font-display text-xl font-bold text-white group-hover:text-zinc-200 transition-colors flex items-center justify-between">
                            <span>{study.title}</span>
                            <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors" />
                          </h3>

                          <p className="text-xs sm:text-sm text-zinc-400 line-clamp-2 leading-relaxed">
                            {study.summary}
                          </p>
                        </div>

                        {/* Skill taxonomy footer */}
                        <div className="pt-3 border-t border-zinc-900 flex items-center justify-between text-xs font-mono text-zinc-500">
                          <div className="flex flex-wrap items-center gap-1.5">
                            {study.skills.map((skill) => (
                              <span
                                key={skill}
                                className="px-2 py-0.5 rounded bg-zinc-950 border border-zinc-900 text-zinc-400 text-[10px]"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                          <span className="text-zinc-400 hover:text-white text-[11px] font-medium shrink-0 ml-2">
                            Inspect Case Study →
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>
            </CursorTrailZone>

            {/* ===================================================== */}
            {/* 02 — EXPERIENCE SECTION (IMAGE 3 BRYL LIM STYLE)      */}
            {/* ===================================================== */}
            <section id="experience" className="space-y-6 scroll-mt-12">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-900">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-zinc-500">02 —</span>
                  <h2 className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                    Experience
                  </h2>
                </div>
                <a
                  href={profile.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs text-zinc-400 hover:text-white transition-colors inline-flex items-center gap-1"
                >
                  FULL HISTORY <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>

              {/* Minimal Clean Row Timeline */}
              <div className="divide-y divide-zinc-900/80">
                {INITIAL_EXPERIENCES.map((exp) => (
                  <div
                    key={exp.id}
                    className="py-4 px-2 -mx-2 rounded-lg hover:bg-zinc-950/80 transition-colors flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 sm:gap-6 group"
                  >
                    <div className="sm:w-28 shrink-0 font-mono text-xs text-zinc-500">
                      {exp.year}
                    </div>

                    <div className="flex-1 space-y-1">
                      <div className="font-mono text-sm font-medium text-white group-hover:text-zinc-200 flex items-center gap-2">
                        <span>{exp.role}</span>
                        {exp.link && (
                          <a
                            href={exp.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-zinc-500 hover:text-white inline-block opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <ArrowUpRight className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                      {exp.description && (
                        <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                          {exp.description}
                        </p>
                      )}
                    </div>

                    <div className="sm:w-56 shrink-0 sm:text-right font-mono text-xs text-zinc-400">
                      {exp.organization}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ===================================================== */}
            {/* 03 — STACK SECTION (IMAGE 3 BRYL LIM STYLE)           */}
            {/* ===================================================== */}
            <section id="stack" className="space-y-6 scroll-mt-12">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-900">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-zinc-500">03 —</span>
                  <h2 className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                    Stack
                  </h2>
                </div>
                <span className="font-mono text-xs text-zinc-500">
                  CLICK TO FILTER PROJECTS
                </span>
              </div>

              {/* Horizontal Pill Tags */}
              <div className="flex flex-wrap items-center gap-2">
                {TECH_STACK_PILLS.map((pill) => {
                  const isSelected = activeSkillFilter === pill;
                  return (
                    <button
                      key={pill}
                      type="button"
                      onClick={() => handleSelectSkill(pill)}
                      className={`px-3.5 py-2 text-xs font-mono rounded-lg border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-white text-black font-semibold border-white shadow-sm'
                          : 'bg-[#09090b] text-zinc-300 border-zinc-800 hover:border-zinc-600 hover:text-white'
                      }`}
                    >
                      {pill}
                    </button>
                  );
                })}
              </div>
            </section>

            {/* ===================================================== */}
            {/* 04 — CERTIFICATIONS & BADGES (IMAGE 3 STYLE)         */}
            {/* ===================================================== */}
            <section id="certifications" className="space-y-6 scroll-mt-12">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-900">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-zinc-500">04 —</span>
                  <h2 className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                    Certifications
                  </h2>
                </div>
                <a
                  href={profile.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs text-zinc-400 hover:text-white transition-colors inline-flex items-center gap-1"
                >
                  ALL CERTIFICATIONS <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>

              {/* 3 or 4 Card Grid (Bryl Lim Image 3) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {INITIAL_CERTIFICATIONS.map((cert) => (
                  <div
                    key={cert.id}
                    className="p-6 rounded-2xl bg-[#09090b] border border-zinc-800/90 hover:border-zinc-600 transition-colors flex flex-col items-center text-center justify-between space-y-6 group shadow-sm"
                  >
                    {/* Issuer Logo */}
                    <div className="pt-2">
                      <CertificationLogo type={cert.issuerType} />
                    </div>

                    {/* Title & Issuer */}
                    <div className="space-y-1.5">
                      <h3 className="font-display text-sm font-semibold text-white leading-snug">
                        {cert.title}
                      </h3>
                      <div className="font-mono text-[11px] text-zinc-500 uppercase tracking-widest">
                        {cert.issuer}
                      </div>
                    </div>

                    {/* < VERIFY > Button */}
                    <a
                      href={cert.verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-[11px] text-zinc-400 group-hover:text-white border border-zinc-800 group-hover:border-zinc-600 px-4 py-1.5 rounded-lg transition-colors inline-flex items-center gap-1"
                    >
                      &lt; VERIFY &gt;
                    </a>
                  </div>
                ))}
              </div>
            </section>

            {/* ===================================================== */}
            {/* 05 — AFFILIATIONS SECTION (IMAGE 4 STYLE)             */}
            {/* ===================================================== */}
            <section id="affiliations" className="space-y-6 scroll-mt-12">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-900">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-zinc-500">05 —</span>
                  <h2 className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                    Affiliations
                  </h2>
                </div>
                <span className="font-mono text-xs text-zinc-500">
                  CAMPUS &amp; COMMUNITY
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {INITIAL_AFFILIATIONS.map((affil) => (
                  <a
                    key={affil.id}
                    href={affil.link || profile.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 rounded-xl bg-zinc-950 border border-zinc-900 hover:border-zinc-700 transition-colors flex flex-col justify-between space-y-3 group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center font-mono text-xs font-bold text-white group-hover:bg-zinc-800 transition-colors">
                      {affil.tag}
                    </div>
                    <div>
                      <div className="font-mono text-xs font-semibold text-white group-hover:text-zinc-200">
                        {affil.name}
                      </div>
                      <div className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider">
                        {affil.role}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </section>

            {/* ===================================================== */}
            {/* 06 — GITHUB CONTRIBUTIONS GRID (IMAGE 4 STYLE)        */}
            {/* ===================================================== */}
            <section className="space-y-4 pt-2">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-900">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-zinc-500">06 —</span>
                  <h2 className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                    GitHub
                  </h2>
                </div>
                <a
                  href={profile.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs text-zinc-400 hover:text-white transition-colors inline-flex items-center gap-1"
                >
                  @ThordyyDev <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>

              {/* Monochrome Contribution Dot Grid */}
              <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-900 space-y-4">
                <div className="grid grid-flow-col grid-rows-7 gap-1 sm:gap-1.5 overflow-x-auto pb-2">
                  {Array.from({ length: 42 * 7 }).map((_, i) => {
                    const intensity = (i * 17 + (i % 3) * 31) % 10;
                    const opacityClass =
                      intensity > 7
                        ? 'bg-white'
                        : intensity > 4
                        ? 'bg-zinc-400'
                        : intensity > 2
                        ? 'bg-zinc-700'
                        : 'bg-zinc-900';
                    return (
                      <div
                        key={i}
                        className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-sm ${opacityClass} transition-opacity hover:opacity-80`}
                        title={`Day ${i + 1}`}
                      />
                    );
                  })}
                </div>
                <div className="flex items-center justify-between text-xs font-mono text-zinc-500 pt-2 border-t border-zinc-900">
                  <span>2,968 CONTRIBUTIONS IN THE LAST YEAR</span>
                  <div className="flex items-center gap-1.5">
                    <span>Less</span>
                    <span className="w-2.5 h-2.5 rounded-sm bg-zinc-900" />
                    <span className="w-2.5 h-2.5 rounded-sm bg-zinc-700" />
                    <span className="w-2.5 h-2.5 rounded-sm bg-zinc-400" />
                    <span className="w-2.5 h-2.5 rounded-sm bg-white" />
                    <span>More</span>
                  </div>
                </div>
              </div>
            </section>

            {/* ===================================================== */}
            {/* 07 — CONTACT & DIRECT DISPATCH                        */}
            {/* ===================================================== */}
            <section id="contact" className="space-y-6 scroll-mt-12 pb-12">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-900">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-zinc-500">07 —</span>
                  <h2 className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                    Contact &amp; Inquiries
                  </h2>
                </div>
                <span className="font-mono text-xs text-zinc-500">
                  CEBU, PH (UTC+8)
                </span>
              </div>

              <div className="p-6 sm:p-8 rounded-2xl bg-[#09090b] border border-zinc-800">
                {contactSubmitted ? (
                  <div className="py-8 text-center space-y-4">
                    <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center mx-auto">
                      <Check className="w-5 h-5" />
                    </div>
                    <h3 className="font-display text-xl font-bold text-white">
                      Inquiry Prepared in Gmail
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-400 max-w-md mx-auto leading-relaxed">
                      Thank you, {contactName}. A pre-filled draft has opened directly in your browser to send to{' '}
                      <span className="text-white">{profile.email}</span>.
                    </p>
                    <div className="pt-2 flex items-center justify-center gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          setContactSubmitted(false);
                          setContactName('');
                          setContactEmail('');
                          setContactMessage('');
                        }}
                        className="px-4 py-2 text-xs font-mono text-zinc-300 border border-zinc-800 rounded-lg hover:bg-zinc-900 cursor-pointer"
                      >
                        Send Another Inquiry
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-4">
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
                          className="w-full px-3.5 py-2 text-sm text-white bg-[#050505] border border-zinc-800 rounded-lg focus:outline-none focus:border-white transition-colors"
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
                          placeholder="bill@domain.com"
                          className="w-full px-3.5 py-2 text-sm text-white bg-[#050505] border border-zinc-800 rounded-lg focus:outline-none focus:border-white transition-colors"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-mono text-zinc-400">
                        INQUIRY TYPE
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        {INQUIRY_OPTIONS.map((scope) => (
                          <button
                            key={scope}
                            type="button"
                            onClick={() => setContactScope(scope)}
                            className={`px-3 py-2 text-xs font-medium rounded-lg text-center cursor-pointer transition-colors ${
                              contactScope === scope
                                ? 'bg-white text-black font-semibold'
                                : 'bg-[#050505] text-zinc-400 border border-zinc-800 hover:text-white'
                            }`}
                          >
                            {scope}
                          </button>
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
                        rows={3}
                        required
                        value={contactMessage}
                        onChange={(e) => setContactMessage(e.target.value)}
                        placeholder="Outline your goals, timeline, or collaboration..."
                        className="w-full px-3.5 py-2 text-sm text-white bg-[#050505] border border-zinc-800 rounded-lg focus:outline-none focus:border-white transition-colors"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-xs font-medium text-black bg-white rounded-lg hover:bg-zinc-200 transition-colors cursor-pointer"
                    >
                      <Mail className="w-4 h-4" />
                      Send Inquiry Directly via Gmail
                    </button>
                  </form>
                )}
              </div>
            </section>
          </div>

          {/* Quiet Footer */}
          <footer className="border-t border-zinc-900 py-8 px-6 bg-[#050505] text-xs font-mono text-zinc-500">
            <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>Jhuly Godinez III · Built with React &amp; Tailwind CSS</div>
              <div className="flex items-center gap-4">
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
        </main>
      </div>

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

      {/* FLOATING BACK TO TOP BUTTON */}
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
            className="fixed bottom-6 right-6 z-40 flex items-center justify-center p-3 rounded-full bg-zinc-950/90 border border-zinc-800 text-zinc-400 hover:text-black hover:bg-white hover:border-white shadow-2xl transition-all cursor-pointer"
          >
            <ArrowUp className="w-4 h-4" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
