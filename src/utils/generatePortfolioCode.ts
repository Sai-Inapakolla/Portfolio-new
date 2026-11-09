import type { Project, SkillCategory } from '../data/portfolio';

export function generatePortfolioCode({
  profile,
  education,
  experience,
  projects,
  productionApps,
  achievements,
  certifications,
  skillCategories,
  skillEvidence,
  seasons,
  topPicks,
  introSlides,
}: {
  profile: any;
  education: any[];
  experience: any[];
  projects: Project[];
  productionApps: any[];
  achievements: any[];
  certifications: any[];
  skillCategories: SkillCategory[];
  skillEvidence: Record<string, string[]>;
  seasons: any[];
  topPicks: any[];
  introSlides: any[];
}): string {
  return `const asset = (name: string) => \`\${import.meta.env.BASE_URL}assets/\${name}\`;
// Portfolio facts transcribed for Sai Inapakolla.

export type Palette = { from: string; via: string; to: string; accent: string };
export type Metric = { value: string; label: string };
export type Project = { id: string; title: string; year: string; genre: string; logline: string; stack: string[]; build: string[]; features: string[]; metrics: Metric[]; github?: string; appUrl?: string; website?: string; palette: Palette; motif: 'shield' | 'flow' | 'tenants' };
export type Achievement = { id: string; title: string; org: string; detail: string; laurel: string; link?: string };
export type Certification = { issuer: string; name: string; link?: string };
export type Skill = { name: string; mono: string; note?: string };
export type SkillCategory = { id: string; title: string; subtitle: string; skills: Skill[] };
export type Episode = { code: string; title: string; description: string; tags: string[]; runtime: string; palette: Palette };
export type Season = { number: number; title: string; period: string; synopsis: string; episodes: Episode[] };
export type TopPick = { label: string; title: string; detail: string; palette: Palette };
export type IntroSlide = { kicker: string; title: string; lines: string[]; chips?: string[] };

export const profile = ${JSON.stringify(
    {
      ...profile,
      resumePdf: undefined,
      portrait: undefined,
    },
    null,
    2
  ).replace(
    /}$/,
    `  resumePdf: ${profile.resumePdf.startsWith('http') ? JSON.stringify(profile.resumePdf) : "asset('Resume.pdf')"},
  portrait: { src: asset('portrait-background.png'), srcSet: \`\${asset('portrait-background.png')} 768w\`, alt: '${profile.displayName}' },
};`
  )}

export const education = ${JSON.stringify(education, null, 2)};

export const experience = ${JSON.stringify(experience, null, 2)};

export const projects: Project[] = ${JSON.stringify(projects, null, 2)};

export const productionApps = ${JSON.stringify(productionApps, null, 2)};

export const achievements: Achievement[] = ${JSON.stringify(achievements, null, 2)};

export const certifications: Certification[] = ${JSON.stringify(certifications, null, 2)};

export const skillCategories: SkillCategory[] = ${JSON.stringify(skillCategories, null, 2)};

export const skillEvidence: Record<string, string[]> = ${JSON.stringify(skillEvidence, null, 2)};

export const seasons: Season[] = ${JSON.stringify(seasons, null, 2)};

export const topPicks: TopPick[] = ${JSON.stringify(topPicks, null, 2)};

export const introSlides: IntroSlide[] = ${JSON.stringify(introSlides, null, 2)};

export type ProfileId = 'sai' | 'recruiter' | 'developer' | 'creative';
export type SectionId = 'about' | 'journey' | 'originals' | 'picks' | 'skills' | 'moments' | 'story';

export const viewerProfiles: {
  id: ProfileId;
  name: string;
  blurb: string;
  color: string;
  order: SectionId[];
}[] = [
  {
    id: 'sai',
    name: 'Sai',
    blurb: 'The full series, in order',
    color: '#e5132b',
    order: ['about', 'journey', 'originals', 'picks', 'skills', 'moments', 'story'],
  },
  {
    id: 'recruiter',
    name: 'Recruiter',
    blurb: 'Resume, achievements & skills first',
    color: '#4cc9ff',
    order: ['story', 'moments', 'skills', 'originals', 'about', 'journey', 'picks'],
  },
  {
    id: 'developer',
    name: 'Developer',
    blurb: 'Projects, stack & GitHub first',
    color: '#46e3a8',
    order: ['originals', 'skills', 'journey', 'moments', 'about', 'picks', 'story'],
  },
  {
    id: 'creative',
    name: 'Creative',
    blurb: 'The story arc & highlights first',
    color: '#ffb547',
    order: ['journey', 'picks', 'originals', 'moments', 'about', 'skills', 'story'],
  },
];

const crimson = projects[1]?.palette || projects[0]?.palette || { from: '#2a0610', via: '#7a0f24', to: '#0b0710', accent: '#ff3d5a' };
const amber = projects[3]?.palette || projects[0]?.palette || { from: '#1a0d02', via: '#8a4a07', to: '#0a0806', accent: '#ffb547' };
const ocean = projects[0]?.palette || { from: '#04121f', via: '#0f4c6e', to: '#05080d', accent: '#4cc9ff' };
const violet: Palette = { from: '#120822', via: '#3d1a6e', to: '#07060c', accent: '#b98bff' };
const jade: Palette = { from: '#03150f', via: '#0d5a40', to: '#050a08', accent: '#46e3a8' };

export const sectionMeta: Record<SectionId, { nav: string; card: string; meta: string; palette: Palette }> = {
  about: { nav: 'About', card: 'About Me', meta: 'The Pilot • Education & engineering', palette: violet },
  journey: { nav: 'Journey', card: 'My Journey', meta: \`\${seasons.length} Seasons • \${seasons.reduce((n, s) => n + s.episodes.length, 0)} Episodes\`, palette: amber },
  originals: { nav: 'Originals', card: 'My Projects', meta: \`\${projects.length} Originals • Full-Stack & Systems\`, palette: crimson },
  picks: { nav: 'Top Picks', card: 'Top Picks', meta: \`Top \${topPicks.length} highlights\`, palette: jade },
  skills: { nav: 'Skills', card: 'My Skills', meta: \`\${skillCategories.length} Categories\`, palette: ocean },
  moments: { nav: 'Moments', card: 'My Achievements', meta: \`\${achievements.length} Moments • \${certifications.length} Credentials\`, palette: crimson },
  story: { nav: 'Resume', card: 'The Full Story', meta: 'Resume • View & contact', palette: violet },
};
`;
}

