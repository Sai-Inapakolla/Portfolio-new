import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';
import { useScrollLock } from '../hooks/smoothScroll';
import type { Project, Palette } from '../data/portfolio';

const PALETTES: { name: string; palette: Palette }[] = [
  { name: 'Cyan Ocean', palette: { from: '#04121f', via: '#0f4c6e', to: '#05080d', accent: '#4cc9ff' } },
  { name: 'Crimson Red', palette: { from: '#2a0610', via: '#7a0f24', to: '#0b0710', accent: '#ff3d5a' } },
  { name: 'Golden Amber', palette: { from: '#1a0d02', via: '#8a4a07', to: '#0a0806', accent: '#ffb547' } },
  { name: 'Electric Violet', palette: { from: '#120822', via: '#3d1a6e', to: '#07060c', accent: '#b98bff' } },
  { name: 'Emerald Jade', palette: { from: '#03150f', via: '#0d5a40', to: '#050a08', accent: '#46e3a8' } },
];

export default function AdminModal() {
  const {
    isUnlocked,
    isAdminOpen,
    setIsAdminOpen,
    login,
    logout,
    profile,
    projects,
    skillCategories,
    updateProfile,
    addProject,
    updateProject,
    deleteProject,
    moveProject,
    updateSkills,
    saveAll,
    resetToOriginal,
  } = usePortfolio();

  const [pin, setPin] = useState('');
  const [pinError, setPinError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'projects' | 'resume' | 'skills' | 'profile'>('projects');
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  useScrollLock(isAdminOpen);

  // Project Edit / Add State
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [projForm, setProjForm] = useState<{
    id: string;
    title: string;
    genre: string;
    year: string;
    logline: string;
    stack: string;
    features: string;
    github: string;
    appUrl: string;
    motif: 'shield' | 'flow' | 'tenants';
    paletteIndex: number;
  }>({
    id: '',
    title: '',
    genre: '',
    year: '2025',
    logline: '',
    stack: '',
    features: '',
    github: '',
    appUrl: '',
    motif: 'shield',
    paletteIndex: 0,
  });

  // Skills quick add state
  const [newSkillName, setNewSkillName] = useState('');
  const [activeCatIndex, setActiveCatIndex] = useState(0);

  if (!isAdminOpen) return null;

  const handleUnlock = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await login(pin);
    if (result.success) {
      setPinError(null);
    } else {
      setPinError(result.message || 'Invalid admin password');
    }
  };

  const handleSave = async () => {
    setSaveStatus('Saving...');
    const res = await saveAll();
    setSaveStatus(res.message);
    setTimeout(() => setSaveStatus(null), 4000);
  };

  const openAddProject = () => {
    setProjForm({
      id: `project-${Date.now()}`,
      title: '',
      genre: 'Full Stack • Backend',
      year: new Date().getFullYear().toString(),
      logline: '',
      stack: 'Java, Spring Boot, React, MySQL',
      features: 'Feature 1\nFeature 2',
      github: '',
      appUrl: '',
      motif: 'shield',
      paletteIndex: 0,
    });
    setEditingProject(null);
    setIsAddingProject(true);
  };

  const openEditProject = (p: Project) => {
    const palIdx = PALETTES.findIndex((pal) => pal.palette.accent === p.palette.accent);
    setProjForm({
      id: p.id,
      title: p.title,
      genre: p.genre,
      year: p.year,
      logline: p.logline,
      stack: p.stack.join(', '),
      features: p.features.join('\n'),
      github: p.github || '',
      appUrl: p.appUrl || '',
      motif: p.motif || 'shield',
      paletteIndex: palIdx >= 0 ? palIdx : 0,
    });
    setEditingProject(p);
    setIsAddingProject(true);
  };

  const saveProjectForm = (e: React.FormEvent) => {
    e.preventDefault();
    const newProj: Project = {
      id: projForm.id || `proj-${Date.now()}`,
      title: projForm.title,
      genre: projForm.genre,
      year: projForm.year,
      logline: projForm.logline,
      stack: projForm.stack.split(',').map((s) => s.trim()).filter(Boolean),
      build: [projForm.logline],
      features: projForm.features.split('\n').map((f) => f.trim()).filter(Boolean),
      metrics: [],
      github: projForm.github || undefined,
      appUrl: projForm.appUrl || undefined,
      palette: PALETTES[projForm.paletteIndex].palette,
      motif: projForm.motif,
    };

    if (editingProject) {
      updateProject(newProj);
    } else {
      addProject(newProj);
    }
    setIsAddingProject(false);
    setEditingProject(null);
  };

  const handleAddSkill = (catId: string) => {
    if (!newSkillName.trim()) return;
    const mono = newSkillName.trim().slice(0, 2);
    const updated = skillCategories.map((c) => {
      if (c.id === catId) {
        return {
          ...c,
          skills: [...c.skills, { name: newSkillName.trim(), mono }],
        };
      }
      return c;
    });
    updateSkills(updated);
    setNewSkillName('');
  };

  const handleRemoveSkill = (catId: string, skillName: string) => {
    const updated = skillCategories.map((c) => {
      if (c.id === catId) {
        return {
          ...c,
          skills: c.skills.filter((s) => s.name !== skillName),
        };
      }
      return c;
    });
    updateSkills(updated);
  };

  return (
    <div data-lenis-prevent className="fixed inset-0 z-[200] flex items-center justify-center bg-black/85 p-3 backdrop-blur-md sm:p-6">
      <motion.div
        data-lenis-prevent
        className="relative flex h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-white/15 bg-[#0d0d14] text-bone shadow-2xl"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
      >
        {/* Header Bar */}
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-white/10 px-6">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-crimson/20 text-crimson-2 font-bold text-sm">
              🔒
            </span>
            <div>
              <h2 className="font-display text-xl tracking-wide text-bone">Portfolio Studio</h2>
              <p className="text-[11px] text-smoke">Live Management & Editor</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {isUnlocked && (
              <button
                type="button"
                onClick={() => { void logout(); setIsAdminOpen(false); }}
                className="rounded-lg border border-white/15 px-3 py-2 text-[10px] font-semibold tracking-wider text-mist hover:text-bone"
              >
                LOCK
              </button>
            )}
            <button
              type="button"
              onClick={() => setIsAdminOpen(false)}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-mist hover:bg-white/20 hover:text-bone"
              aria-label="Close portfolio studio"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Locked View */}
        {!isUnlocked ? (
          <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-white/5 text-2xl shadow-[0_0_40px_rgba(229,19,43,0.25)]">
              🔐
            </div>
            <h3 className="font-display text-3xl text-bone">Enter Security Passcode</h3>
            <p className="mt-2 max-w-sm text-xs text-smoke">
              Unlock the studio to add, edit, or delete projects, update your resume link, skills, and contact details.
            </p>
            <form onSubmit={handleUnlock} className="mt-6 flex w-full max-w-xs flex-col gap-3">
              <input
                type="password"
                value={pin}
                onChange={(e) => {
                  setPin(e.target.value);
                  setPinError(null);
                }}
                placeholder="Enter admin password"
                autoFocus
                className="w-full rounded-lg border border-white/20 bg-ink px-4 py-3 text-center text-lg tracking-widest text-bone placeholder:text-smoke/60 focus:border-crimson focus:outline-none"
              />
              {pinError && <p className="text-xs text-crimson-2">{pinError}</p>}
              <button
                type="submit"
                className="rounded-lg bg-crimson py-3 font-sans text-sm font-bold tracking-wider text-white shadow-lg transition hover:bg-crimson-2"
              >
                UNLOCK STUDIO
              </button>
              <p className="text-[11px] text-smoke/70">Use the admin password configured on the server.</p>
            </form>
          </div>
        ) : (
          /* Unlocked Studio View */
          <div className="flex flex-1 flex-col overflow-hidden">
            {/* Tabs Bar */}
            <div className="flex shrink-0 gap-2 border-b border-white/10 px-6 pt-3">
              <button
                type="button"
                onClick={() => { setActiveTab('projects'); setIsAddingProject(false); }}
                className={`pb-3 text-xs font-semibold tracking-wider transition ${
                  activeTab === 'projects' ? 'border-b-2 border-crimson text-bone' : 'text-smoke hover:text-mist'
                }`}
              >
                PROJECTS ({projects.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('resume')}
                className={`pb-3 text-xs font-semibold tracking-wider transition ${
                  activeTab === 'resume' ? 'border-b-2 border-crimson text-bone' : 'text-smoke hover:text-mist'
                }`}
              >
                RESUME &amp; LINKS
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('skills')}
                className={`pb-3 text-xs font-semibold tracking-wider transition ${
                  activeTab === 'skills' ? 'border-b-2 border-crimson text-bone' : 'text-smoke hover:text-mist'
                }`}
              >
                SKILLS ({skillCategories.reduce((acc, c) => acc + c.skills.length, 0)})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('profile')}
                className={`pb-3 text-xs font-semibold tracking-wider transition ${
                  activeTab === 'profile' ? 'border-b-2 border-crimson text-bone' : 'text-smoke hover:text-mist'
                }`}
              >
                PROFILE &amp; BIO
              </button>
            </div>

            {/* Tab Contents */}
            <div data-lenis-prevent className="flex-1 overflow-y-auto p-6">
              {/* TAB 1: PROJECTS */}
              {activeTab === 'projects' && (
                <div>
                  {!isAddingProject ? (
                    <div>
                      <div className="mb-4 flex items-center justify-between">
                        <div>
                          <h4 className="font-display text-lg text-bone">Original Engineering Projects</h4>
                          <p className="text-xs text-smoke">Reorder, edit details, or remove projects anytime.</p>
                        </div>
                        <button
                          type="button"
                          onClick={openAddProject}
                          className="flex items-center gap-1.5 rounded-lg bg-crimson px-4 py-2 text-xs font-bold text-white transition hover:bg-crimson-2"
                        >
                          <span>＋</span> Add Project
                        </button>
                      </div>

                      <div className="space-y-3">
                        {projects.map((p, idx) => (
                          <div
                            key={p.id}
                            className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-white/20"
                          >
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-2">
                                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: p.palette.accent }} />
                                <h5 className="font-semibold text-bone">{p.title}</h5>
                                <span className="rounded bg-white/10 px-1.5 py-0.5 text-[10px] text-mist">{p.year}</span>
                              </div>
                              <p className="mt-1 line-clamp-1 text-xs text-mist">{p.logline}</p>
                              <div className="mt-2 flex flex-wrap gap-1">
                                {p.stack.slice(0, 5).map((st) => (
                                  <span key={st} className="rounded bg-black/40 px-1.5 py-0.5 text-[10px] text-smoke">
                                    {st}
                                  </span>
                                ))}
                              </div>
                            </div>

                            <div className="flex items-center gap-1.5 shrink-0">
                              <button
                                type="button"
                                disabled={idx === 0}
                                onClick={() => moveProject(idx, 'up')}
                                className="rounded p-1.5 text-xs text-mist hover:bg-white/10 hover:text-bone disabled:opacity-30"
                                title="Move Up"
                              >
                                ▲
                              </button>
                              <button
                                type="button"
                                disabled={idx === projects.length - 1}
                                onClick={() => moveProject(idx, 'down')}
                                className="rounded p-1.5 text-xs text-mist hover:bg-white/10 hover:text-bone disabled:opacity-30"
                                title="Move Down"
                              >
                                ▼
                              </button>
                              <button
                                type="button"
                                onClick={() => openEditProject(p)}
                                className="rounded border border-white/15 px-3 py-1.5 text-xs font-semibold text-bone hover:bg-white/10"
                              >
                                ✏️ Edit
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  if (confirm(`Are you sure you want to delete "${p.title}"?`)) {
                                    deleteProject(p.id);
                                  }
                                }}
                                className="rounded border border-crimson/30 px-3 py-1.5 text-xs font-semibold text-crimson-2 hover:bg-crimson/10"
                              >
                                🗑️ Delete
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    /* Project Add/Edit Form */
                    <form onSubmit={saveProjectForm} className="space-y-4">
                      <div className="flex items-center justify-between border-b border-white/10 pb-3">
                        <h4 className="font-display text-lg text-bone">
                          {editingProject ? `Edit "${editingProject.title}"` : 'Add New Project'}
                        </h4>
                        <button
                          type="button"
                          onClick={() => setIsAddingProject(false)}
                          className="text-xs text-mist hover:text-bone"
                        >
                          Cancel
                        </button>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <label className="block text-[11px] font-semibold text-smoke uppercase tracking-wider">Project Title *</label>
                          <input
                            type="text"
                            required
                            value={projForm.title}
                            onChange={(e) => setProjForm({ ...projForm, title: e.target.value })}
                            placeholder="e.g. NextGen Microservices"
                            className="mt-1 w-full rounded-lg border border-white/15 bg-ink px-3 py-2 text-sm text-bone focus:border-crimson focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold text-smoke uppercase tracking-wider">Category / Genre *</label>
                          <input
                            type="text"
                            required
                            value={projForm.genre}
                            onChange={(e) => setProjForm({ ...projForm, genre: e.target.value })}
                            placeholder="e.g. Java • Spring Boot • FinTech"
                            className="mt-1 w-full rounded-lg border border-white/15 bg-ink px-3 py-2 text-sm text-bone focus:border-crimson focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <label className="block text-[11px] font-semibold text-smoke uppercase tracking-wider">Year</label>
                          <input
                            type="text"
                            value={projForm.year}
                            onChange={(e) => setProjForm({ ...projForm, year: e.target.value })}
                            placeholder="2025"
                            className="mt-1 w-full rounded-lg border border-white/15 bg-ink px-3 py-2 text-sm text-bone focus:border-crimson focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold text-smoke uppercase tracking-wider">Motif Style</label>
                          <select
                            value={projForm.motif}
                            onChange={(e) => setProjForm({ ...projForm, motif: e.target.value as any })}
                            className="mt-1 w-full rounded-lg border border-white/15 bg-ink px-3 py-2 text-sm text-bone focus:border-crimson focus:outline-none"
                          >
                            <option value="shield">Shield (Security &amp; Resilience)</option>
                            <option value="flow">Flow (Real-Time &amp; Algorithms)</option>
                            <option value="tenants">Tenants (Multi-Tenant &amp; SaaS Grid)</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-smoke uppercase tracking-wider">Logline / One-sentence Summary *</label>
                        <textarea
                          rows={2}
                          required
                          value={projForm.logline}
                          onChange={(e) => setProjForm({ ...projForm, logline: e.target.value })}
                          placeholder="A high-throughput platform with automated workflows..."
                          className="mt-1 w-full rounded-lg border border-white/15 bg-ink px-3 py-2 text-sm text-bone focus:border-crimson focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-smoke uppercase tracking-wider">Tech Stack (comma separated)</label>
                        <input
                          type="text"
                          value={projForm.stack}
                          onChange={(e) => setProjForm({ ...projForm, stack: e.target.value })}
                          placeholder="Java, Spring Boot, React, MySQL, Docker"
                          className="mt-1 w-full rounded-lg border border-white/15 bg-ink px-3 py-2 text-sm text-bone focus:border-crimson focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-smoke uppercase tracking-wider">Key Features (one per line)</label>
                        <textarea
                          rows={3}
                          value={projForm.features}
                          onChange={(e) => setProjForm({ ...projForm, features: e.target.value })}
                          placeholder="Tenant data isolation&#10;Role-based access control&#10;Sub-50ms read latency"
                          className="mt-1 w-full rounded-lg border border-white/15 bg-ink px-3 py-2 text-sm text-bone focus:border-crimson focus:outline-none"
                        />
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <label className="block text-[11px] font-semibold text-smoke uppercase tracking-wider">GitHub URL</label>
                          <input
                            type="url"
                            value={projForm.github}
                            onChange={(e) => setProjForm({ ...projForm, github: e.target.value })}
                            placeholder="https://github.com/Sai-Inapakolla/..."
                            className="mt-1 w-full rounded-lg border border-white/15 bg-ink px-3 py-2 text-sm text-bone focus:border-crimson focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold text-smoke uppercase tracking-wider">Live App / Demo URL</label>
                          <input
                            type="url"
                            value={projForm.appUrl}
                            onChange={(e) => setProjForm({ ...projForm, appUrl: e.target.value })}
                            placeholder="https://..."
                            className="mt-1 w-full rounded-lg border border-white/15 bg-ink px-3 py-2 text-sm text-bone focus:border-crimson focus:outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-smoke uppercase tracking-wider">Color Palette</label>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {PALETTES.map((pal, i) => (
                            <button
                              key={pal.name}
                              type="button"
                              onClick={() => setProjForm({ ...projForm, paletteIndex: i })}
                              className={`flex items-center gap-2 rounded-lg border px-3 py-1.5 text-xs ${
                                projForm.paletteIndex === i ? 'border-bone bg-white/10 text-bone' : 'border-white/10 text-mist'
                              }`}
                            >
                              <span className="h-3 w-3 rounded-full" style={{ backgroundColor: pal.palette.accent }} />
                              {pal.name}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="flex justify-end gap-3 pt-3">
                        <button
                          type="button"
                          onClick={() => setIsAddingProject(false)}
                          className="rounded-lg border border-white/20 px-4 py-2 text-xs font-semibold text-mist hover:text-bone"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="rounded-lg bg-crimson px-6 py-2 text-xs font-bold text-white hover:bg-crimson-2"
                        >
                          {editingProject ? 'Save Changes' : 'Add Project'}
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              )}

              {/* TAB 2: RESUME & CONTACT LINKS */}
              {activeTab === 'resume' && (
                <div className="space-y-5">
                  <div>
                    <h4 className="font-display text-lg text-bone">Resume &amp; Contact Links</h4>
                    <p className="text-xs text-smoke">Update your Google Drive resume link, location, and social links.</p>
                  </div>

                  <div className="rounded-xl border border-white/15 bg-white/[0.02] p-4">
                    <label className="block text-xs font-bold uppercase tracking-wider text-crimson-2">
                      📄 Resume URL (Google Drive, Dropbox, Notion or Direct Link)
                    </label>
                    <div className="mt-2 flex gap-2">
                      <input
                        type="url"
                        value={profile.resumePdf}
                        onChange={(e) => updateProfile({ resumePdf: e.target.value })}
                        placeholder="https://drive.google.com/file/d/.../view"
                        className="flex-1 rounded-lg border border-white/20 bg-ink px-4 py-2.5 text-sm text-bone focus:border-crimson focus:outline-none"
                      />
                      {profile.resumePdf.startsWith('http') && (
                        <a
                          href={profile.resumePdf}
                          target="_blank"
                          rel="noreferrer"
                          className="rounded-lg border border-white/20 px-4 py-2.5 text-xs font-semibold text-bone hover:bg-white/10 flex items-center"
                        >
                          Test Link ↗
                        </a>
                      )}
                    </div>
                    <p className="mt-1 text-[11px] text-smoke">
                      Paste a shareable Google Drive link, Dropbox link, or PDF URL. The viewer and download button will dynamically use this link.
                    </p>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-[11px] font-semibold text-smoke uppercase tracking-wider">Location</label>
                      <input
                        type="text"
                        value={profile.location}
                        onChange={(e) => updateProfile({ location: e.target.value })}
                        placeholder="Hyderabad, Telangana"
                        className="mt-1 w-full rounded-lg border border-white/15 bg-ink px-3 py-2 text-sm text-bone focus:border-crimson focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-smoke uppercase tracking-wider">Email Address</label>
                      <input
                        type="email"
                        value={profile.email}
                        onChange={(e) => updateProfile({ email: e.target.value })}
                        placeholder="inapakolla.sai1@gmail.com"
                        className="mt-1 w-full rounded-lg border border-white/15 bg-ink px-3 py-2 text-sm text-bone focus:border-crimson focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-[11px] font-semibold text-smoke uppercase tracking-wider">Phone Number</label>
                      <input
                        type="text"
                        value={profile.phone}
                        onChange={(e) => updateProfile({ phone: e.target.value })}
                        placeholder="+91 9490969706"
                        className="mt-1 w-full rounded-lg border border-white/15 bg-ink px-3 py-2 text-sm text-bone focus:border-crimson focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-smoke uppercase tracking-wider">LinkedIn URL</label>
                      <input
                        type="url"
                        value={profile.links.linkedin || ''}
                        onChange={(e) => updateProfile({ links: { ...profile.links, linkedin: e.target.value } })}
                        placeholder="https://www.linkedin.com/in/..."
                        className="mt-1 w-full rounded-lg border border-white/15 bg-ink px-3 py-2 text-sm text-bone focus:border-crimson focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-[11px] font-semibold text-smoke uppercase tracking-wider">GitHub URL</label>
                      <input
                        type="url"
                        value={profile.links.github || ''}
                        onChange={(e) => updateProfile({ links: { ...profile.links, github: e.target.value } })}
                        placeholder="https://github.com/..."
                        className="mt-1 w-full rounded-lg border border-white/15 bg-ink px-3 py-2 text-sm text-bone focus:border-crimson focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-smoke uppercase tracking-wider">LeetCode URL</label>
                      <input
                        type="url"
                        value={profile.links.leetcode || ''}
                        onChange={(e) => updateProfile({ links: { ...profile.links, leetcode: e.target.value } })}
                        placeholder="https://leetcode.com/u/..."
                        className="mt-1 w-full rounded-lg border border-white/15 bg-ink px-3 py-2 text-sm text-bone focus:border-crimson focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-[11px] font-semibold text-smoke uppercase tracking-wider">Instagram URL</label>
                      <input
                        type="url"
                        value={profile.links.instagram || ''}
                        onChange={(e) => updateProfile({ links: { ...profile.links, instagram: e.target.value } })}
                        placeholder="https://instagram.com/..."
                        className="mt-1 w-full rounded-lg border border-white/15 bg-ink px-3 py-2 text-sm text-bone focus:border-crimson focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-smoke uppercase tracking-wider">Website URL</label>
                      <input
                        type="url"
                        value={profile.links.website || ''}
                        onChange={(e) => updateProfile({ links: { ...profile.links, website: e.target.value } })}
                        placeholder="https://safego1.vercel.app"
                        className="mt-1 w-full rounded-lg border border-white/15 bg-ink px-3 py-2 text-sm text-bone focus:border-crimson focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: SKILLS */}
              {activeTab === 'skills' && (
                <div className="space-y-6">
                  <div>
                    <h4 className="font-display text-lg text-bone">Technical Skills &amp; Categories</h4>
                    <p className="text-xs text-smoke">Add or remove skills in each domain category.</p>
                  </div>

                  <div className="flex flex-wrap gap-2 border-b border-white/10 pb-3">
                    {skillCategories.map((c, idx) => (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => setActiveCatIndex(idx)}
                        className={`rounded-lg px-3 py-1.5 text-xs font-semibold ${
                          activeCatIndex === idx ? 'bg-crimson text-white' : 'border border-white/10 text-mist hover:text-bone'
                        }`}
                      >
                        {c.title} ({c.skills.length})
                      </button>
                    ))}
                  </div>

                  {skillCategories[activeCatIndex] && (
                    <div className="rounded-xl border border-white/15 bg-white/[0.02] p-5">
                      <div className="flex items-center justify-between">
                        <div>
                          <h5 className="font-semibold text-bone">{skillCategories[activeCatIndex].title}</h5>
                          <p className="text-xs text-mist">{skillCategories[activeCatIndex].subtitle}</p>
                        </div>
                      </div>

                      {/* Skills tags */}
                      <div className="mt-4 flex flex-wrap gap-2">
                        {skillCategories[activeCatIndex].skills.map((s) => (
                          <span
                            key={s.name}
                            className="flex items-center gap-2 rounded-lg border border-white/15 bg-ink-2 px-3 py-1.5 text-xs text-bone"
                          >
                            <span>{s.name}</span>
                            <button
                              type="button"
                              onClick={() => handleRemoveSkill(skillCategories[activeCatIndex].id, s.name)}
                              className="text-smoke hover:text-crimson-2"
                              title="Remove skill"
                            >
                              ✕
                            </button>
                          </span>
                        ))}
                      </div>

                      {/* Add new skill input */}
                      <div className="mt-4 flex gap-2">
                        <input
                          type="text"
                          value={newSkillName}
                          onChange={(e) => setNewSkillName(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              handleAddSkill(skillCategories[activeCatIndex].id);
                            }
                          }}
                          placeholder={`Add new skill to ${skillCategories[activeCatIndex].title}...`}
                          className="flex-1 rounded-lg border border-white/15 bg-ink px-3 py-2 text-sm text-bone focus:border-crimson focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => handleAddSkill(skillCategories[activeCatIndex].id)}
                          className="rounded-lg bg-bone px-4 py-2 text-xs font-bold text-ink hover:bg-white"
                        >
                          ＋ Add
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 4: PROFILE & BIO */}
              {activeTab === 'profile' && (
                <div className="space-y-4">
                  <div>
                    <h4 className="font-display text-lg text-bone">Profile &amp; Headline</h4>
                    <p className="text-xs text-smoke">Customize your brand titles, headline, and bio intro.</p>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-[11px] font-semibold text-smoke uppercase tracking-wider">Full Name</label>
                      <input
                        type="text"
                        value={profile.fullName}
                        onChange={(e) => updateProfile({ fullName: e.target.value, displayName: e.target.value })}
                        className="mt-1 w-full rounded-lg border border-white/15 bg-ink px-3 py-2 text-sm text-bone focus:border-crimson focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-smoke uppercase tracking-wider">First / Title Name</label>
                      <input
                        type="text"
                        value={profile.firstName}
                        onChange={(e) => updateProfile({ firstName: e.target.value })}
                        className="mt-1 w-full rounded-lg border border-white/15 bg-ink px-3 py-2 text-sm text-bone focus:border-crimson focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-smoke uppercase tracking-wider">Professional Role Title</label>
                    <input
                      type="text"
                      value={profile.role}
                      onChange={(e) => updateProfile({ role: e.target.value })}
                      className="mt-1 w-full rounded-lg border border-white/15 bg-ink px-3 py-2 text-sm text-bone focus:border-crimson focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-smoke uppercase tracking-wider">Tagline Highlights (comma separated)</label>
                    <input
                      type="text"
                      value={profile.tagline.join(', ')}
                      onChange={(e) =>
                        updateProfile({
                          tagline: e.target.value.split(',').map((t) => t.trim()).filter(Boolean),
                        })
                      }
                      className="mt-1 w-full rounded-lg border border-white/15 bg-ink px-3 py-2 text-sm text-bone focus:border-crimson focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-smoke uppercase tracking-wider">About Me / Bio</label>
                    <textarea
                      rows={4}
                      value={profile.intro}
                      onChange={(e) => updateProfile({ intro: e.target.value })}
                      className="mt-1 w-full rounded-lg border border-white/15 bg-ink px-3 py-2 text-sm text-bone focus:border-crimson focus:outline-none"
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-[11px] font-semibold text-smoke uppercase tracking-wider">Experience Badge</label>
                      <input
                        type="text"
                        value={profile.yearsExperience}
                        onChange={(e) => updateProfile({ yearsExperience: e.target.value })}
                        placeholder="Class of 2027"
                        className="mt-1 w-full rounded-lg border border-white/15 bg-ink px-3 py-2 text-sm text-bone focus:border-crimson focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-smoke uppercase tracking-wider">Badge Tag</label>
                      <input
                        type="text"
                        value={profile.primaryBadge || ''}
                        onChange={(e) => updateProfile({ primaryBadge: e.target.value })}
                        placeholder="Full Stack"
                        className="mt-1 w-full rounded-lg border border-white/15 bg-ink px-3 py-2 text-sm text-bone focus:border-crimson focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer Action Bar */}
            <div className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-t border-white/10 bg-black/40 px-6 py-4">
              <div className="text-xs text-smoke">
                {saveStatus ? (
                  <span className="font-semibold text-emerald-400">{saveStatus}</span>
                ) : (
                  <span>Changes apply live immediately in your browser.</span>
                )}
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    if (confirm('Reset all changes back to initial state?')) {
                      resetToOriginal();
                    }
                  }}
                  className="rounded-lg border border-white/15 px-3 py-2 text-xs font-semibold text-smoke hover:text-bone"
                >
                  ↺ Reset Defaults
                </button>

                <button
                  type="button"
                  onClick={handleSave}
                  className="flex items-center gap-1.5 rounded-lg bg-emerald-600 px-5 py-2 text-xs font-bold text-white shadow-lg transition hover:bg-emerald-500"
                >
                  <span>💾</span> Save &amp; Sync
                </button>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}

