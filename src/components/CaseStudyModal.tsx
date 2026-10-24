import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { X, ArrowUpRight, Github } from 'lucide-react';
import { CaseStudy } from '../data/portfolioData';

interface CaseStudyModalProps {
  study: CaseStudy | null;
  onClose: () => void;
  onUpdateStudyImage?: (studyId: string, newImageUrl: string) => void;
  onSelectSkillFilter: (skill: string) => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({
  study,
  onClose,
  onSelectSkillFilter,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (study) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [study, onClose]);

  if (!study) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-6 md:p-8 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-study-modal-title"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 16 }}
        transition={{
          type: 'spring',
          damping: 26,
          stiffness: 340,
          mass: 0.8,
        }}
        className="relative w-full max-w-5xl bg-[#09090b] border border-zinc-800 rounded-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col shadow-[0_25px_70px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.08)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Modal Bar */}
        <div className="flex items-center justify-between gap-4 px-6 py-4 border-b border-zinc-800 bg-[#050505]">
          <div className="flex items-center gap-2.5 text-xs text-zinc-400 font-mono tabular-nums">
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
            <span aria-hidden="true" className="text-zinc-600">·</span>
            <span>CASE STUDY {study.index}</span>
            <span aria-hidden="true" className="text-zinc-600">·</span>
            <span>{study.category}</span>
            <span aria-hidden="true" className="text-zinc-600">·</span>
            <span>{study.year}</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              aria-label="Close case study modal"
              className="inline-flex items-center justify-center w-9 h-9 text-zinc-400 hover:text-white border border-zinc-800 rounded-lg hover:bg-zinc-900 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Case Study Content */}
        <div className="overflow-y-auto p-6 md:p-10 space-y-10">
          {/* Header Block */}
          <div className="space-y-4 max-w-3xl">
            <p className="text-xs font-mono text-zinc-400 tracking-wider">
              {study.clientOrContext}
            </p>
            <h2
              id="case-study-modal-title"
              className="font-display text-3xl md:text-5xl font-bold tracking-tight text-white"
            >
              {study.title}
            </h2>
            <p className="text-lg text-zinc-300 leading-relaxed">
              {study.subtitle}
            </p>
          </div>

          {/* High-Resolution Visual Showcase Plate */}
          <div className="relative rounded-xl overflow-hidden border border-zinc-800 bg-[#050505] aspect-video">
            <img
              src={
                study.imageUrl.startsWith('http://') ||
                study.imageUrl.startsWith('https://') ||
                study.imageUrl.startsWith('data:') ||
                study.imageUrl.startsWith('/')
                  ? study.imageUrl
                  : `/${study.imageUrl}`
              }
              alt={study.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Quantitative Outcomes Strip */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-6 border-y border-zinc-800">
            {study.outcomes.map((outcome, idx) => (
              <div key={idx} className="space-y-1">
                <div className="font-mono text-3xl md:text-4xl font-semibold text-white tabular-nums tracking-tight">
                  {outcome.value}
                </div>
                <div className="text-sm font-medium text-zinc-200">
                  {outcome.label}
                </div>
                <div className="text-xs text-zinc-500">
                  {outcome.context}
                </div>
              </div>
            ))}
          </div>

          {/* Problem & Architecture Split */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="space-y-3">
              <h3 className="text-base font-semibold text-white tracking-tight">
                01. The Engineering Bottleneck
              </h3>
              <p className="text-sm text-zinc-300 leading-relaxed">
                {study.problem}
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="text-base font-semibold text-white tracking-tight">
                02. System Architecture & Approach
              </h3>
              <p className="text-sm text-zinc-300 leading-relaxed">
                {study.architecture}
              </p>
            </div>
          </div>

          {/* Execution Highlights */}
          <div className="space-y-4 pt-4 border-t border-zinc-800/80">
            <h3 className="text-base font-semibold text-white tracking-tight">
              03. Key Technical Execution
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {study.executionHighlights.map((highlight, idx) => (
                <div key={idx} className="space-y-2">
                  <span className="text-xs font-mono text-zinc-500 tabular-nums">
                    03.{idx + 1}
                  </span>
                  <p className="text-sm text-zinc-300 leading-relaxed">
                    {highlight}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Footer: Technical Stack & Direct Links */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pt-6 border-t border-zinc-800">
            <div className="space-y-1.5">
              <div className="text-xs font-mono text-zinc-500">
                TECHNICAL TAXONOMY (CLICK TO FILTER PORTFOLIO)
              </div>
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-zinc-300">
                {study.skills.map((skill, idx) => (
                  <React.Fragment key={skill}>
                    <button
                      type="button"
                      onClick={() => {
                        onSelectSkillFilter(skill);
                        onClose();
                      }}
                      className="hover:text-white underline underline-offset-4 decoration-zinc-700 hover:decoration-white transition-colors cursor-pointer"
                    >
                      {skill}
                    </button>
                    {idx < study.skills.length - 1 && (
                      <span aria-hidden="true" className="text-zinc-600">
                        ·
                      </span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <a
                href={study.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-zinc-200 border border-zinc-700 rounded-lg hover:bg-zinc-900 hover:text-white transition-colors whitespace-nowrap shrink-0"
              >
                <Github className="w-3.5 h-3.5" />
                View Source on GitHub
              </a>
              <a
                href={study.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-black bg-white rounded-lg hover:bg-zinc-200 transition-colors whitespace-nowrap shrink-0"
              >
                Inspect Live System
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
