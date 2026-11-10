import { useState } from 'react';
import { motion } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';
import { formatResumeLinks } from '../utils/resumeLink';
import { EASE, Magnetic, SectionHeading } from './fx';

/** THE FULL STORY — a designed resume preview plus view / download actions. */
export default function ResumeSection({ onView }: { onView: () => void }) {
  const { profile, projects, certifications, education } = usePortfolio();
  const resumeLinks = formatResumeLinks(profile.resumePdf);
  return (
    <>
      <SectionHeading kicker="The screenplay" title="The Full Story" />
      <div className="gutter grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-14">
        <motion.div
          initial={{ opacity: 0, y: 60, rotateX: 10 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 1.1, ease: EASE }}
          style={{ transformPerspective: 1600 }}
        >
          <CollapsibleSheet />
        </motion.div>

        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="font-serif text-3xl italic leading-tight text-bone">Every episode, on one page.</p>
          <p className="mt-3 text-sm leading-relaxed text-mist">
            Education, experience, projects, achievements and {certifications.length} certifications — view it here or take a copy with you.
          </p>
          <div className="mt-6 flex flex-col gap-3">
            <Magnetic className="w-full">
              <button
                type="button"
                data-cursor="view"
                onClick={onView}
                className="flex min-h-12 w-full items-center justify-center gap-2 rounded-md bg-bone px-6 text-[15px] font-bold text-ink transition hover:bg-white"
              >
                ▶ View Resume
              </button>
            </Magnetic>
            <Magnetic className="w-full">
              {profile.resumePdf ? (
                <a
                  href={resumeLinks.downloadUrl}
                  target={resumeLinks.isExternal ? '_blank' : undefined}
                  rel={resumeLinks.isExternal ? 'noreferrer' : undefined}
                  download={resumeLinks.isExternal ? undefined : 'Resume.pdf'}
                  data-cursor="link"
                  className="glass flex min-h-12 w-full items-center justify-center gap-2 rounded-md px-6 text-[15px] font-semibold text-bone transition hover:bg-white/15"
                >
                  ⤓ Download Resume
                </a>
              ) : (
                <button
                  type="button"
                  data-cursor="view"
                  onClick={onView}
                  className="glass flex min-h-12 w-full items-center justify-center gap-2 rounded-md px-6 text-[15px] font-semibold text-bone transition hover:bg-white/15"
                >
                  ⤓ Download Resume
                </button>
              )}
            </Magnetic>
          </div>
          <dl className="mt-8 grid grid-cols-3 gap-px overflow-hidden rounded-xl bg-white/10 text-center">
            {[
              { v: education[0].score.replace('CGPA ', ''), k: 'CGPA' },
              { v: String(projects.length), k: 'Originals' },
              { v: String(certifications.length), k: 'Certs' },
            ].map((s) => (
              <div key={s.k} className="bg-ink-2 px-2 py-4">
                <dd className="font-display text-3xl leading-none text-bone">{s.v}</dd>
                <dt className="mt-1 text-[10px] font-bold uppercase tracking-[0.2em] text-smoke">{s.k}</dt>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </>
  );
}

/** On phones the sheet starts as a teaser so the page keeps its pace; desktop shows it in full. */
function CollapsibleSheet() {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <div className={`overflow-hidden transition-[max-height] duration-700 ease-[var(--ease-cine)] md:max-h-none ${open ? 'max-h-[12000px]' : 'max-h-[560px]'}`}>
        <ResumeSheet />
      </div>
      {!open && (
        <div className="absolute inset-x-0 bottom-0 flex h-48 items-end justify-center rounded-b-2xl bg-gradient-to-t from-ink via-ink/85 to-transparent pb-4 md:hidden">
          <button type="button" onClick={() => setOpen(true)} className="glass min-h-11 rounded-full px-5 text-sm font-semibold text-bone">
            Read the full story ↓
          </button>
        </div>
      )}
    </div>
  );
}

function H({ children }: { children: string }) {
  return <h4 className="mb-3 mt-7 border-b border-white/10 pb-1.5 text-[10px] font-bold uppercase tracking-[0.3em] text-crimson-2 first:mt-0">{children}</h4>;
}

export function ResumeSheet() {
  const { profile, education, experience, projects, skillCategories, achievements, certifications, productionApps } = usePortfolio();
  return (
    <article className="relative overflow-hidden rounded-2xl bg-[linear-gradient(180deg,#121218,#0c0c11)] p-6 ring-1 ring-white/10 sm:p-10">
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-crimson-2/70 to-transparent" />
      <header className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <p className="text-[10px] font-bold tracking-[0.34em] text-smoke">STARRING</p>
          <h3 className="mt-1 font-display text-[clamp(1.9rem,4.4vw,3.2rem)] leading-[0.9] tracking-wide text-bone">{profile.fullName}</h3>
        </div>
        <div className="text-xs leading-relaxed text-mist sm:text-right">
          <a href={`mailto:${profile.email}`} className="block hover:text-bone">
            {profile.email}
          </a>
          <a href={`tel:${profile.phone.replace(/\s/g, '')}`} className="block hover:text-bone">{profile.phone}</a>
          {profile.links.website && (
            <a href={profile.links.website} target="_blank" rel="noreferrer" className="block hover:text-bone">
              {profile.links.website.replace(/^https?:\/\//, '')} ↗
            </a>
          )}
          {profile.links.linkedin && (
            <a href={profile.links.linkedin} target="_blank" rel="noreferrer" className="hover:text-bone">
              LinkedIn ↗
            </a>
          )}
          {profile.links.github && (
            <>
              {' · '}
              <a href={profile.links.github} target="_blank" rel="noreferrer" className="hover:text-bone">
                GitHub ↗
              </a>
            </>
          )}
          {profile.links.leetcode && (
            <>
              {' · '}
              <a href={profile.links.leetcode} target="_blank" rel="noreferrer" className="hover:text-bone">
                LeetCode ↗
              </a>
            </>
          )}
        </div>
      </header>

      <div className="grid gap-x-10 md:grid-cols-[1.4fr_1fr]">
        <div>
          <H>Education</H>
          {education.map((e) => (
            <div key={e.school} className="mb-4">
              <div className="flex flex-wrap justify-between gap-x-3">
                <p className="text-sm font-semibold text-bone">
                  {e.school}, {e.place}
                </p>
                <p className="text-xs text-smoke">{e.period}</p>
              </div>
              <p className="text-xs text-mist">
                {e.degree} · <span className="text-bone/80">{e.score}</span>
              </p>
            </div>
          ))}

          <H>Work Experience</H>
          {experience.map((x) => (
            <div key={x.company}>
              <div className="flex flex-wrap justify-between gap-x-3">
                <p className="text-sm font-semibold text-bone">
                  {x.company} — {x.role}
                </p>
                <p className="text-xs text-smoke">{x.period}</p>
              </div>
              <ul className="mt-2 space-y-1.5">
                {x.points.map((p) => (
                  <li key={p} className="flex gap-2 text-xs leading-relaxed text-mist">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-crimson-2" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <H>Projects</H>
          {projects.map((p) => (
            <div key={p.id} className="mb-3">
              <div className="flex flex-wrap justify-between gap-x-3">
                <p className="text-sm font-semibold text-bone">{p.title}</p>
                <p className="text-xs text-smoke">{p.year}</p>
              </div>
              <p className="text-xs text-mist">{p.stack.join(', ')}</p>
            </div>
          ))}
        </div>

        <div>
          <H>Skills</H>
          <div className="space-y-2">
            {skillCategories.map((c) => (
              <p key={c.id} className="text-xs leading-relaxed text-mist">
                <span className="font-semibold text-bone">{c.title}: </span>
                {c.skills.map((s) => s.name).join(', ')}
              </p>
            ))}
          </div>

          <H>Achievements</H>
          <ul className="space-y-2">
            {achievements.map((a) => (
              <li key={a.id} className="text-xs leading-relaxed text-mist">
                <span className="font-semibold text-bone">
                  {a.title} — {a.org}.
                </span>{' '}
                {a.detail}
              </li>
            ))}
          </ul>

          <H>Featured Builds & Repos</H>
          <div className="flex flex-wrap gap-x-3 gap-y-2">{productionApps.map((app) => <a key={app.name} href={app.url} target="_blank" rel="noreferrer" className="text-xs text-mist underline hover:text-bone">{app.name} ↗</a>)}</div>
          <H>Languages</H>
          <p className="text-xs text-mist">{profile.languages.join(' · ')}</p>
          {certifications.length > 0 && (
            <>
              <H>Certifications</H>
              <p className="text-xs leading-relaxed text-mist">
                {Array.from(new Set(certifications.map((c) => c.issuer)))
                  .map((iss) => `${iss}: ${certifications.filter((c) => c.issuer === iss).map((c) => c.name).join(', ')}`)
                  .join(' · ')}
              </p>
            </>
          )}
        </div>
      </div>
    </article>
  );
}
