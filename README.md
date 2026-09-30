# Gokulnath D — Dynamic Full-Stack Digital Networking Profile

A high-performance, data-driven **Full-Stack Digital Visiting Card, Professional Profile, and Networking Application** designed specifically for real-world networking at **IEEE events, conferences, hackathons, and technical meetups**.

---

## ⚡ Full-Stack Architecture

```text
┌─────────────────────────────────────────────────────────┐
│                    React + Vite Frontend                │
│                        (Vercel)                         │
└────────────────────────────┬────────────────────────────┘
                             │
                             ▼ REST API / JWT Auth
┌─────────────────────────────────────────────────────────┐
│                   Node.js + Express API                 │
│                        (Render)                         │
└────────────────────────────┬────────────────────────────┘
                             │
                             ▼ Dual Engine Adapter
┌────────────────────────────┴────────────────────────────┐
│                  Supabase PostgreSQL                    │
│             (Fallback: Local JSON Database)             │
└─────────────────────────────────────────────────────────┘
```

- **Frontend**: React 19, Vite 8, Tailwind CSS, Lucide Icons, React Router, Canvas Confetti.
- **Backend API**: Node.js, Express.js REST API with CORS, Rate Logging, and Error Handling.
- **Authentication**: JWT token-based sessions with hashed admin credentials (`bcryptjs`).
- **Database**: Supabase PostgreSQL with local JSON engine adapter fallback for local offline development.
- **Public Routes**: `/` (Public Networking Profile)
- **Admin Routes**: `/admin` (Protected Admin Management Dashboard)

---

## 📁 Project Structure

```
Gokulnath-Digital-Networking-Card/
├── server/
│   ├── index.js                 # Express REST API routes & server setup
│   ├── db.js                    # Dual-mode DB adapter (Supabase PostgreSQL + JSON fallback)
│   ├── auth.js                  # JWT session management & bcrypt password hashing
│   ├── seed.js                  # Initial seed data for profile, skills, projects, leadership
│   └── schema.sql               # Production SQL schema & seed script for Supabase
│
├── src/
│   ├── api/
│   │   └── client.js            # API client service with dynamic VITE_API_URL support
│   ├── context/
│   │   └── ProfileContext.jsx   # Global dynamic profile state context
│   ├── components/
│   │   ├── PublicProfile.jsx    # Public profile page layout (/)
│   │   ├── Navbar.jsx           # Clean header with full-screen mobile menu overlay
│   │   ├── Hero.jsx             # Dynamic Hero profile section
│   │   ├── About.jsx            # Dynamic About narrative & resume link
│   │   ├── Skills.jsx           # Dynamic Skills stack section
│   │   ├── Projects.jsx         # Dynamic Featured Projects
│   │   ├── IEEESection.jsx      # Dynamic IEEE Leadership & philosophy
│   │   ├── ContactSection.jsx   # Dynamic direct contact channels
│   │   └── admin/               # Protected Admin Dashboard components
│   │       ├── AdminDashboard.jsx
│   │       ├── AdminLogin.jsx
│   │       ├── AdminProfileTab.jsx
│   │       ├── AdminSkillsTab.jsx
│   │       ├── AdminProjectsTab.jsx
│   │       ├── AdminLeadershipTab.jsx
│   │       └── AdminSettingsTab.jsx
│   │
│   ├── utils/
│   │   ├── contact.js           # Dynamic vCard (.vcf) generator & contact helpers
│   │   ├── sharing.js           # Dynamic Web Share API & clipboard copy helper
│   │   └── qr.js                # Dynamic QR code generator
│   │
│   └── data/
│       └── profile.js           # Static fallback profile config
│
├── .env.example                 # Production & Development environment variable template
├── package.json                 # Full-stack scripts & dependencies
├── vercel.json                  # Vercel SPA routing configuration
└── vite.config.js               # Vite bundler & API proxy settings
```

---

## 🛠️ Local Development & Server

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Configure environment variables**:
   Create a local `.env` file from `.env.example`:
   ```env
   PORT=5000
   JWT_SECRET=your_local_secret_key
   ```

3. **Start local full-stack development server**:
   ```bash
   npm run dev
   ```
   This runs both the Express API (`http://localhost:5000`) and Vite dev server (`http://localhost:5173` or `5174`) concurrently.

4. **Access the application**:
   - **Public Profile**: `http://localhost:5174/`
   - **Admin Dashboard**: `http://localhost:5174/admin`

---

## 🔒 Production Deployment Instructions

### Step 1: Database Setup (Supabase PostgreSQL)
1. Log in to [Supabase](https://supabase.com/) and create a new project.
2. Navigate to **SQL Editor**.
3. Copy the contents of [`server/schema.sql`](file:///c:/Users/Gokulnath/Downloads/Gokulnath-Digital-Networking-Card/server/schema.sql), paste into the editor, and click **Run**.
4. Retrieve your `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` from **Project Settings → API**.

---

### Step 2: Backend API Deployment (Render)
1. Sign in to [Render](https://render.com/) and click **New → Web Service**.
2. Connect your GitHub repository: `https://github.com/gokulnathad-1827/Card.git`.
3. Configure settings:
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
4. Add **Environment Variables** in Render Dashboard:
   ```env
   PORT=5000
   JWT_SECRET=your_production_jwt_secret
   FRONTEND_URL=https://your-app.vercel.app
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_role_key
   ```
5. Deploy and copy your backend URL (e.g. `https://gokulnath-card-api.onrender.com`).

---

### Step 3: Frontend Deployment (Vercel)
1. Sign in to [Vercel](https://vercel.com/) and click **Add New Project**.
2. Select your repository `https://github.com/gokulnathad-1827/Card.git`.
3. Set **Framework Preset**: Vite.
4. Add Environment Variable in Vercel Dashboard:
   ```env
   VITE_API_URL=https://gokulnath-card-api.onrender.com/api
   ```
5. Click **Deploy**.

---

## 🔐 Admin Authentication Setup

1. Open your deployed URL at `/admin` (e.g., `https://your-app.vercel.app/admin`).
2. Log in with the initial default credentials:
   - **Username**: `admin`
   - **Password**: `admin123`
3. Navigate to **Settings** in the Admin Dashboard and change the password immediately.

---

## 🔑 Environment Variable Reference

| Variable Name | Required In | Description |
| :--- | :--- | :--- |
| `PORT` | Backend (Render) | Server listening port (default: 5000) |
| `JWT_SECRET` | Backend (Render) | Secret key for signing admin JWT sessions |
| `FRONTEND_URL` | Backend (Render) | Allowed origins for CORS (e.g. `https://your-app.vercel.app`) |
| `SUPABASE_URL` | Backend (Render) | Supabase PostgreSQL project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Backend (Render) | Supabase service role API key *(Backend only)* |
| `VITE_API_URL` | Frontend (Vercel) | Backend API endpoint URL (e.g. `https://api.domain.com/api`) |
