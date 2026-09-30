// src/components/admin/AdminProfileTab.jsx
import React, { useState } from 'react';
import { useProfile } from '../../context/ProfileContext';
import { api } from '../../api/client';
import { Save, Check, RefreshCw, AlertCircle, Link, User, GraduationCap, MapPin, Mail, Phone, FileText, Image } from 'lucide-react';

export default function AdminProfileTab({ onToast }) {
  const { profile, setProfile, refetch } = useProfile();
  const [formData, setFormData] = useState({ ...profile });
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSavedSuccess(false);

    try {
      const res = await api.updateProfile(formData);
      if (res && res.success) {
        setProfile(res.profile);
        setSavedSuccess(true);
        if (onToast) onToast('Profile updated successfully! ✨');
        setTimeout(() => setSavedSuccess(false), 3000);
      } else {
        setError(res?.error || 'Failed to update profile');
      }
    } catch (err) {
      setError(err.message || 'Error updating profile');
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    setFormData({ ...profile });
    if (onToast) onToast('Changes reverted to current profile state.');
  };

  return (
    <form onSubmit={handleSave} className="space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-2xl bg-dark-900 border border-slate-800">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <User className="w-5 h-5 text-emerald-400" />
            <span>Profile & Personal Information</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Update your public name, headlines, college details, contact links, resume, and profile photo.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleReset}
            className="px-4 py-2 rounded-xl bg-dark-800 hover:bg-dark-700 text-slate-300 font-semibold text-xs transition-colors"
          >
            Reset
          </button>
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-dark-950 font-bold text-xs shadow-md transition-all disabled:opacity-50"
          >
            {saving ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
            <span>{saving ? 'Saving...' : 'Save Profile'}</span>
          </button>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
          <Check className="w-4 h-4" />
          <span>Profile changes saved and published live!</span>
        </div>
      )}

      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4" />
          <span>{error}</span>
        </div>
      )}

      {/* Identity Section */}
      <div className="p-6 rounded-2xl bg-dark-900 border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
          <User className="w-4 h-4" />
          <span>1. Core Identity & Headlines</span>
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name || ''}
              onChange={handleChange}
              className="w-full bg-dark-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:border-emerald-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Short Role / Subtitle</label>
            <input
              type="text"
              name="shortRole"
              value={formData.shortRole || ''}
              onChange={handleChange}
              className="w-full bg-dark-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:border-emerald-500 focus:outline-none"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Full Headline</label>
            <input
              type="text"
              name="headline"
              value={formData.headline || ''}
              onChange={handleChange}
              className="w-full bg-dark-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:border-emerald-500 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Academics & Location */}
      <div className="p-6 rounded-2xl bg-dark-900 border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
          <GraduationCap className="w-4 h-4" />
          <span>2. Academics & Location</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Degree</label>
            <input
              type="text"
              name="degree"
              value={formData.degree || ''}
              onChange={handleChange}
              className="w-full bg-dark-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:border-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Academic Year</label>
            <input
              type="text"
              name="year"
              value={formData.year || ''}
              onChange={handleChange}
              className="w-full bg-dark-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:border-emerald-500 focus:outline-none"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">College / Institution</label>
            <input
              type="text"
              name="college"
              value={formData.college || ''}
              onChange={handleChange}
              className="w-full bg-dark-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:border-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Visible Campus Location</label>
            <input
              type="text"
              name="visibleLocation"
              value={formData.visibleLocation || ''}
              onChange={handleChange}
              className="w-full bg-dark-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:border-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Native Place</label>
            <input
              type="text"
              name="native"
              value={formData.native || ''}
              onChange={handleChange}
              className="w-full bg-dark-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:border-emerald-500 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Social & Contact Links */}
      <div className="p-6 rounded-2xl bg-dark-900 border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
          <Link className="w-4 h-4" />
          <span>3. Dynamic Social & Contact Links</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Phone Number</label>
            <input
              type="text"
              name="phone"
              value={formData.phone || ''}
              onChange={handleChange}
              className="w-full bg-dark-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:border-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Phone Formatted (e.g. +91 7639499348)</label>
            <input
              type="text"
              name="phoneFormatted"
              value={formData.phoneFormatted || ''}
              onChange={handleChange}
              className="w-full bg-dark-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:border-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email || ''}
              onChange={handleChange}
              className="w-full bg-dark-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:border-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">LinkedIn Profile URL</label>
            <input
              type="url"
              name="linkedin"
              value={formData.linkedin || ''}
              onChange={handleChange}
              className="w-full bg-dark-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:border-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">GitHub Profile URL</label>
            <input
              type="url"
              name="github"
              value={formData.github || ''}
              onChange={handleChange}
              className="w-full bg-dark-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:border-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Personal Portfolio URL</label>
            <input
              type="url"
              name="portfolio"
              value={formData.portfolio || ''}
              onChange={handleChange}
              className="w-full bg-dark-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:border-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Instagram URL</label>
            <input
              type="url"
              name="instagram"
              value={formData.instagram || ''}
              onChange={handleChange}
              className="w-full bg-dark-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:border-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">LeetCode URL</label>
            <input
              type="url"
              name="leetcode"
              value={formData.leetcode || ''}
              onChange={handleChange}
              className="w-full bg-dark-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:border-emerald-500 focus:outline-none"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">WhatsApp Greeting Message</label>
            <input
              type="text"
              name="whatsappMessage"
              value={formData.whatsappMessage || ''}
              onChange={handleChange}
              className="w-full bg-dark-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:border-emerald-500 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Media & Resume */}
      <div className="p-6 rounded-2xl bg-dark-900 border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
          <FileText className="w-4 h-4" />
          <span>4. Dynamic Resume & Media URLs</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Resume URL (Google Drive / Cloud)</label>
            <input
              type="text"
              name="resumeUrl"
              value={formData.resumeUrl || ''}
              onChange={handleChange}
              className="w-full bg-dark-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:border-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Profile Photo Path / Image URL</label>
            <input
              type="text"
              name="photoPath"
              value={formData.photoPath || ''}
              onChange={handleChange}
              className="w-full bg-dark-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:border-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Tagline</label>
            <input
              type="text"
              name="tagline"
              value={formData.tagline || ''}
              onChange={handleChange}
              className="w-full bg-dark-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:border-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Personal Signature / Mantra</label>
            <input
              type="text"
              name="personalSignature"
              value={formData.personalSignature || ''}
              onChange={handleChange}
              className="w-full bg-dark-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:border-emerald-500 focus:outline-none"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">About Me Narrative</label>
            <textarea
              name="aboutMe"
              rows={4}
              value={formData.aboutMe || ''}
              onChange={handleChange}
              className="w-full bg-dark-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:border-emerald-500 focus:outline-none"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Networking Philosophy</label>
            <textarea
              name="networkingPhilosophy"
              rows={2}
              value={formData.networkingPhilosophy || ''}
              onChange={handleChange}
              className="w-full bg-dark-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:border-emerald-500 focus:outline-none"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-2">
        <button
          type="submit"
          disabled={saving}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-dark-950 font-bold text-sm shadow-lg transition-all disabled:opacity-50"
        >
          {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          <span>{saving ? 'Saving...' : 'Save Profile Changes'}</span>
        </button>
      </div>
    </form>
  );
}
