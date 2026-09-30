// src/components/admin/AdminLeadershipTab.jsx
import React, { useState } from 'react';
import { useProfile } from '../../context/ProfileContext';
import { api } from '../../api/client';
import { Award, Plus, Edit2, Trash2, Eye, EyeOff, X } from 'lucide-react';

export default function AdminLeadershipTab({ onToast }) {
  const { leadership, refetch } = useProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [loading, setLoading] = useState(false);

  const emptyItem = {
    organization: 'IEEE KCE Student Branch CIS 2K26',
    positionTitle: 'Officer – Treasurer',
    year: '2026',
    description: 'Contributing to IEEE student activities through event coordination, financial responsibilities, technical initiatives, teamwork, and community engagement.',
    displayOrder: leadership.length + 1,
    isVisible: true
  };

  const [formData, setFormData] = useState(emptyItem);

  const handleOpenAdd = () => {
    setCurrentItem(null);
    setFormData({ ...emptyItem, displayOrder: leadership.length + 1 });
    setIsEditing(true);
  };

  const handleOpenEdit = (item) => {
    setCurrentItem(item);
    setFormData({ ...item });
    setIsEditing(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (currentItem) {
        await api.updateLeadership(currentItem.id, formData);
        if (onToast) onToast('Leadership entry updated! ✨');
      } else {
        await api.createLeadership(formData);
        if (onToast) onToast('New leadership entry added! 🚀');
      }
      setIsEditing(false);
      await refetch();
    } catch (err) {
      alert(err.message || 'Failed to save leadership entry');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this leadership entry?')) return;
    try {
      await api.deleteLeadership(id);
      if (onToast) onToast('Leadership entry deleted.');
      await refetch();
    } catch (err) {
      alert(err.message || 'Failed to delete entry');
    }
  };

  const handleToggle = async (item) => {
    try {
      await api.updateLeadership(item.id, { isVisible: !item.isVisible });
      if (onToast) onToast(`Leadership entry ${!item.isVisible ? 'published' : 'hidden'}.`);
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
            <Award className="w-5 h-5 text-emerald-400" />
            <span>Leadership & IEEE Management</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Manage your leadership roles, organization positions, and responsibilities.
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-dark-950 font-bold text-xs shadow-md transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add Leadership Role</span>
        </button>
      </div>

      {/* Editor Modal */}
      {isEditing && (
        <form onSubmit={handleSave} className="p-6 rounded-2xl bg-dark-900 border-2 border-emerald-500/40 space-y-4 animate-fade-in">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-sm font-bold text-white">
              {currentItem ? 'Edit Leadership Role' : 'Add Leadership Role'}
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
              <label className="block text-xs font-semibold text-slate-300 mb-1">Organization Name</label>
              <input
                type="text"
                value={formData.organization}
                onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                className="w-full bg-dark-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:border-emerald-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Position / Role Title</label>
              <input
                type="text"
                value={formData.positionTitle}
                onChange={(e) => setFormData({ ...formData, positionTitle: e.target.value })}
                className="w-full bg-dark-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:border-emerald-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Year / Tenure</label>
              <input
                type="text"
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                className="w-full bg-dark-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-2 pt-6">
              <input
                type="checkbox"
                id="leadVisible"
                checked={formData.isVisible}
                onChange={(e) => setFormData({ ...formData, isVisible: e.target.checked })}
                className="w-4 h-4 accent-emerald-500 rounded"
              />
              <label htmlFor="leadVisible" className="text-xs font-semibold text-slate-300">
                Visible on Public Profile
              </label>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-300 mb-1">Role Description & Achievements</label>
              <textarea
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full bg-dark-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:border-emerald-500 focus:outline-none"
              />
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
              {loading ? 'Saving...' : 'Save Role'}
            </button>
          </div>
        </form>
      )}

      {/* Leadership List */}
      <div className="space-y-4">
        {leadership.map((item) => (
          <div
            key={item.id}
            className={`p-5 rounded-2xl bg-dark-900 border ${
              item.isVisible ? 'border-slate-800' : 'border-red-900/40 opacity-60'
            } flex flex-col sm:flex-row sm:items-center justify-between gap-4`}
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-xs font-bold uppercase">
                  {item.positionTitle}
                </span>
                <span className="text-xs font-mono text-slate-400">({item.year})</span>
              </div>
              <h3 className="text-base font-bold text-white pt-1">{item.organization}</h3>
              <p className="text-xs text-slate-300 italic">"{item.description}"</p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => handleToggle(item)}
                className={`p-2 rounded-lg border ${
                  item.isVisible ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' : 'bg-red-500/10 text-red-400 border-red-500/30'
                }`}
                title={item.isVisible ? 'Visible' : 'Hidden'}
              >
                {item.isVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              </button>

              <button
                onClick={() => handleOpenEdit(item)}
                className="p-2 rounded-lg bg-dark-800 text-slate-300 hover:text-white border border-slate-700"
                title="Edit Role"
              >
                <Edit2 className="w-4 h-4" />
              </button>

              <button
                onClick={() => handleDelete(item.id)}
                className="p-2 rounded-lg bg-dark-800 text-red-400 hover:bg-red-500/20 border border-slate-700"
                title="Delete Role"
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
