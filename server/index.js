// server/index.js
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { db } from './db.js';
import { generateToken, authenticateAdmin, verifyPassword, hashPassword } from './auth.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
const allowedOrigins = process.env.FRONTEND_URL
  ? process.env.FRONTEND_URL.split(',').map(o => o.trim())
  : ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175', 'http://localhost:5176', 'http://localhost:3000'];

app.use(cors({
  origin: (origin, callback) => {
    // Allow non-browser calls or matching frontend origins
    if (!origin || allowedOrigins.includes('*') || allowedOrigins.some(o => origin.startsWith(o))) {
      callback(null, true);
    } else {
      callback(null, true);
    }
  },
  credentials: true
}));
app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
  if (process.env.NODE_ENV !== 'production') {
    console.log(`[API] ${req.method} ${req.url}`);
  }
  next();
});

// ==========================================
// PUBLIC API ENDPOINTS
// ==========================================

// GET /api/profile - Fetch all public profile data
app.get('/api/profile', async (req, res) => {
  try {
    const data = await db.getProfileData();
    res.json({
      success: true,
      profile: data.profile,
      stats: data.stats || [],
      skills: data.skills || [],
      projects: data.projects || [],
      leadership: data.leadership || [],
      engine: db.getEngine()
    });
  } catch (err) {
    console.error('Error fetching profile:', err);
    res.status(500).json({ success: false, error: 'Failed to load profile data' });
  }
});

// GET /api/skills - Fetch skills
app.get('/api/skills', async (req, res) => {
  try {
    const skills = await db.getSkills();
    res.json({ success: true, skills });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to fetch skills' });
  }
});

// GET /api/projects - Fetch projects
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await db.getProjects();
    res.json({ success: true, projects });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to fetch projects' });
  }
});

// GET /api/leadership - Fetch leadership entries
app.get('/api/leadership', async (req, res) => {
  try {
    const leadership = await db.getLeadership();
    res.json({ success: true, leadership });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to fetch leadership entries' });
  }
});

// ==========================================
// AUTHENTICATION ENDPOINTS
// ==========================================

// POST /api/auth/login
app.post('/api/auth/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ success: false, error: 'Username and password required' });
  }

  const admin = await db.getAdmin();
  if (username !== admin.username) {
    return res.status(401).json({ success: false, error: 'Invalid credentials' });
  }

  const valid = await verifyPassword(password, admin.passwordHash);
  if (!valid) {
    return res.status(401).json({ success: false, error: 'Invalid credentials' });
  }

  const token = generateToken({ username });
  res.json({
    success: true,
    token,
    user: { username }
  });
});

// GET /api/auth/me - Verify token
app.get('/api/auth/me', authenticateAdmin, (req, res) => {
  res.json({ success: true, user: req.admin });
});

// PUT /api/auth/password - Change password
app.put('/api/auth/password', authenticateAdmin, async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  if (!newPassword || newPassword.length < 4) {
    return res.status(400).json({ success: false, error: 'New password must be at least 4 characters' });
  }

  const admin = await db.getAdmin();
  const valid = await verifyPassword(currentPassword, admin.passwordHash);
  if (!valid) {
    return res.status(400).json({ success: false, error: 'Current password incorrect' });
  }

  const newHash = await hashPassword(newPassword);
  await db.updateAdminPassword(newHash);
  res.json({ success: true, message: 'Password updated successfully' });
});

// ==========================================
// PROTECTED ADMIN CRUD ENDPOINTS
// ==========================================

// PUT /api/profile - Update Profile
app.put('/api/profile', authenticateAdmin, async (req, res) => {
  try {
    const updated = await db.updateProfile(req.body);
    res.json({ success: true, profile: updated });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to update profile' });
  }
});

// POST /api/skills - Create Skill
app.post('/api/skills', authenticateAdmin, async (req, res) => {
  try {
    const skill = await db.addSkill(req.body);
    res.json({ success: true, skill });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to create skill' });
  }
});

// PUT /api/skills/:id - Update Skill
app.put('/api/skills/:id', authenticateAdmin, async (req, res) => {
  try {
    const skill = await db.updateSkill(req.params.id, req.body);
    if (!skill) return res.status(404).json({ success: false, error: 'Skill not found' });
    res.json({ success: true, skill });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to update skill' });
  }
});

// DELETE /api/skills/:id - Delete Skill
app.delete('/api/skills/:id', authenticateAdmin, async (req, res) => {
  try {
    await db.deleteSkill(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to delete skill' });
  }
});

// POST /api/projects - Create Project
app.post('/api/projects', authenticateAdmin, async (req, res) => {
  try {
    const project = await db.addProject(req.body);
    res.json({ success: true, project });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to create project' });
  }
});

// PUT /api/projects/:id - Update Project
app.put('/api/projects/:id', authenticateAdmin, async (req, res) => {
  try {
    const project = await db.updateProject(req.params.id, req.body);
    if (!project) return res.status(404).json({ success: false, error: 'Project not found' });
    res.json({ success: true, project });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to update project' });
  }
});

// DELETE /api/projects/:id - Delete Project
app.delete('/api/projects/:id', authenticateAdmin, async (req, res) => {
  try {
    await db.deleteProject(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to delete project' });
  }
});

// POST /api/leadership - Create Leadership
app.post('/api/leadership', authenticateAdmin, async (req, res) => {
  try {
    const leadership = await db.addLeadership(req.body);
    res.json({ success: true, leadership });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to create leadership entry' });
  }
});

// PUT /api/leadership/:id - Update Leadership
app.put('/api/leadership/:id', authenticateAdmin, async (req, res) => {
  try {
    const leadership = await db.updateLeadership(req.params.id, req.body);
    if (!leadership) return res.status(404).json({ success: false, error: 'Leadership entry not found' });
    res.json({ success: true, leadership });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to update leadership entry' });
  }
});

// DELETE /api/leadership/:id - Delete Leadership
app.delete('/api/leadership/:id', authenticateAdmin, async (req, res) => {
  try {
    await db.deleteLeadership(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to delete leadership entry' });
  }
});

// ==========================================
// PRODUCTION STATIC FILE SERVING
// ==========================================
const distPath = path.join(__dirname, '..', 'dist');
app.use(express.static(distPath));

// Fallback to index.html for SPA routes
app.use((req, res, next) => {
  if (req.method === 'GET' && req.accepts('html') && !req.path.startsWith('/api')) {
    const indexHtml = path.join(distPath, 'index.html');
    return res.sendFile(indexHtml, (err) => {
      if (err) {
        res.status(404).json({ error: 'Page not found' });
      }
    });
  }
  next();
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT} (Database: ${db.getEngine()})`);
});
