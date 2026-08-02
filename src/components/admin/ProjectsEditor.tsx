import React, { useState, useRef } from 'react';
import { Project } from '../../types';
import { processImageFile } from '../../utils/imageUtils';
import { storageService } from '../../services/storageService';
import {
  Save,
  Plus,
  Trash2,
  Copy,
  Eye,
  EyeOff,
  MoveUp,
  MoveDown,
  Upload,
  CheckCircle2,
  FolderGit2,
  ExternalLink,
  Github,
  Image as ImageIcon
} from 'lucide-react';

interface Props {
  projects: Project[];
  onSave: (updatedProjects: Project[]) => void;
}

export const ProjectsEditor: React.FC<Props> = ({ projects, onSave }) => {
  const [projectList, setProjectList] = useState<Project[]>([...projects]);
  const [editingId, setEditingId] = useState<string | null>(projects[0]?.id || null);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadingProjId, setUploadingProjId] = useState<string | null>(null);

  const currentProject = projectList.find((p) => p.id === editingId) || projectList[0];

  const handleUpdateCurrent = (field: keyof Project, value: any) => {
    if (!currentProject) return;
    const updated = projectList.map((p) =>
      p.id === currentProject.id ? { ...p, [field]: value } : p
    );
    setProjectList(updated);
  };

  const handleTechStringChange = (techStr: string) => {
    if (!currentProject) return;
    const tags = techStr.split(',').map((t) => t.trim()).filter(Boolean);
    handleUpdateCurrent('technologies', tags);
  };

  const handleAddProject = () => {
    const nextNum = (projectList.length + 1).toString().padStart(2, '0');
    const newProj: Project = {
      id: 'proj-' + Date.now(),
      number: nextNum,
      title: 'New Full-Stack Project',
      description: 'An interactive web application showcasing scalable architecture and clean code practices.',
      technologies: ['React.js', 'TypeScript', 'Tailwind CSS'],
      githubUrl: 'https://github.com/talha1379',
      liveUrl: 'https://vercel.app',
      featured: true,
      status: 'Completed'
    };
    const updated = [...projectList, newProj];
    setProjectList(updated);
    setEditingId(newProj.id);
  };

  const handleDuplicateProject = (proj: Project) => {
    const dup: Project = {
      ...proj,
      id: 'proj-' + Date.now(),
      title: `${proj.title} (Copy)`,
      number: (projectList.length + 1).toString().padStart(2, '0')
    };
    const updated = [...projectList, dup];
    setProjectList(updated);
    setEditingId(dup.id);
  };

  const handleDeleteProject = (id: string) => {
    const updated = projectList.filter((p) => p.id !== id);
    setProjectList(updated);
    setConfirmDeleteId(null);
    if (editingId === id && updated.length > 0) {
      setEditingId(updated[0].id);
    }
  };

  const handleToggleVisibility = (id: string) => {
    const updated = projectList.map((p) =>
      p.id === id ? { ...p, featured: !p.featured } : p
    );
    setProjectList(updated);
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    if ((direction === 'up' && index === 0) || (direction === 'down' && index === projectList.length - 1)) return;
    const updated = [...projectList];
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    const temp = updated[index];
    updated[index] = updated[targetIdx];
    updated[targetIdx] = temp;
    setProjectList(updated);
  };

  // Image upload
  const handleTriggerImageUpload = (projId: string) => {
    setUploadingProjId(projId);
    fileInputRef.current?.click();
  };

  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !uploadingProjId) return;

    try {
      const base64 = await processImageFile(file);
      const storageRes = await storageService.uploadFile(file, 'project-images');
      const finalUrl = storageRes.url || base64;

      const updated = projectList.map((p) =>
        p.id === uploadingProjId ? { ...p, image: finalUrl } : p
      );
      setProjectList(updated);
    } catch (err: any) {
      alert(err.message || 'Failed to process project image.');
    } finally {
      setUploadingProjId(null);
      if (e.target) e.target.value = '';
    }
  };

  const handleRemoveImage = (projId: string) => {
    const updated = projectList.map((p) =>
      p.id === projId ? { ...p, image: undefined } : p
    );
    setProjectList(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(projectList);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageFileChange}
        accept="image/png,image/jpeg,image/webp,image/svg+xml"
        className="hidden"
      />

      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div>
          <h2 className="text-xl font-bold text-white font-mono">Project Portfolio Manager</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Create, update, reorder, duplicate, upload cover images, and manage visibility of portfolio projects.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleAddProject}
            className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 font-bold text-xs border border-white/10 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Project</span>
          </button>

          <button
            type="submit"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-blue-600/20 active:scale-95"
          >
            <Save className="w-4 h-4" />
            <span>Save All Projects</span>
          </button>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2 font-semibold animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>All project changes saved permanently!</span>
        </div>
      )}

      {/* Confirmation Modal */}
      {confirmDeleteId && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-between gap-4">
          <div className="text-xs text-red-300">
            Are you sure you want to delete this project? Action cannot be undone.
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleDeleteProject(confirmDeleteId)}
              className="px-3 py-1.5 rounded-lg bg-red-600 text-white font-bold text-xs"
            >
              Confirm Delete
            </button>
            <button
              type="button"
              onClick={() => setConfirmDeleteId(null)}
              className="px-3 py-1.5 rounded-lg bg-white/10 text-slate-300 text-xs"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Projects List Sidebar */}
        <div className="space-y-2">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">
            Projects List ({projectList.length})
          </div>

          <div className="space-y-2 max-h-[600px] overflow-y-auto custom-scrollbar pr-1">
            {projectList.map((proj, index) => {
              const isEditing = proj.id === editingId;
              return (
                <div
                  key={proj.id}
                  onClick={() => setEditingId(proj.id)}
                  className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all flex items-center justify-between gap-2 ${
                    isEditing
                      ? 'bg-blue-600/10 border-blue-500 text-white'
                      : 'bg-[#121212] border-white/5 text-slate-300 hover:bg-white/5'
                  }`}
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold font-mono px-1.5 py-0.5 rounded bg-white/10 text-slate-400">
                        {proj.number || (index + 1)}
                      </span>
                      <h4 className="text-xs font-bold truncate">{proj.title}</h4>
                    </div>
                    <p className="text-[11px] text-slate-500 truncate mt-1">
                      {proj.technologies.join(' • ')}
                    </p>
                  </div>

                  <div className="flex items-center gap-1 flex-shrink-0">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleVisibility(proj.id);
                      }}
                      className="p-1 hover:text-white text-slate-400"
                      title={proj.featured !== false ? 'Featured (Visible)' : 'Hidden'}
                    >
                      {proj.featured !== false ? <Eye className="w-3.5 h-3.5 text-blue-400" /> : <EyeOff className="w-3.5 h-3.5 text-slate-500" />}
                    </button>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMove(index, 'up');
                      }}
                      disabled={index === 0}
                      className="p-1 text-slate-400 hover:text-white disabled:opacity-20"
                    >
                      <MoveUp className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMove(index, 'down');
                      }}
                      disabled={index === projectList.length - 1}
                      className="p-1 text-slate-400 hover:text-white disabled:opacity-20"
                    >
                      <MoveDown className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Project Form Editor */}
        {currentProject && (
          <div className="lg:col-span-2 p-6 rounded-2xl bg-[#121212] border border-white/10 space-y-5">
            
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <FolderGit2 className="w-4 h-4 text-blue-400" />
                <h3 className="text-sm font-bold text-white font-mono">
                  Editing: {currentProject.title}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleDuplicateProject(currentProject)}
                  className="px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 text-xs flex items-center gap-1"
                  title="Duplicate Project"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Duplicate</span>
                </button>

                <button
                  type="button"
                  onClick={() => setConfirmDeleteId(currentProject.id)}
                  className="px-2.5 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs flex items-center gap-1"
                  title="Delete Project"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                  Project Title
                </label>
                <input
                  type="text"
                  value={currentProject.title}
                  onChange={(e) => handleUpdateCurrent('title', e.target.value)}
                  className="w-full px-3 py-2.5 bg-[#181818] border border-white/10 rounded-xl text-white text-xs font-bold"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                  Display Order Number (e.g. 01)
                </label>
                <input
                  type="text"
                  value={currentProject.number}
                  onChange={(e) => handleUpdateCurrent('number', e.target.value)}
                  className="w-full px-3 py-2.5 bg-[#181818] border border-white/10 rounded-xl text-white text-xs font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                Project Description
              </label>
              <textarea
                rows={3}
                value={currentProject.description}
                onChange={(e) => handleUpdateCurrent('description', e.target.value)}
                className="w-full px-3 py-2.5 bg-[#181818] border border-white/10 rounded-xl text-white text-xs"
                required
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                Technologies (comma separated)
              </label>
              <input
                type="text"
                value={currentProject.technologies.join(', ')}
                onChange={(e) => handleTechStringChange(e.target.value)}
                placeholder="React.js, Tailwind CSS, Supabase"
                className="w-full px-3 py-2.5 bg-[#181818] border border-white/10 rounded-xl text-white text-xs font-mono"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                  GitHub Repository URL
                </label>
                <div className="relative">
                  <Github className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-500" />
                  <input
                    type="text"
                    value={currentProject.githubUrl}
                    onChange={(e) => handleUpdateCurrent('githubUrl', e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-[#181818] border border-white/10 rounded-xl text-white text-xs font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                  Live Demo URL
                </label>
                <div className="relative">
                  <ExternalLink className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-500" />
                  <input
                    type="text"
                    value={currentProject.liveUrl}
                    onChange={(e) => handleUpdateCurrent('liveUrl', e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-[#181818] border border-white/10 rounded-xl text-white text-xs font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Project Image Picker & Preview */}
            <div className="p-4 rounded-xl bg-[#181818] border border-white/10 space-y-3">
              <label className="block text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <ImageIcon className="w-4 h-4 text-blue-400" />
                <span>Project Image / Screenshot</span>
              </label>

              {currentProject.image ? (
                <div className="space-y-3">
                  <div className="w-full h-40 rounded-lg overflow-hidden border border-white/10 bg-[#0A0A0A]">
                    <img
                      src={currentProject.image}
                      alt={currentProject.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleTriggerImageUpload(currentProject.id)}
                      className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs"
                    >
                      Replace Image
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(currentProject.id)}
                      className="px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs"
                    >
                      Remove Image
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-6 border-2 border-dashed border-white/10 rounded-xl text-center space-y-2">
                  <p className="text-xs text-slate-400">
                    No image uploaded for this project.
                  </p>
                  <button
                    type="button"
                    onClick={() => handleTriggerImageUpload(currentProject.id)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Choose Project Image</span>
                  </button>
                </div>
              )}
            </div>

          </div>
        )}
      </div>
    </form>
  );
};
