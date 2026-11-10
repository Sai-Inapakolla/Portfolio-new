import { useReducedMotionPref } from '../hooks/useMedia';
import { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';
import { EASE, SectionHeading } from './fx';
import EpisodeCard from './EpisodeCard';
import { RailButtons } from './Rail';

export default function Seasons() {
  const reduced = useReducedMotionPref();
  const { seasons } = usePortfolio();
  const [active, setActive] = useState(0);
  const safeActive = Math.min(Math.max(active, 0), Math.max(seasons.length - 1, 0));
  const season = seasons[safeActive] || seasons[0];
  const rail = useRef<HTMLDivElement>(null);

  if (!season) return null;

  return (
    <>
      <SectionHeading
        kicker={`${seasons.length} Academic Phases`}
        title="Academic Details"
        aside={<p className="max-w-xs text-sm text-mist">My formal education, academic curriculum, and engineering milestones — select a phase to view details.</p>}
      />

      {/* phase selector */}
      <div className="rail gutter mb-8 flex gap-2 overflow-x-auto" role="group" aria-label="Academic Phases">
        {seasons.map((s, i) => (
          <button
            key={s.number}
            aria-pressed={i === safeActive}
            type="button"
            onClick={() => {
              setActive(i);
              rail.current?.scrollTo({ left: 0, behavior: reduced ? 'auto' : 'smooth' });
            }}
            className={`relative shrink-0 rounded-full px-4 py-2.5 text-left transition ${i === safeActive ? 'text-ink' : 'text-mist hover:text-bone'}`}
          >
            {i === safeActive && <motion.span layoutId="season-pill" className="absolute inset-0 rounded-full bg-bone" transition={{ duration: 0.5, ease: EASE }} />}
            <span className="relative block text-[10px] font-bold tracking-[0.24em]">PHASE {String(s.number).padStart(2, '0')}</span>
            <span className="relative block whitespace-nowrap text-sm font-semibold">{s.title}</span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={season.number}
          initial={{ opacity: 0, x: 40, filter: 'blur(8px)' }}
          animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, x: -40, filter: 'blur(8px)' }}
          transition={{ duration: 0.55, ease: EASE }}
        >
          <div className="gutter mb-2 flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <h3 className="font-display text-4xl tracking-wide text-bone sm:text-5xl">
              <span className="text-outline mr-3">P{String(season.number).padStart(2, '0')}</span>
              {season.title}
            </h3>
            <span className="text-sm text-mist">
              {season.period} · {season.episodes.length} {season.episodes.length === 1 ? 'Milestone' : 'Milestones'}
            </span>
          </div>
          <p className="gutter max-w-3xl text-[15px] leading-relaxed text-bone/75">{season.synopsis}</p>

          <div className="group/rail relative">
            <div ref={rail} className="rail gutter flex snap-x snap-mandatory gap-4 overflow-x-auto py-8 [perspective:1200px]">
              {season.episodes.map((e, i) => (
                <EpisodeCard key={e.code} episode={e} index={i} />
              ))}
            </div>
            <RailButtons rail={rail} />
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
}
