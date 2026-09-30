// src/api/client.js
import { profileData as fallbackProfile } from '../data/profile';

const API_BASE = '/api';

/**
 * Helper to handle fetch responses & auth headers
 */
async function fetchAPI(endpoint, options = {}) {
  const token = localStorage.getItem('admin_token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {})
  };

  try {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || `HTTP error! status: ${res.status}`);
    }
    return data;
  } catch (err) {
    console.warn(`API call failed [${endpoint}]:`, err.message);
    throw err;
  }
}

export const api = {
  // Public Profile fetch
  async getProfileData() {
    try {
      const res = await fetchAPI('/profile');
      if (res && res.success) {
        return {
          profile: res.profile || fallbackProfile,
          stats: res.stats || fallbackProfile.stats,
          skills: res.skills || [],
          projects: res.projects || fallbackProfile.projects,
          leadership: res.leadership || [],
          engine: res.engine || 'fallback',
          isOffline: false
        };
      }
    } catch (e) {
      console.warn('Backend unavailable, using fallback client state');
    }

    // Return fallback static profile structure if API is down
    return {
      profile: fallbackProfile,
      stats: fallbackProfile.stats,
      skills: [
        { id: "s1", name: "Artificial Intelligence", category: "AI & Machine Learning", icon: "Brain", displayOrder: 1, isVisible: true },
        { id: "s2", name: "Machine Learning", category: "AI & Machine Learning", icon: "Brain", displayOrder: 2, isVisible: true },
        { id: "s3", name: "Python", category: "AI & Machine Learning", icon: "Brain", displayOrder: 3, isVisible: true },
        { id: "s4", name: "LangChain", category: "AI & Machine Learning", icon: "Brain", displayOrder: 4, isVisible: true },
        { id: "s5", name: "RAG", category: "AI & Machine Learning", icon: "Brain", displayOrder: 5, isVisible: true },
        { id: "s6", name: "Java", category: "Development", icon: "Laptop", displayOrder: 1, isVisible: true },
        { id: "s7", name: "React.js", category: "Development", icon: "Laptop", displayOrder: 2, isVisible: true },
        { id: "s8", name: "Full-Stack Development", category: "Development", icon: "Laptop", displayOrder: 3, isVisible: true },
        { id: "s9", name: "SQL", category: "Data", icon: "Database", displayOrder: 1, isVisible: true },
        { id: "s10", name: "Databases", category: "Data", icon: "Database", displayOrder: 2, isVisible: true },
        { id: "s11", name: "Cloud", category: "Cloud & Automation", icon: "CloudCog", displayOrder: 1, isVisible: true },
        { id: "s12", name: "DevOps", category: "Cloud & Automation", icon: "CloudCog", displayOrder: 2, isVisible: true },
        { id: "s13", name: "n8n", category: "Cloud & Automation", icon: "CloudCog", displayOrder: 3, isVisible: true }
      ],
      projects: fallbackProfile.projects,
      leadership: [
        {
          id: "l1",
          organization: "IEEE KCE Student Branch CIS 2K26",
          positionTitle: "Officer – Treasurer",
          year: "2026",
          description: "Contributing to IEEE student activities through event coordination, financial responsibilities, technical initiatives, teamwork, and community engagement.",
          displayOrder: 1,
          isVisible: true
        }
      ],
      engine: 'fallback',
      isOffline: true
    };
  },

  // Auth API
  async login(username, password) {
    return await fetchAPI('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password })
    });
  },

  async verifyAuth() {
    return await fetchAPI('/auth/me');
  },

  async updatePassword(currentPassword, newPassword) {
    return await fetchAPI('/auth/password', {
      method: 'PUT',
      body: JSON.stringify({ currentPassword, newPassword })
    });
  },

  // Admin Profile Update
  async updateProfile(profileUpdates) {
    return await fetchAPI('/profile', {
      method: 'PUT',
      body: JSON.stringify(profileUpdates)
    });
  },

  // Skills CRUD
  async createSkill(skillData) {
    return await fetchAPI('/skills', {
      method: 'POST',
      body: JSON.stringify(skillData)
    });
  },

  async updateSkill(id, skillUpdates) {
    return await fetchAPI(`/skills/${id}`, {
      method: 'PUT',
      body: JSON.stringify(skillUpdates)
    });
  },

  async deleteSkill(id) {
    return await fetchAPI(`/skills/${id}`, {
      method: 'DELETE'
    });
  },

  // Projects CRUD
  async createProject(projectData) {
    return await fetchAPI('/projects', {
      method: 'POST',
      body: JSON.stringify(projectData)
    });
  },

  async updateProject(id, projectUpdates) {
    return await fetchAPI(`/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(projectUpdates)
    });
  },

  async deleteProject(id) {
    return await fetchAPI(`/projects/${id}`, {
      method: 'DELETE'
    });
  },

  // Leadership CRUD
  async createLeadership(leadershipData) {
    return await fetchAPI('/leadership', {
      method: 'POST',
      body: JSON.stringify(leadershipData)
    });
  },

  async updateLeadership(id, leadershipUpdates) {
    return await fetchAPI(`/leadership/${id}`, {
      method: 'PUT',
      body: JSON.stringify(leadershipUpdates)
    });
  },

  async deleteLeadership(id) {
    return await fetchAPI(`/leadership/${id}`, {
      method: 'DELETE'
    });
  }
};
