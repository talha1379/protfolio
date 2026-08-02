import React, { useState, useEffect, useRef } from 'react';
import { Project } from '../types';
import { X, Plus, Save, Upload, Trash2, RotateCcw, Image as ImageIcon, AlertCircle } from 'lucide-react';
import { processImageFile } from '../utils/imageUtils';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (projectData: Omit<Project, 'id' | 'number'>, existingId?: string) => void;
  projectToEdit?: Project | null;
}

export const ProjectEditorModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onSave,
  projectToEdit
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [technologiesText, setTechnologiesText] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [liveUrl, setLiveUrl] = useState('');
  const [image, setImage] = useState<string | undefined>(undefined);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (projectToEdit) {
      setTitle(projectToEdit.title);
      setDescription(projectToEdit.description);
      setTechnologiesText(projectToEdit.technologies.join(', '));
      setGithubUrl(projectToEdit.githubUrl);
      setLiveUrl(projectToEdit.liveUrl);
      setImage(projectToEdit.image);
    } else {
      setTitle('');
      setDescription('');
      setTechnologiesText('React.js, Tailwind CSS, JavaScript');
      setGithubUrl('https://github.com/talha1379/');
      setLiveUrl('https://demo.vercel.app');
      setImage(undefined);
    }
    setErrors({});
  }, [projectToEdit, isOpen]);

  if (!isOpen) return null;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const dataUrl = await processImageFile(file, 1000, 700, 0.85);
      setImage(dataUrl);
    } catch (err: any) {
      alert(err.message || 'Error processing image.');
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!title.trim()) newErrors.title = 'Project title is required.';
    if (!description.trim()) newErrors.description = 'Project description is required.';
    if (!technologiesText.trim()) newErrors.technologies = 'At least one technology is required.';
    if (!githubUrl.trim()) newErrors.githubUrl = 'GitHub Repository URL is required.';
    if (!liveUrl.trim()) newErrors.liveUrl = 'Live Demo URL is required.';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const techArray = technologiesText
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0);

    onSave(
      {
        title: title.trim(),
        description: description.trim(),
        technologies: techArray,
        githubUrl: githubUrl.trim(),
        liveUrl: liveUrl.trim(),
        image: image || undefined
      },
      projectToEdit?.id
    );

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-slate-950/60">
          <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <Plus className="w-4 h-4 text-sky-400" />
            {projectToEdit ? 'Edit Project' : 'Add New Project'}
          </h3>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4">
          
          {/* Title */}
          <div>
            <label className="block text-xs font-mono font-semibold text-slate-300 mb-1">
              Project Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Smart Traffic Analytics"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
            {errors.title && (
              <p className="text-xs text-rose-400 font-mono mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.title}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-mono font-semibold text-slate-300 mb-1">
              Short Description *
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Explain the purpose, features, and target users..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
            {errors.description && (
              <p className="text-xs text-rose-400 font-mono mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.description}
              </p>
            )}
          </div>

          {/* Technologies */}
          <div>
            <label className="block text-xs font-mono font-semibold text-slate-300 mb-1">
              Technologies (comma separated) *
            </label>
            <input
              type="text"
              value={technologiesText}
              onChange={(e) => setTechnologiesText(e.target.value)}
              placeholder="e.g. React.js, Tailwind CSS, Supabase, Node.js"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
            {errors.technologies && (
              <p className="text-xs text-rose-400 font-mono mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.technologies}
              </p>
            )}
          </div>

          {/* URLs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono font-semibold text-slate-300 mb-1">
                GitHub Repository URL *
              </label>
              <input
                type="url"
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                placeholder="https://github.com/..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
              {errors.githubUrl && (
                <p className="text-xs text-rose-400 font-mono mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.githubUrl}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-mono font-semibold text-slate-300 mb-1">
                Live Demo URL *
              </label>
              <input
                type="url"
                value={liveUrl}
                onChange={(e) => setLiveUrl(e.target.value)}
                placeholder="https://..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
              {errors.liveUrl && (
                <p className="text-xs text-rose-400 font-mono mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.liveUrl}
                </p>
              )}
            </div>
          </div>

          {/* Image Upload Area */}
          <div>
            <label className="block text-xs font-mono font-semibold text-slate-300 mb-1">
              Project Screenshot / Cover Image (Optional)
            </label>
            <div className="flex items-center gap-4 p-3 bg-slate-950 rounded-xl border border-slate-800">
              <div className="w-20 h-14 rounded-lg bg-slate-900 border border-slate-800 overflow-hidden flex items-center justify-center shrink-0">
                {image ? (
                  <img src={image} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <ImageIcon className="w-6 h-6 text-slate-600" />
                )}
              </div>

              <div className="flex-1">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-sky-400 text-xs font-mono border border-slate-800 transition-colors"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>{image ? 'Replace File' : 'Browse Local Computer'}</span>
                </button>
                {image && (
                  <button
                    type="button"
                    onClick={() => setImage(undefined)}
                    className="ml-2 inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-900 text-rose-400 hover:bg-rose-950/60 text-xs font-mono transition-colors"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Clear</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Footer Submit */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-slate-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs transition-colors shadow-lg shadow-sky-500/20"
            >
              <Save className="w-4 h-4" />
              <span>{projectToEdit ? 'Update Project' : 'Save Project'}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
