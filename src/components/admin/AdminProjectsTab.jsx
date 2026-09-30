// src/components/admin/AdminProjectsTab.jsx
import React, { useState } from 'react';
import { useProfile } from '../../context/ProfileContext';
import { api } from '../../api/client';
import { FolderGit2, Plus, Edit2, Trash2, Eye, EyeOff, Star, X } from 'lucide-react';

export default function AdminProjectsTab({ onToast }) {
  const { projects, refetch } = useProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);
  const [loading, setLoading] = useState(false);

  const emptyProject = {
    title: '',
    description: '',
    badge: 'Project',
    icon: 'Sparkles',
    tags: '',
    githubUrl: '',
    liveUrl: '',
    displayOrder: projects.length + 1,
    isFeatured: true,
    isVisible: true
  };

  const [formData, setFormData] = useState(emptyProject);

  const handleOpenAdd = () => {
    setCurrentProject(null);
    setFormData({ ...emptyProject, displayOrder: projects.length + 1 });
    setIsEditing(true);
  };

  const handleOpenEdit = (project) => {
    setCurrentProject(project);
    setFormData({
      ...project,
      tags: Array.isArray(project.tags) ? project.tags.join(', ') : (project.tags || '')
    });
    setIsEditing(true);
  };

  const handleSaveProject = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      ...formData,
      tags: typeof formData.tags === 'string' ? formData.tags.split(',').map((t) => t.trim()).filter(Boolean) : formData.tags
    };

    try {
      if (currentProject) {
        await api.updateProject(currentProject.id, payload);
        if (onToast) onToast('Project updated successfully! ✨');
      } else {
        await api.createProject(payload);
        if (onToast) onToast('New project created! 🚀');
      }
      setIsEditing(false);
      await refetch();
    } catch (err) {
      alert(err.message || 'Failed to save project');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    try {
      await api.deleteProject(id);
      if (onToast) onToast('Project deleted.');
      await refetch();
    } catch (err) {
      alert(err.message || 'Failed to delete project');
    }
  };

  const handleToggle = async (project, field) => {
    try {
      await api.updateProject(project.id, { [field]: !project[field] });
      if (onToast) onToast(`Project ${field} toggled.`);
      await refetch();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-2xl bg-dark-900 border border-slate-800">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <FolderGit2 className="w-5 h-5 text-emerald-400" />
            <span>Project Management</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Create, edit, delete, feature, or hide your featured projects.
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-dark-950 font-bold text-xs shadow-md transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Project</span>
        </button>
      </div>

      {/* Modal / Form Editor */}
      {isEditing && (
        <form onSubmit={handleSaveProject} className="p-6 rounded-2xl bg-dark-900 border-2 border-emerald-500/40 space-y-4 animate-fade-in">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-sm font-bold text-white">
              {currentProject ? 'Edit Project' : 'Create New Project'}
            </h3>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="p-1 rounded-lg hover:bg-dark-800 text-slate-400"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-300 mb-1">Project Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full bg-dark-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:border-emerald-500 focus:outline-none"
                required
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-300 mb-1">Description</label>
              <textarea
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full bg-dark-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:border-emerald-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Badge Text (e.g. Healthcare Tech)</label>
              <input
                type="text"
                value={formData.badge}
                onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                className="w-full bg-dark-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Tech Stack Tags (comma-separated)</label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                placeholder="React, Spring Boot, MySQL"
                className="w-full bg-dark-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">GitHub URL</label>
              <input
                type="text"
                value={formData.githubUrl}
                onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                className="w-full bg-dark-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Live Demo URL (Optional)</label>
              <input
                type="text"
                value={formData.liveUrl}
                onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                className="w-full bg-dark-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-4 pt-2 sm:col-span-2">
              <label className="flex items-center gap-2 text-xs font-semibold text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isFeatured}
                  onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                  className="w-4 h-4 accent-emerald-500 rounded"
                />
                <span>Featured Project</span>
              </label>

              <label className="flex items-center gap-2 text-xs font-semibold text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isVisible}
                  onChange={(e) => setFormData({ ...formData, isVisible: e.target.checked })}
                  className="w-4 h-4 accent-emerald-500 rounded"
                />
                <span>Visible on Public Site</span>
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 rounded-xl bg-dark-800 text-slate-300 text-xs font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-dark-950 font-bold text-xs"
            >
              {loading ? 'Saving...' : 'Save Project'}
            </button>
          </div>
        </form>
      )}

      {/* Projects List */}
      <div className="space-y-4">
        {projects.map((project) => (
          <div
            key={project.id}
            className={`p-5 rounded-2xl bg-dark-900 border ${
              project.isVisible ? 'border-slate-800' : 'border-red-900/40 opacity-60'
            } flex flex-col sm:flex-row sm:items-center justify-between gap-4`}
          >
            <div className="space-y-1 max-w-xl">
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">{project.title}</h3>
                {project.isFeatured && (
                  <span className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold">
                    Featured
                  </span>
                )}
                <span className="px-2 py-0.5 rounded bg-dark-800 text-slate-400 text-[10px] font-mono">
                  {project.badge}
                </span>
              </div>

              <p className="text-xs text-slate-300 line-clamp-2">{project.description}</p>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {(Array.isArray(project.tags) ? project.tags : []).map((t, idx) => (
                  <span key={idx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-dark-950 text-slate-400 border border-slate-800">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => handleToggle(project, 'isFeatured')}
                className={`p-2 rounded-lg border ${
                  project.isFeatured ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' : 'bg-dark-800 text-slate-400 border-slate-700'
                }`}
                title={project.isFeatured ? 'Featured' : 'Not Featured'}
              >
                <Star className="w-4 h-4 fill-current" />
              </button>

              <button
                onClick={() => handleToggle(project, 'isVisible')}
                className={`p-2 rounded-lg border ${
                  project.isVisible ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' : 'bg-red-500/10 text-red-400 border-red-500/30'
                }`}
                title={project.isVisible ? 'Visible' : 'Hidden'}
              >
                {project.isVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              </button>

              <button
                onClick={() => handleOpenEdit(project)}
                className="p-2 rounded-lg bg-dark-800 text-slate-300 hover:text-white border border-slate-700"
                title="Edit Project"
              >
                <Edit2 className="w-4 h-4" />
              </button>

              <button
                onClick={() => handleDelete(project.id)}
                className="p-2 rounded-lg bg-dark-800 text-red-400 hover:bg-red-500/20 border border-slate-700"
                title="Delete Project"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
