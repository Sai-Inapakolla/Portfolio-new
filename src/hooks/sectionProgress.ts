import { useEffect, useSyncExternalStore, type RefObject } from 'react';

/**
 * Tracks how much of each section the visitor has actually watched (0–1),
 * batched across a single shared scroll/resize listener for zero scroll-jank.
 */
const progress: Record<string, number> = {};
const listeners = new Set<() => void>();
const targets = new Map<string, HTMLElement>();
let snapshot = { ...progress };
let rafId = 0;
let attached = false;

function measureAll() {
  rafId = 0;
  const vh = window.innerHeight;
  let changed = false;

  targets.forEach((el, id) => {
    if ((progress[id] ?? 0) >= 1) return;
    const r = el.getBoundingClientRect();
    const seen = Math.min(1, Math.max(0, (vh - r.top) / (r.height + vh * 0.25)));
    if (seen > (progress[id] ?? 0)) {
      progress[id] = seen;
      changed = true;
    }
  });

  if (changed) {
    snapshot = { ...progress };
    listeners.forEach((l) => l());
  }
}

function scheduleMeasure() {
  if (!rafId) rafId = requestAnimationFrame(measureAll);
}

function ensureListeners() {
  if (attached) return;
  attached = true;
  window.addEventListener('scroll', scheduleMeasure, { passive: true });
  window.addEventListener('resize', scheduleMeasure, { passive: true });
}

function teardownIfEmpty() {
  if (!attached || targets.size > 0) return;
  attached = false;
  window.removeEventListener('scroll', scheduleMeasure);
  window.removeEventListener('resize', scheduleMeasure);
  cancelAnimationFrame(rafId);
  rafId = 0;
}

export function useWatchProgress() {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => snapshot,
    () => snapshot,
  );
}

export function useTrackProgress(id: string, ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    targets.set(id, el);
    ensureListeners();
    scheduleMeasure();
    return () => {
      targets.delete(id);
      teardownIfEmpty();
    };
  }, [id, ref]);
}
