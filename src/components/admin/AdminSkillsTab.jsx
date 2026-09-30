// src/components/admin/AdminSkillsTab.jsx
import React, { useState } from 'react';
import { useProfile } from '../../context/ProfileContext';
import { api } from '../../api/client';
import { Cpu, Plus, Edit2, Trash2, Eye, EyeOff, Check, X, ArrowUp, ArrowDown } from 'lucide-react';

export default function AdminSkillsTab({ onToast }) {
  const { skills, refetch } = useProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [currentSkill, setCurrentSkill] = useState(null);
  const [loading, setLoading] = useState(false);

  const emptySkill = {
    name: '',
    category: 'AI & Machine Learning',
    icon: 'Brain',
    displayOrder: skills.length + 1,
    isVisible: true
  };

  const [formData, setFormData] = useState(emptySkill);

  const handleOpenAdd = () => {
    setCurrentSkill(null);
    setFormData({ ...emptySkill, displayOrder: skills.length + 1 });
    setIsEditing(true);
  };

  const handleOpenEdit = (skill) => {
    setCurrentSkill(skill);
    setFormData({ ...skill });
    setIsEditing(true);
  };

  const handleSaveSkill = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (currentSkill) {
        await api.updateSkill(currentSkill.id, formData);
        if (onToast) onToast('Skill updated successfully! ✨');
      } else {
        await api.createSkill(formData);
        if (onToast) onToast('New skill added! 🚀');
      }
      setIsEditing(false);
      await refetch();
    } catch (err) {
      alert(err.message || 'Failed to save skill');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this skill?')) return;
    try {
      await api.deleteSkill(id);
      if (onToast) onToast('Skill deleted.');
      await refetch();
    } catch (err) {
      alert(err.message || 'Failed to delete skill');
    }
  };

  const handleToggleVisibility = async (skill) => {
    try {
      await api.updateSkill(skill.id, { isVisible: !skill.isVisible });
      if (onToast) onToast(`Skill ${!skill.isVisible ? 'published' : 'hidden'}.`);
      await refetch();
    } catch (err) {
      alert(err.message);
    }
  };

  const categories = ['AI & Machine Learning', 'Development', 'Data', 'Cloud & Automation'];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-2xl bg-dark-900 border border-slate-800">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Cpu className="w-5 h-5 text-emerald-400" />
            <span>Skills Management</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Add, edit, delete, reorder, or toggle visibility of your technical skills.
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-dark-950 font-bold text-xs shadow-md transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Skill</span>
        </button>
      </div>

      {/* Modal / Inline Editor */}
      {isEditing && (
        <form onSubmit={handleSaveSkill} className="p-6 rounded-2xl bg-dark-900 border-2 border-emerald-500/40 space-y-4 animate-fade-in">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-sm font-bold text-white">
              {currentSkill ? 'Edit Skill' : 'Add New Skill'}
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
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Skill Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-dark-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:border-emerald-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full bg-dark-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:border-emerald-500 focus:outline-none"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Display Order</label>
              <input
                type="number"
                value={formData.displayOrder}
                onChange={(e) => setFormData({ ...formData, displayOrder: parseInt(e.target.value) || 1 })}
                className="w-full bg-dark-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-2 pt-6">
              <input
                type="checkbox"
                id="isVisible"
                checked={formData.isVisible}
                onChange={(e) => setFormData({ ...formData, isVisible: e.target.checked })}
                className="w-4 h-4 accent-emerald-500 rounded"
              />
              <label htmlFor="isVisible" className="text-xs font-semibold text-slate-300">
                Visible on Public Profile
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
              {loading ? 'Saving...' : 'Save Skill'}
            </button>
          </div>
        </form>
      )}

      {/* Skills Table / List */}
      <div className="space-y-4">
        {categories.map((category) => {
          const catSkills = skills.filter((s) => s.category === category);
          if (catSkills.length === 0) return null;

          return (
            <div key={category} className="p-6 rounded-2xl bg-dark-900 border border-slate-800 space-y-3">
              <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                {category} ({catSkills.length})
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {catSkills.map((skill) => (
                  <div
                    key={skill.id}
                    className={`p-3.5 rounded-xl bg-dark-950 border ${
                      skill.isVisible ? 'border-slate-800' : 'border-red-900/40 opacity-60'
                    } flex items-center justify-between gap-2`}
                  >
                    <div className="min-w-0">
                      <span className="text-sm font-semibold text-white truncate block">{skill.name}</span>
                      <span className="text-[10px] text-slate-400 font-mono">Order: #{skill.displayOrder}</span>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => handleToggleVisibility(skill)}
                        className={`p-1.5 rounded-lg ${
                          skill.isVisible ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'
                        }`}
                        title={skill.isVisible ? 'Visible' : 'Hidden'}
                      >
                        {skill.isVisible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                      </button>

                      <button
                        onClick={() => handleOpenEdit(skill)}
                        className="p-1.5 rounded-lg bg-dark-800 text-slate-300 hover:text-white"
                        title="Edit Skill"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => handleDelete(skill.id)}
                        className="p-1.5 rounded-lg bg-dark-800 text-red-400 hover:bg-red-500/20"
                        title="Delete Skill"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
