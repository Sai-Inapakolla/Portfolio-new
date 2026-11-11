import { useRef, type ReactNode } from 'react';
import { useTrackProgress } from '../hooks/sectionProgress';

/**
 * A section of the series. Keeps native scroll performance crisp while
 * reporting viewing progress for the Continue Exploring row.
 */
export default function Scene({ id, children, className = '' }: { id: string; children: ReactNode; className?: string }) {
  const ref = useRef<HTMLElement>(null);
  useTrackProgress(id, ref);

  return (
    <section id={id} ref={ref} className={`relative scroll-mt-16 py-16 sm:py-24 ${className}`}>
      {children}
    </section>
  );
}
