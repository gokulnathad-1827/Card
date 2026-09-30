// server/db.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { initialData } from './seed.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.join(__dirname, 'data.json');

// Initialize Supabase client if environment variables are provided
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;
const isSupabaseConfigured = Boolean(supabaseUrl && supabaseKey && !supabaseUrl.includes('YOUR_'));

const supabase = isSupabaseConfigured ? createClient(supabaseUrl, supabaseKey) : null;

// Local JSON File Database helper functions
function loadLocalData() {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      fs.writeFileSync(DATA_FILE, JSON.stringify(initialData, null, 2), 'utf-8');
      return initialData;
    }
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading local data.json, returning initial seed data:', err);
    return initialData;
  }
}

function saveLocalData(data) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing local data.json:', err);
  }
}

/**
 * DATABASE OPERATIONS ADAPTER
 */
export const db = {
  // Check engine mode
  getEngine() {
    return isSupabaseConfigured ? 'supabase' : 'local';
  },

  // GET FULL PROFILE DATA
  async getProfileData() {
    if (isSupabaseConfigured) {
      try {
        const { data: profile } = await supabase.from('profile').select('*').single();
        const { data: skills } = await supabase.from('skills').select('*').order('display_order');
        const { data: projects } = await supabase.from('projects').select('*').order('display_order');
        const { data: leadership } = await supabase.from('leadership').select('*').order('display_order');

        if (profile) {
          return {
            profile: profile,
            skills: skills || [],
            projects: projects || [],
            leadership: leadership || []
          };
        }
      } catch (e) {
        console.warn('Supabase query failed, falling back to local file DB:', e.message);
      }
    }

    // Local DB
    return loadLocalData();
  },

  // UPDATE PROFILE
  async updateProfile(updates) {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from('profile')
          .update({ ...updates, updated_at: new Date().toISOString() })
          .eq('id', updates.id || '1')
          .select()
          .single();
        if (!error && data) return data;
      } catch (e) {
        console.warn('Supabase profile update failed, using local file DB:', e.message);
      }
    }

    const current = loadLocalData();
    current.profile = { ...current.profile, ...updates, updatedAt: new Date().toISOString() };
    saveLocalData(current);
    return current.profile;
  },

  // SKILLS CRUD
  async getSkills() {
    const data = await this.getProfileData();
    return data.skills || [];
  },

  async addSkill(skill) {
    const newSkill = {
      id: skill.id || 's_' + Date.now(),
      name: skill.name || '',
      category: skill.category || 'Development',
      icon: skill.icon || 'Code2',
      displayOrder: skill.displayOrder || 99,
      isVisible: skill.isVisible !== undefined ? skill.isVisible : true,
      createdAt: new Date().toISOString()
    };

    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.from('skills').insert([newSkill]).select().single();
        if (!error && data) return data;
      } catch (e) {
        console.warn('Supabase skill add failed:', e.message);
      }
    }

    const current = loadLocalData();
    current.skills.push(newSkill);
    saveLocalData(current);
    return newSkill;
  },

  async updateSkill(id, updates) {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.from('skills').update(updates).eq('id', id).select().single();
        if (!error && data) return data;
      } catch (e) {
        console.warn('Supabase skill update failed:', e.message);
      }
    }

    const current = loadLocalData();
    const idx = current.skills.findIndex(s => s.id === id);
    if (idx !== -1) {
      current.skills[idx] = { ...current.skills[idx], ...updates };
      saveLocalData(current);
      return current.skills[idx];
    }
    return null;
  },

  async deleteSkill(id) {
    if (isSupabaseConfigured) {
      try {
        await supabase.from('skills').delete().eq('id', id);
      } catch (e) {
        console.warn('Supabase skill delete failed:', e.message);
      }
    }

    const current = loadLocalData();
    current.skills = current.skills.filter(s => s.id !== id);
    saveLocalData(current);
    return true;
  },

  // PROJECTS CRUD
  async getProjects() {
    const data = await this.getProfileData();
    return data.projects || [];
  },

  async addProject(project) {
    const newProject = {
      id: project.id || 'p_' + Date.now(),
      slug: project.slug || project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      title: project.title || '',
      description: project.description || '',
      tags: Array.isArray(project.tags) ? project.tags : (project.tags ? project.tags.split(',').map(t => t.trim()) : []),
      badge: project.badge || 'Project',
      icon: project.icon || 'Sparkles',
      githubUrl: project.githubUrl || '',
      liveUrl: project.liveUrl || '',
      displayOrder: project.displayOrder || 99,
      isFeatured: project.isFeatured !== undefined ? project.isFeatured : true,
      isVisible: project.isVisible !== undefined ? project.isVisible : true,
      createdAt: new Date().toISOString()
    };

    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.from('projects').insert([newProject]).select().single();
        if (!error && data) return data;
      } catch (e) {
        console.warn('Supabase project add failed:', e.message);
      }
    }

    const current = loadLocalData();
    current.projects.push(newProject);
    saveLocalData(current);
    return newProject;
  },

  async updateProject(id, updates) {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.from('projects').update(updates).eq('id', id).select().single();
        if (!error && data) return data;
      } catch (e) {
        console.warn('Supabase project update failed:', e.message);
      }
    }

    const current = loadLocalData();
    const idx = current.projects.findIndex(p => p.id === id);
    if (idx !== -1) {
      if (typeof updates.tags === 'string') {
        updates.tags = updates.tags.split(',').map(t => t.trim());
      }
      current.projects[idx] = { ...current.projects[idx], ...updates };
      saveLocalData(current);
      return current.projects[idx];
    }
    return null;
  },

  async deleteProject(id) {
    if (isSupabaseConfigured) {
      try {
        await supabase.from('projects').delete().eq('id', id);
      } catch (e) {
        console.warn('Supabase project delete failed:', e.message);
      }
    }

    const current = loadLocalData();
    current.projects = current.projects.filter(p => p.id !== id);
    saveLocalData(current);
    return true;
  },

  // LEADERSHIP CRUD
  async getLeadership() {
    const data = await this.getProfileData();
    return data.leadership || [];
  },

  async addLeadership(item) {
    const newItem = {
      id: item.id || 'l_' + Date.now(),
      organization: item.organization || '',
      positionTitle: item.positionTitle || '',
      year: item.year || '2026',
      description: item.description || '',
      displayOrder: item.displayOrder || 99,
      isVisible: item.isVisible !== undefined ? item.isVisible : true,
      createdAt: new Date().toISOString()
    };

    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.from('leadership').insert([newItem]).select().single();
        if (!error && data) return data;
      } catch (e) {
        console.warn('Supabase leadership add failed:', e.message);
      }
    }

    const current = loadLocalData();
    if (!current.leadership) current.leadership = [];
    current.leadership.push(newItem);
    saveLocalData(current);
    return newItem;
  },

  async updateLeadership(id, updates) {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.from('leadership').update(updates).eq('id', id).select().single();
        if (!error && data) return data;
      } catch (e) {
        console.warn('Supabase leadership update failed:', e.message);
      }
    }

    const current = loadLocalData();
    if (!current.leadership) current.leadership = [];
    const idx = current.leadership.findIndex(l => l.id === id);
    if (idx !== -1) {
      current.leadership[idx] = { ...current.leadership[idx], ...updates };
      saveLocalData(current);
      return current.leadership[idx];
    }
    return null;
  },

  async deleteLeadership(id) {
    if (isSupabaseConfigured) {
      try {
        await supabase.from('leadership').delete().eq('id', id);
      } catch (e) {
        console.warn('Supabase leadership delete failed:', e.message);
      }
    }

    const current = loadLocalData();
    if (current.leadership) {
      current.leadership = current.leadership.filter(l => l.id !== id);
      saveLocalData(current);
    }
    return true;
  },

  // ADMIN AUTH
  async getAdmin() {
    const current = loadLocalData();
    return current.admin || initialData.admin;
  },

  async updateAdminPassword(passwordHash) {
    const current = loadLocalData();
    current.admin = { ...current.admin, passwordHash };
    saveLocalData(current);
    return true;
  }
};
