import { useRef, useState, useEffect } from 'react';
import type { Project } from '../data/portfolio';
import { usePortfolio } from '../context/PortfolioContext';
import { RevealText } from './fx';
import ProjectCard from './ProjectCard';

/**
 * ORIGINALS — Horizontal project rail that scrolls sideways on horizontal gesture,
 * while allowing normal page scrolling when scrolling up or down.
 */
export default function Originals({ onOpen }: { onOpen: (p: Project) => void }) {
  const { projects, profile } = usePortfolio();
  const railRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollButtons = () => {
    if (!railRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = railRef.current;
    setCanScrollLeft(scrollLeft > 15);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 15);
  };

  useEffect(() => {
    const el = railRef.current;
    if (!el) return;
    updateScrollButtons();
    el.addEventListener('scroll', updateScrollButtons, { passive: true });
    window.addEventListener('resize', updateScrollButtons);
    return () => {
      el.removeEventListener('scroll', updateScrollButtons);
      window.removeEventListener('resize', updateScrollButtons);
    };
  }, [projects.length]);

  const scrollSide = (direction: 'left' | 'right') => {
    if (!railRef.current) return;
    const cardWidth = 360;
    const delta = direction === 'left' ? -cardWidth : cardWidth;
    railRef.current.scrollBy({ left: delta, behavior: 'smooth' });
  };

  return (
    <div className="relative py-8">
      {/* Section Header */}
      <div className="gutter mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="mb-2 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.32em] text-crimson-2">
            <span className="h-px w-6 bg-crimson-2" /> {projects.length} Originals · Full-Stack &amp; Systems
          </p>
          <RevealText as="h2" text="ORIGINALS" className="font-display text-[clamp(2.5rem,7vw,5.5rem)] leading-[0.9] text-bone" />
          <p className="mt-3 max-w-lg text-sm text-mist">
            Featured engineering projects and platforms. Scroll sideways or use the arrows to browse, and click any title for architectural details.
          </p>
        </div>

        {/* Carousel Navigation Buttons */}
        <div className="hidden items-center gap-2 sm:flex">
          <button
            type="button"
            onClick={() => scrollSide('left')}
            disabled={!canScrollLeft}
            aria-label="Previous projects"
            className={`flex h-11 w-11 items-center justify-center rounded-full border text-lg transition ${
              canScrollLeft
                ? 'border-white/20 bg-ink-2 text-bone hover:border-crimson hover:bg-white/10 hover:text-crimson-2'
                : 'cursor-not-allowed border-white/5 bg-white/[0.02] text-smoke/30'
            }`}
          >
            ‹
          </button>
          <button
            type="button"
            onClick={() => scrollSide('right')}
            disabled={!canScrollRight}
            aria-label="Next projects"
            className={`flex h-11 w-11 items-center justify-center rounded-full border text-lg transition ${
              canScrollRight
                ? 'border-white/20 bg-ink-2 text-bone hover:border-crimson hover:bg-white/10 hover:text-crimson-2'
                : 'cursor-not-allowed border-white/5 bg-white/[0.02] text-smoke/30'
            }`}
          >
            ›
          </button>
        </div>
      </div>

      {/* Horizontal Carousel Rail */}
      <div className="relative">
        <div
          ref={railRef}
          data-lenis-prevent
          className="rail gutter flex snap-x snap-mandatory gap-5 overflow-x-auto pb-8 pt-2 scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {projects.map((p, i) => (
            <div key={p.id} className="snap-start shrink-0">
              <ProjectCard project={p} index={i} onOpen={() => onOpen(p)} />
            </div>
          ))}

          {/* Outro Card */}
          <div className="snap-start shrink-0">
            <a
              href={profile.links.github}
              target="_blank"
              rel="noreferrer"
              data-cursor="link"
              className="group flex aspect-[3/4] w-[75vw] flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-white/15 bg-white/[0.01] text-center transition hover:border-crimson-2/60 sm:w-[320px] lg:h-[480px] lg:w-[280px]"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white/25 text-xl text-bone transition group-hover:scale-110 group-hover:border-crimson-2 group-hover:text-crimson-2">
                ↗
              </span>
              <span className="font-display text-2xl tracking-wide text-bone">More on GitHub</span>
              <span className="text-xs text-mist">{profile.links.github?.replace('https://', '')}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
