-- ========================================================
-- Supabase PostgreSQL Schema for Gokulnath D Networking Card
-- ========================================================

-- 1. PROFILE TABLE
CREATE TABLE IF NOT EXISTS public.profile (
    id TEXT PRIMARY KEY DEFAULT '1',
    name TEXT NOT NULL DEFAULT 'GOKULNATH D',
    headline TEXT NOT NULL,
    short_role TEXT NOT NULL,
    degree TEXT NOT NULL,
    year TEXT NOT NULL,
    college TEXT NOT NULL,
    college_location_full TEXT,
    visible_location TEXT,
    native TEXT,
    phone TEXT,
    phone_formatted TEXT,
    email TEXT,
    linkedin TEXT,
    github TEXT,
    portfolio TEXT,
    instagram TEXT,
    leetcode TEXT,
    whatsapp_message TEXT,
    photo_path TEXT,
    photo_alt TEXT,
    resume_url TEXT,
    about_me TEXT,
    networking_philosophy TEXT,
    tagline TEXT,
    personal_signature TEXT,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. SKILLS TABLE
CREATE TABLE IF NOT EXISTS public.skills (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    icon TEXT DEFAULT 'Brain',
    display_order INT DEFAULT 1,
    is_visible BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. PROJECTS TABLE
CREATE TABLE IF NOT EXISTS public.projects (
    id TEXT PRIMARY KEY,
    slug TEXT UNIQUE,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    tags JSONB DEFAULT '[]'::jsonb,
    badge TEXT DEFAULT 'Project',
    icon TEXT DEFAULT 'Sparkles',
    github_url TEXT,
    live_url TEXT,
    display_order INT DEFAULT 1,
    is_featured BOOLEAN DEFAULT TRUE,
    is_visible BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. LEADERSHIP TABLE
CREATE TABLE IF NOT EXISTS public.leadership (
    id TEXT PRIMARY KEY,
    organization TEXT NOT NULL,
    position_title TEXT NOT NULL,
    year TEXT NOT NULL,
    description TEXT,
    display_order INT DEFAULT 1,
    is_visible BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. INITIAL SEED DATA
INSERT INTO public.profile (
    id, name, headline, short_role, degree, year, college, visible_location, native,
    phone, phone_formatted, email, linkedin, github, portfolio, instagram, leetcode,
    whatsapp_message, photo_path, resume_url, tagline, personal_signature, about_me, networking_philosophy
) VALUES (
    '1',
    'GOKULNATH D',
    'AI & Data Science Student | AI/ML Enthusiast | Full-Stack Developer',
    'AI & Data Science Student',
    'B.Tech – Artificial Intelligence & Data Science',
    '3rd Year',
    'Karpagam College of Engineering',
    'Coimbatore, Tamil Nadu, India',
    'Thalaivasal, Salem, Tamil Nadu',
    '7639499348',
    '+91 7639499348',
    'gokulnath.ad.1827@gmail.com',
    'https://www.linkedin.com/in/gokulnathad1827/',
    'https://github.com/gokulnathad-1827/',
    'https://gokulnathad.vercel.app/',
    'https://www.instagram.com/nath__g__1827',
    'https://leetcode.com/u/Gokulnath1813/',
    'Hi Gokulnath! We met at Aishwarya 2K26. Great connecting with you!',
    '/profile.jpg',
    'https://drive.google.com/file/d/1BIJLPu0KMZcQcoaJEBM9fVk1u7V0lnQE/view?usp=sharing',
    'Connect. Learn. Build. Grow.',
    'I CAN DO IT.',
    'I''m Gokulnath, a 3rd-year B.Tech Artificial Intelligence & Data Science student at Karpagam College of Engineering. I''m passionate about Artificial Intelligence, Machine Learning, Full-Stack Development, and building practical solutions to real-world problems.',
    'Every connection brings a new perspective, an opportunity to learn, and a chance to build something meaningful.'
) ON CONFLICT (id) DO NOTHING;

-- Initial Skills
INSERT INTO public.skills (id, name, category, icon, display_order, is_visible) VALUES
('s1', 'Artificial Intelligence', 'AI & Machine Learning', 'Brain', 1, true),
('s2', 'Machine Learning', 'AI & Machine Learning', 'Brain', 2, true),
('s3', 'Python', 'AI & Machine Learning', 'Brain', 3, true),
('s4', 'LangChain', 'AI & Machine Learning', 'Brain', 4, true),
('s5', 'RAG', 'AI & Machine Learning', 'Brain', 5, true),
('s6', 'Java', 'Development', 'Laptop', 1, true),
('s7', 'React.js', 'Development', 'Laptop', 2, true),
('s8', 'Full-Stack Development', 'Development', 'Laptop', 3, true),
('s9', 'SQL', 'Data', 'Database', 1, true),
('s10', 'Databases', 'Data', 'Database', 2, true),
('s11', 'Cloud', 'Cloud & Automation', 'CloudCog', 1, true),
('s12', 'DevOps', 'Cloud & Automation', 'CloudCog', 2, true),
('s13', 'n8n', 'Cloud & Automation', 'CloudCog', 3, true)
ON CONFLICT (id) DO NOTHING;

-- Initial Projects
INSERT INTO public.projects (id, slug, title, description, tags, badge, icon, github_url, display_order, is_featured, is_visible) VALUES
('p1', 'meditrack', 'MediTrack — Health Companion', 'Healthcare companion application built with React, Spring Boot and MySQL.', '["React", "Spring Boot", "MySQL", "Healthcare"]'::jsonb, 'Healthcare Tech', 'Activity', 'https://github.com/gokulnathad-1827/', 1, true, true),
('p2', 'edupathai', 'EduPathAI', 'AI-powered educational/recommendation project focused on personalized learning pathways.', '["AI", "Machine Learning", "Recommendation", "Education"]'::jsonb, 'AI & EdTech', 'Sparkles', 'https://github.com/gokulnathad-1827/', 2, true, true),
('p3', 'anniversary-gift', 'Anniversary Gift — Mom & Dad', 'A personal React website created to celebrate my parents'' 21st wedding anniversary through memories, appreciation, and a digital tribute.', '["React", "Creative Web", "Personal Project"]'::jsonb, 'Personal Project ❤️', 'Heart', 'https://github.com/gokulnathad-1827/', 3, true, true)
ON CONFLICT (id) DO NOTHING;

-- Initial Leadership
INSERT INTO public.leadership (id, organization, position_title, year, description, display_order, is_visible) VALUES
('l1', 'IEEE KCE Student Branch CIS 2K26', 'Officer – Treasurer', '2026', 'Contributing to IEEE student activities through event coordination, financial responsibilities, technical initiatives, teamwork, and community engagement.', 1, true)
ON CONFLICT (id) DO NOTHING;
