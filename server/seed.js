// server/seed.js
export const initialData = {
  profile: {
    id: "1",
    name: "GOKULNATH D",
    headline: "AI & Data Science Student | AI/ML Enthusiast | Full-Stack Developer",
    shortRole: "AI & Data Science Student",
    degree: "B.Tech – Artificial Intelligence & Data Science",
    year: "3rd Year",
    college: "Karpagam College of Engineering",
    collegeLocationFull: "Myleripalayam Village, Othakkal Mandapam Post, Coimbatore – 641032, Tamil Nadu, India",
    visibleLocation: "Coimbatore, Tamil Nadu, India",
    native: "Thalaivasal, Salem, Tamil Nadu",
    phone: "7639499348",
    phoneFormatted: "+91 7639499348",
    email: "gokulnath.ad.1827@gmail.com",
    linkedin: "https://www.linkedin.com/in/gokulnathad1827/",
    github: "https://github.com/gokulnathad-1827/",
    portfolio: "https://gokulnathad.vercel.app/",
    instagram: "https://www.instagram.com/nath__g__1827",
    leetcode: "https://leetcode.com/u/Gokulnath1813/",
    whatsappMessage: "Hi Gokulnath! We met at Aishwarya 2K26. Great connecting with you!",
    photoPath: "/profile.jpg",
    photoAlt: "Gokulnath D - AI & Data Science Student",
    resumeUrl: "https://drive.google.com/file/d/1BIJLPu0KMZcQcoaJEBM9fVk1u7V0lnQE/view?usp=sharing",
    aboutMe: "I'm Gokulnath, a 3rd-year B.Tech Artificial Intelligence & Data Science student at Karpagam College of Engineering. I'm passionate about Artificial Intelligence, Machine Learning, Full-Stack Development, and building practical solutions to real-world problems.\n\nAlongside academics, I actively participate in hackathons, technical events, IEEE activities, and collaborative projects. I enjoy learning new technologies, connecting with people from different backgrounds, and turning ideas into working solutions.",
    networkingPhilosophy: "Every connection brings a new perspective, an opportunity to learn, and a chance to build something meaningful.",
    tagline: "Connect. Learn. Build. Grow.",
    personalSignature: "I CAN DO IT.",
    updatedAt: new Date().toISOString()
  },
  stats: [
    { id: "1", title: "3rd Year", subtitle: "B.Tech AI & DS", icon: "GraduationCap", displayOrder: 1 },
    { id: "2", title: "IEEE", subtitle: "Officer – Treasurer", icon: "Award", displayOrder: 2 },
    { id: "3", title: "AI + Full Stack", subtitle: "Core Interests", icon: "Code2", displayOrder: 3 },
    { id: "4", title: "Projects", subtitle: "AI + Real-world Solutions", icon: "Cpu", displayOrder: 4 }
  ],
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
  projects: [
    {
      id: "p1",
      slug: "meditrack",
      title: "MediTrack — Health Companion",
      description: "Healthcare companion application built with React, Spring Boot and MySQL.",
      tags: ["React", "Spring Boot", "MySQL", "Healthcare"],
      badge: "Healthcare Tech",
      icon: "Activity",
      githubUrl: "https://github.com/gokulnathad-1827/",
      liveUrl: "",
      displayOrder: 1,
      isFeatured: true,
      isVisible: true
    },
    {
      id: "p2",
      slug: "edupathai",
      title: "EduPathAI",
      description: "AI-powered educational/recommendation project focused on personalized learning pathways.",
      tags: ["AI", "Machine Learning", "Recommendation", "Education"],
      badge: "AI & EdTech",
      icon: "Sparkles",
      githubUrl: "https://github.com/gokulnathad-1827/",
      liveUrl: "",
      displayOrder: 2,
      isFeatured: true,
      isVisible: true
    },
    {
      id: "p3",
      slug: "anniversary-gift",
      title: "Anniversary Gift — Mom & Dad",
      description: "A personal React website created to celebrate my parents' 21st wedding anniversary through memories, appreciation, and a digital tribute.",
      tags: ["React", "Creative Web", "Personal Project"],
      badge: "Personal Project ❤️",
      icon: "Heart",
      githubUrl: "https://github.com/gokulnathad-1827/",
      liveUrl: "",
      displayOrder: 3,
      isFeatured: true,
      isVisible: true
    }
  ],
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
  admin: {
    username: "admin",
    // Hashed password for "admin123" (or dynamically validated)
    passwordHash: "$2a$10$E5z7O5e0h0Wz5.K8xL2bueG7z7nN8b2W6nE5u7b2W6nE5u7b2W6nE" // bcrypt hash for admin123
  }
};
