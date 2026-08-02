import React, { useRef } from 'react';
import { Project } from '../types';
import { ExternalLink, Github, Upload, RotateCcw, Edit2, Copy, Trash2, Code2 } from 'lucide-react';
import { DefaultProjectGraphic } from './DefaultProjectGraphic';
import { processImageFile } from '../utils/imageUtils';

interface Props {
  project: Project;
  onUpdateImage: (projectId: string, imageDataUrl: string | null) => void;
  onEdit?: (project: Project) => void;
  onDuplicate?: (project: Project) => void;
  onDelete?: (projectId: string) => void;
  isManagementMode?: boolean;
}

export const ProjectCard: React.FC<Props> = ({
  project,
  onUpdateImage,
  onEdit,
  onDuplicate,
  onDelete,
  isManagementMode = false
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const dataUrl = await processImageFile(file, 1000, 700, 0.85);
      onUpdateImage(project.id, dataUrl);
    } catch (err: any) {
      alert(err.message || 'Error uploading image');
    }
  };

  const handleTriggerUpload = () => {
    fileInputRef.current?.click();
  };

  const handleResetImage = () => {
    onUpdateImage(project.id, null);
  };

  return (
    <div className="bg-[#141414] rounded-2xl border border-white/5 overflow-hidden shadow-xl hover:border-white/10 transition-all duration-300 flex flex-col justify-between group">
      
      {/* Top Media Header */}
      <div className="relative">
        
        {/* Project Image Container */}
        <div className="w-full aspect-video bg-black overflow-hidden relative">
          {project.image ? (
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <DefaultProjectGraphic title={project.title} technologies={project.technologies} />
          )}

          {/* Number Tag Overlay */}
          <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-black/80 border border-white/10 text-blue-500 font-mono text-xs font-bold backdrop-blur-md">
            #{project.number}
          </div>

          {/* Quick Image Action Trigger Bar */}
          <div className="absolute top-3 right-3 flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />
            <button
              onClick={handleTriggerUpload}
              className="px-2 py-1 rounded bg-[#141414]/90 hover:bg-blue-600 hover:text-white text-slate-300 text-[10px] border border-white/10 backdrop-blur-md flex items-center gap-1 transition-colors shadow-md"
              title="Upload custom project image"
            >
              <Upload className="w-3 h-3" />
              <span>{project.image ? 'Change' : 'Upload Image'}</span>
            </button>

            {project.image && (
              <button
                onClick={handleResetImage}
                className="p-1 rounded bg-[#141414]/90 hover:bg-rose-950/80 text-slate-400 hover:text-rose-300 border border-white/10 backdrop-blur-md transition-colors"
                title="Reset to default graphic"
              >
                <RotateCcw className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>

      </div>

      {/* Project Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-base font-bold text-white mb-2">
            {project.title}
          </h3>

          <p className="text-xs text-slate-400 leading-relaxed mb-4">
            {project.description}
          </p>
        </div>

        <div>
          {/* Tech Stack Badges */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 bg-white/5 border border-white/10 rounded text-[10px] text-slate-300"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Main Action Links */}
          <div className="pt-3 border-t border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-400 hover:text-blue-300 font-bold flex items-center gap-1 cursor-pointer transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Live Demo</span>
              </a>

              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </a>
            </div>

            {/* Management Controls */}
            {isManagementMode && (
              <div className="flex items-center gap-1 border-l border-white/10 pl-2">
                {onEdit && (
                  <button
                    onClick={() => onEdit(project)}
                    className="p-1.5 rounded text-slate-400 hover:text-blue-400 hover:bg-white/5 transition-colors"
                    title="Edit project details"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                )}
                {onDuplicate && (
                  <button
                    onClick={() => onDuplicate(project)}
                    className="p-1.5 rounded text-slate-400 hover:text-blue-400 hover:bg-white/5 transition-colors"
                    title="Duplicate project"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                )}
                {onDelete && (
                  <button
                    onClick={() => onDelete(project.id)}
                    className="p-1.5 rounded text-slate-400 hover:text-rose-400 hover:bg-white/5 transition-colors"
                    title="Delete project"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

    </div>
  );
};
