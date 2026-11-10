import { useState, useCallback, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';
import { useReducedMotionPref } from '../hooks/useMedia';
import { EASE, SectionHeading } from './fx';

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 40 : -40,
    opacity: 0,
    filter: 'blur(6px)',
  }),
  center: {
    x: 0,
    opacity: 1,
    filter: 'blur(0px)',
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 40 : -40,
    opacity: 0,
    filter: 'blur(6px)',
  }),
};

export default function Seasons() {
  const reduced = useReducedMotionPref();
  const { seasons, setIsAdminOpen } = usePortfolio();
  const [[page, direction], setPage] = useState([0, 0]);

  const activeIndex = Math.min(Math.max(page, 0), Math.max(seasons.length - 1, 0));
  const season = seasons[activeIndex] || seasons[0];

  const paginate = useCallback(
    (newDirection: number) => {
      const nextIndex = activeIndex + newDirection;
      if (nextIndex >= 0 && nextIndex < seasons.length) {
        setPage([nextIndex, newDirection]);
      }
    },
    [activeIndex, seasons.length]
  );

  const goToSlide = (index: number) => {
    if (index === activeIndex) return;
    setPage([index, index > activeIndex ? 1 : -1]);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === 'ArrowRight' && activeIndex < seasons.length - 1) {
        paginate(1);
      } else if (e.key === 'ArrowLeft' && activeIndex > 0) {
        paginate(-1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, paginate, seasons.length]);

  if (!season) return null;

  const currentEpisode = season.episodes?.[0];
  const labels = [
    { num: '01', title: 'B.Tech CSE', period: '2023 – 2027' },
    { num: '02', title: 'Inter MPC', period: '2021 – 2023' },
    { num: '03', title: 'SSC Class X', period: '2020 – 2021' },
  ];

  return (
    <>
      <SectionHeading
        kicker={`${seasons.length} Academic Milestones`}
        title="Academic Timeline"
        aside={
          <p className="max-w-xs text-sm text-mist">
            Chronological progression from high school foundations to computer science engineering — slide through each milestone.
          </p>
        }
      />

      <div className="gutter mb-8">
        {/* Connected Interactive Timeline Stepper */}
        <div className="relative mx-auto max-w-4xl">
          <div className="absolute left-6 right-6 top-1/2 -z-0 h-0.5 -translate-y-1/2 bg-white/10 sm:left-12 sm:right-12">
            <motion.div
              className="h-full bg-gradient-to-r from-crimson via-amber-500 to-crimson-2"
              initial={false}
              animate={{
                width: `${(activeIndex / Math.max(seasons.length - 1, 1)) * 100}%`,
              }}
              transition={{ duration: 0.5, ease: EASE }}
            />
          </div>

          <div className="relative z-10 flex items-center justify-between gap-2" role="group" aria-label="Academic Timeline Navigation">
            {seasons.map((s, i) => {
              const label = labels[i] || { num: `0${i + 1}`, title: s.title, period: s.period };
              const isActive = i === activeIndex;
              const isPast = i < activeIndex;

              return (
                <button
                  key={s.number}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => goToSlide(i)}
                  className="group flex flex-col items-center text-center focus:outline-none"
                >
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-full border text-xs font-bold transition-all duration-300 sm:h-11 sm:w-11 sm:text-sm ${
                      isActive
                        ? 'border-crimson-2 bg-crimson-2 text-white shadow-[0_0_20px_rgba(255,61,90,0.6)] scale-110'
                        : isPast
                        ? 'border-crimson/60 bg-ink-2 text-bone'
                        : 'border-white/15 bg-ink text-smoke group-hover:border-white/40 group-hover:text-mist'
                    }`}
                  >
                    {label.num}
                  </div>
                  <div className="mt-2 hidden text-left sm:block">
                    <span className={`block text-xs font-semibold ${isActive ? 'text-bone' : 'text-smoke group-hover:text-mist'}`}>
                      {label.title}
                    </span>
                    <span className="block text-[11px] text-smoke/70">{label.period}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Slide Card Stage */}
      <div className="gutter mx-auto max-w-5xl">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.article
            key={season.number}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: reduced ? 0 : 0.45, ease: EASE }}
            className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-ink-2/95 via-ink-2/90 to-ink/95 p-6 ring-1 ring-white/10 backdrop-blur-xl sm:p-8 md:p-10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)]"
          >
            {/* Top decorative glow backdrop */}
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-crimson/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-amber-500/10 blur-3xl" />

            {/* Header: Phase badge & Score highlight */}
            <div className="relative mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-5">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="rounded-full bg-white/[0.08] px-3 py-1 text-[11px] font-bold tracking-[0.2em] text-bone ring-1 ring-white/10">
                  SLIDE {String(activeIndex + 1).padStart(2, '0')} OF 03
                </span>
                <span className="rounded-full bg-crimson/15 px-3 py-1 text-[11px] font-semibold text-crimson-2 ring-1 ring-crimson/30">
                  {season.period}
                </span>
              </div>

              {season.score && (
                <div className="flex items-center gap-2 rounded-xl bg-white/[0.05] px-4 py-1.5 ring-1 ring-white/15">
                  <span className="text-[11px] uppercase tracking-wider text-smoke">Score / Standing:</span>
                  <span className="font-display text-base tracking-wide text-amber-300 sm:text-lg">
                    {season.score}
                  </span>
                </div>
              )}
            </div>

            {/* Title & Institution */}
            <div className="relative mb-8">
              <h3 className="font-display text-3xl font-normal tracking-wide text-bone sm:text-4xl md:text-5xl">
                {season.degree || season.title}
              </h3>
              <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-mist sm:text-base">
                <span className="flex items-center gap-1.5 text-bone/90">
                  <svg className="h-4 w-4 text-crimson-2 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  {season.institution || season.synopsis}
                </span>
                {season.board && (
                  <span className="rounded bg-white/[0.06] px-2 py-0.5 text-xs text-smoke">
                    {season.board}
                  </span>
                )}
              </div>
            </div>

            {/* Two-Column Grid: Academic Highlights & Achievements */}
            <div className="relative mb-8 grid gap-6 md:grid-cols-2">
              {/* Highlights Column */}
              <div className="rounded-xl bg-black/30 p-5 ring-1 ring-white/10">
                <div className="mb-3.5 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-bone">
                  <span className="flex h-5 w-5 items-center justify-center rounded bg-white/10 text-[10px]">📚</span>
                  Academic Highlights
                </div>
                <ul className="space-y-2.5">
                  {(season.highlights || ['Core Academic Curriculum', 'Foundational Mathematics & Sciences']).map((h) => (
                    <li key={h} className="flex items-start gap-2.5 text-xs leading-relaxed text-bone/85 sm:text-sm">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-crimson-2" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Achievements Column */}
              <div className="rounded-xl bg-black/30 p-5 ring-1 ring-white/10">
                <div className="mb-3.5 flex items-center justify-between text-xs font-bold uppercase tracking-[0.2em] text-bone">
                  <span className="flex items-center gap-2">
                    <span className="flex h-5 w-5 items-center justify-center rounded bg-amber-500/20 text-[10px] text-amber-300">🏆</span>
                    Key Achievements
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsAdminOpen(true)}
                    className="text-[10px] lowercase font-normal text-smoke hover:text-bone underline underline-offset-2 transition"
                  >
                    + add more in studio
                  </button>
                </div>
                <ul className="space-y-2.5">
                  {(season.achievements && season.achievements.length > 0
                    ? season.achievements
                    : ['Academic Distinction and First-Class Standing']
                  ).map((a) => (
                    <li key={a} className="flex items-start gap-2.5 text-xs leading-relaxed text-amber-200/90 sm:text-sm">
                      <span className="mt-1 text-[11px] text-amber-400">★</span>
                      <span>{a}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom: Tags & Navigation Controls */}
            <div className="relative flex flex-col gap-4 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
              {/* Tags */}
              <div className="flex flex-wrap items-center gap-1.5">
                {(currentEpisode?.tags || ['Academics', 'Education']).map((t) => (
                  <span key={t} className="rounded-full bg-white/[0.06] px-2.5 py-1 text-[11px] text-mist ring-1 ring-white/5">
                    {t}
                  </span>
                ))}
              </div>

              {/* Slider Controls */}
              <div className="flex items-center justify-between gap-3 sm:justify-end">
                <button
                  type="button"
                  onClick={() => paginate(-1)}
                  disabled={activeIndex === 0}
                  className="flex items-center gap-1.5 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs font-semibold text-bone transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-30"
                  aria-label="Previous Slide"
                >
                  <span>‹</span>
                  <span className="hidden sm:inline">Previous</span>
                </button>

                <div className="flex items-center gap-1.5 px-2">
                  {seasons.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => goToSlide(i)}
                      aria-label={`Go to Slide ${i + 1}`}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        i === activeIndex ? 'w-6 bg-crimson-2' : 'w-2 bg-white/20 hover:bg-white/40'
                      }`}
                    />
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => paginate(1)}
                  disabled={activeIndex === seasons.length - 1}
                  className="flex items-center gap-1.5 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs font-semibold text-bone transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-30"
                  aria-label="Next Slide"
                >
                  <span className="hidden sm:inline">Next</span>
                  <span>›</span>
                </button>
              </div>
            </div>
          </motion.article>
        </AnimatePresence>
      </div>
    </>
  );
}
