import { useEffect, useState } from 'react';
import type { LeetCodeAchievements } from '../data/portfolio';

export default function LeetCodePanel() {
  const [data, setData] = useState<LeetCodeAchievements | null>(null);

  useEffect(() => {
    fetch('/api/leetcode')
      .then((response) => (response.ok ? response.json() as Promise<{ data?: LeetCodeAchievements }> : Promise.reject(new Error('Unavailable'))))
      .then((result) => setData(result.data || null))
      .catch(() => undefined);
  }, []);

  if (!data) return null;

  return (
    <section className="gutter mt-16" aria-labelledby="leetcode-achievements-title">
      <div className="overflow-hidden rounded-2xl bg-ink-2 ring-1 ring-white/10">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-white/10 px-5 py-5 sm:px-7">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-crimson-2">Algorithmic practice</p>
            <h3 id="leetcode-achievements-title" className="mt-1 font-display text-3xl tracking-wide text-bone">LeetCode achievements</h3>
          </div>
          <a
            href={`https://leetcode.com/u/${encodeURIComponent(data.username)}/`}
            target="_blank"
            rel="noreferrer"
            data-cursor="link"
            className="text-xs font-semibold tracking-wide text-mist underline decoration-white/20 underline-offset-4 hover:text-bone"
          >
            @{data.username} ↗
          </a>
        </div>

        <div className="grid gap-6 px-5 py-6 sm:px-7 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
          <div>
            <div className="flex items-end gap-3">
              <strong className="font-display text-6xl leading-none text-bone">{data.total}</strong>
              <span className="pb-1 text-xs uppercase tracking-[0.18em] text-mist">solved</span>
            </div>
            <div className="mt-5 grid grid-cols-3 gap-2">
              <Stat label="Easy" value={data.easy} tone="text-emerald-300" />
              <Stat label="Medium" value={data.medium} tone="text-amber-300" />
              <Stat label="Hard" value={data.hard} tone="text-crimson-2" />
            </div>
            {data.badges.length > 0 && (
              <div className="mt-6">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-smoke">Badges</p>
                <div className="mt-3 flex flex-wrap gap-3">
                  {data.badges.map((badge) => (
                    <div key={`${badge.name}-${badge.earnedAt}`} className="flex items-center gap-2 text-xs text-mist" title={badge.name}>
                      {badge.icon ? <img src={badge.icon} alt="" className="h-8 w-8 object-contain" /> : <span className="h-8 w-8 rounded-full bg-crimson/20" />}
                      <span className="max-w-28 truncate">{badge.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-smoke">Recent accepted problems</p>
            <div className="mt-3 divide-y divide-white/10 rounded-xl border border-white/10">
              {data.recent.length > 0 ? data.recent.slice(0, 5).map((problem) => (
                <a
                  key={`${problem.title}-${problem.solvedAt}`}
                  href={problem.url}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="link"
                  className="flex items-center justify-between gap-4 px-4 py-3 text-sm text-bone transition hover:bg-white/[0.04]"
                >
                  <span className="truncate">{problem.title}</span>
                  <span className="shrink-0 text-[10px] text-smoke">{formatDate(problem.solvedAt)}</span>
                </a>
              )) : <p className="px-4 py-4 text-sm text-smoke">No recent accepted submissions found.</p>}
            </div>
          </div>
        </div>
        <p className="border-t border-white/10 px-5 py-3 text-[10px] text-smoke sm:px-7">Updated {formatDate(data.fetchedAt)}</p>
      </div>
    </section>
  );
}

function Stat({ label, value, tone }: { label: string; value: number; tone: string }) {
  return (
    <div className="rounded-lg bg-white/[0.04] px-3 py-2">
      <p className={`text-lg font-semibold ${tone}`}>{value}</p>
      <p className="mt-1 text-[10px] uppercase tracking-wider text-smoke">{label}</p>
    </div>
  );
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(value));
}
