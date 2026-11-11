import React, { createContext, useContext, useEffect, useState } from 'react';
import * as originalData from '../data/portfolio';
import type { Project, SkillCategory, Season, Achievement, TopPick, Certification } from '../data/portfolio';

const STORAGE_DATA_KEY = 'sai_portfolio_custom_data_v1';
const STORAGE_AUTH_KEY = 'sai_portfolio_unlocked';

interface PortfolioState {
  profile: typeof originalData.profile;
  education: typeof originalData.education;
  experience: typeof originalData.experience;
  projects: Project[];
  skillCategories: SkillCategory[];
  seasons: Season[];
  achievements: Achievement[];
  topPicks: TopPick[];
  productionApps: { name: string; url: string }[];
  certifications: Certification[];
  skillEvidence: Record<string, string[]>;
}

interface PortfolioContextType extends PortfolioState {
  isUnlocked: boolean;
  isAdminOpen: boolean;
  setIsUnlocked: (v: boolean) => void;
  setIsAdminOpen: (v: boolean) => void;
  login: (password: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => Promise<void>;
  updateProject: (project: Project) => void;
  addProject: (project: Project) => void;
  deleteProject: (id: string) => void;
  moveProject: (index: number, direction: 'up' | 'down') => void;
  updateProfile: (fields: Partial<typeof originalData.profile>) => void;
  updateSkills: (categories: SkillCategory[], nextSkillEvidence?: Record<string, string[]>) => void;
  saveAll: () => Promise<{ success: boolean; message: string }>;
  resetToOriginal: () => void;
}

const PortfolioContext = createContext<PortfolioContextType | null>(null);

function ensureSkillCategories(saved?: SkillCategory[]): SkillCategory[] {
  if (!Array.isArray(saved) || saved.length === 0) return originalData.skillCategories;
  const byId = new Map(saved.map((cat) => [cat.id, cat]));
  const ordered = originalData.skillCategories.map((def) => byId.get(def.id) ?? def);
  const extras = saved.filter(
    (cat) => !originalData.skillCategories.some((def) => def.id === cat.id),
  );
  return [...ordered, ...extras];
}

function loadSavedState(): PortfolioState {
  try {
    const raw = localStorage.getItem(STORAGE_DATA_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      const hasUpToDateSeasons = Array.isArray(parsed.seasons) &&
        parsed.seasons.length === 3 &&
        parsed.seasons[0]?.highlights &&
        !parsed.seasons.some((s: { title?: string }) => s.title?.includes('Backend Architecture') || s.title?.includes('Real-Time Systems'));

      const hasUpToDateEducation = Array.isArray(parsed.education) &&
        parsed.education.length >= 3 &&
        parsed.education[0]?.highlights;

      return {
        profile: {
          ...originalData.profile,
          ...parsed.profile,
          portrait: originalData.profile.portrait,
        },
        education: hasUpToDateEducation ? parsed.education : originalData.education,
        experience: parsed.experience || originalData.experience,
        projects: parsed.projects || originalData.projects,
        skillCategories: ensureSkillCategories(parsed.skillCategories),
        seasons: hasUpToDateSeasons ? parsed.seasons : originalData.seasons,
        achievements: parsed.achievements || originalData.achievements,
        topPicks: parsed.topPicks || originalData.topPicks,
        productionApps: parsed.productionApps || originalData.productionApps,
        certifications: parsed.certifications || originalData.certifications,
        skillEvidence: parsed.skillEvidence || originalData.skillEvidence,
      };
    }
  } catch (e) {
    console.error('Failed to load local portfolio state', e);
  }
  return {
    profile: originalData.profile,
    education: originalData.education,
    experience: originalData.experience,
    projects: originalData.projects,
    skillCategories: originalData.skillCategories,
    seasons: originalData.seasons,
    achievements: originalData.achievements,
    topPicks: originalData.topPicks,
    productionApps: originalData.productionApps,
    certifications: originalData.certifications,
    skillEvidence: originalData.skillEvidence,
  };
}

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<PortfolioState>(loadSavedState);
  const [isUnlocked, setIsUnlocked] = useState<boolean>(() => {
    return sessionStorage.getItem(STORAGE_AUTH_KEY) === 'true';
  });
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [databaseState, setDatabaseState] = useState<'loading' | 'available' | 'empty' | 'unavailable'>('loading');

  useEffect(() => {
    if (isUnlocked) {
      sessionStorage.setItem(STORAGE_AUTH_KEY, 'true');
    }
  }, [isUnlocked]);

  // Sync to localStorage on state changes
  useEffect(() => {
    localStorage.setItem(STORAGE_DATA_KEY, JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    fetch('/api/auth/session')
      .then((res) => res.json() as Promise<{ authenticated?: boolean }>)
      .then((result) => {
        if (result.authenticated) setIsUnlocked(true);
      })
      .catch(() => undefined);

    fetch('/api/portfolio')
      .then((res) => {
        if (!res.ok) throw new Error('Portfolio API unavailable');
        return res.json() as Promise<{ data?: PortfolioState }>;
      })
      .then((result) => {
        if (result.data) {
          const hasUpToDateSeasons = Array.isArray(result.data.seasons) &&
            result.data.seasons.length === 3 &&
            result.data.seasons[0]?.highlights &&
            !result.data.seasons.some((s: { title?: string }) => s.title?.includes('Backend Architecture') || s.title?.includes('Real-Time Systems'));

          const hasUpToDateEducation = Array.isArray(result.data.education) &&
            result.data.education.length >= 3 &&
            result.data.education[0]?.highlights;

          const remoteState: PortfolioState = {
            ...result.data,
            profile: {
              ...result.data.profile,
              portrait: originalData.profile.portrait,
            },
            skillCategories: ensureSkillCategories(result.data.skillCategories),
            education: hasUpToDateEducation ? result.data.education : originalData.education,
            seasons: hasUpToDateSeasons ? result.data.seasons : originalData.seasons,
          };
          setState(remoteState);
          localStorage.setItem(STORAGE_DATA_KEY, JSON.stringify(remoteState));
          setDatabaseState('available');
        } else {
          setDatabaseState('empty');
        }
      })
      .catch(() => setDatabaseState('unavailable'));
  }, []);

  const updateProject = (project: Project) => {
    setState((prev) => {
      const projects = prev.projects.map((p) => (p.id === project.id ? project : p));
      return { ...prev, projects };
    });
  };

  const addProject = (project: Project) => {
    setState((prev) => ({
      ...prev,
      projects: [project, ...prev.projects],
      productionApps: [{ name: `${project.title} (Project)`, url: project.github || project.appUrl || '#' }, ...prev.productionApps],
    }));
  };

  const deleteProject = (id: string) => {
    setState((prev) => ({
      ...prev,
      projects: prev.projects.filter((p) => p.id !== id),
    }));
  };

  const moveProject = (index: number, direction: 'up' | 'down') => {
    setState((prev) => {
      const list = [...prev.projects];
      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= list.length) return prev;
      const [item] = list.splice(index, 1);
      list.splice(targetIndex, 0, item);
      return { ...prev, projects: list };
    });
  };

  const updateProfile = (fields: Partial<typeof originalData.profile>) => {
    setState((prev) => ({
      ...prev,
      profile: {
        ...prev.profile,
        ...fields,
        links: {
          ...prev.profile.links,
          ...(fields.links || {}),
        },
      },
    }));
  };

  const updateSkills = (skillCategories: SkillCategory[], nextSkillEvidence?: Record<string, string[]>) => {
    setState((prev) => ({
      ...prev,
      skillCategories,
      ...(nextSkillEvidence ? { skillEvidence: nextSkillEvidence } : {}),
    }));
  };

  const persistState = async (data: PortfolioState) => {
    const res = await fetch('/api/portfolio', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data }),
    });
    if (!res.ok) throw new Error('Portfolio could not be saved to MongoDB');
    return res.json() as Promise<{ message?: string }>;
  };

  const login = async (password: string) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      let result: { success?: boolean; error?: string } = {};
      try {
        result = (await res.json()) as { success?: boolean; error?: string };
      } catch {
        return { success: false, message: `Server error (${res.status}): Admin API is unavailable` };
      }
      if (!res.ok || !result.success) return { success: false, message: result.error || 'Unable to unlock studio' };
      setIsUnlocked(true);
      sessionStorage.setItem(STORAGE_AUTH_KEY, 'true');
      if (databaseState === 'empty') {
        try {
          await persistState(state);
          setDatabaseState('available');
        } catch {
          return { success: true, message: 'Unlocked, but initial portfolio migration could not be completed.' };
        }
      }
      return { success: true };
    } catch {
      return { success: false, message: 'Admin API is unavailable' };
    }
  };

  const logout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' }).catch(() => undefined);
    sessionStorage.removeItem(STORAGE_AUTH_KEY);
    setIsUnlocked(false);
  };

  const saveAll = async (): Promise<{ success: boolean; message: string }> => {
    localStorage.setItem(STORAGE_DATA_KEY, JSON.stringify(state));

    try {
      const result = await persistState(state);
      setDatabaseState('available');
      return { success: true, message: result.message || 'Portfolio saved to MongoDB.' };
    } catch {
      // Keep local editing available when the API is not running.
    }

    return {
      success: true,
      message: 'Saved locally. MongoDB API is unavailable.',
    };
  };

  const resetToOriginal = () => {
    localStorage.removeItem(STORAGE_DATA_KEY);
    setState({
      profile: originalData.profile,
      education: originalData.education,
      experience: originalData.experience,
      projects: originalData.projects,
      skillCategories: originalData.skillCategories,
      seasons: originalData.seasons,
      achievements: originalData.achievements,
      topPicks: originalData.topPicks,
      productionApps: originalData.productionApps,
      certifications: originalData.certifications,
      skillEvidence: originalData.skillEvidence,
    });
  };

  return (
    <PortfolioContext.Provider
      value={{
        ...state,
        isUnlocked,
        isAdminOpen,
        setIsUnlocked,
        setIsAdminOpen,
        login,
        logout,
        updateProject,
        addProject,
        deleteProject,
        moveProject,
        updateProfile,
        updateSkills,
        saveAll,
        resetToOriginal,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
}
