# Gokulnath D — Premium Digital Networking Profile & Visiting Card

A high-performance, mobile-first **Digital Visiting Card, Professional Profile, and Networking Hub** designed specifically for real-world networking at **IEEE events, Aishwarya 2K26, conferences, hackathons, and industry meetups**.

---

## 🚀 Live Preview & Architecture

- **Primary URL**: [https://gokulnathad.vercel.app/](https://gokulnathad.vercel.app/)
- **Built with**: React 19, Vite 8, Tailwind CSS, Lucide Icons, QRCode Generator, Canvas Confetti
- **Design Theme**: Green Tech / IEEE-inspired aesthetic (Deep Charcoal `#070b09`, Emerald `#10b981`, Cyan accents `#06b6d4`, Inter typography)
- **Target Optimization**: Mobile-first (360px, 375px, 390px, 412px, 430px) with progressive two-column desktop enhancement.

---

## 📁 Project Structure

```
Card/
├── index.html                   # SEO, Open Graph & Twitter metadata, Inter font
├── package.json                 # Project dependencies & scripts
├── postcss.config.js            # PostCSS configuration
├── tailwind.config.js           # Custom emerald tech theme & keyframe animations
├── vite.config.js               # Vite bundler configuration
│
├── public/
│   ├── favicon.svg              # Tech badge SVG favicon
│   ├── profile.jpg              # Primary profile photo (downloaded from Google Drive)
│   ├── profile.png              # High-resolution PNG profile photo
│   └── Gokulnath_Resume.pdf     # Resume PDF document
│
└── src/
    ├── App.jsx                  # Main application assembler & flow controller
    ├── App.css                  # Custom styling overrides
    ├── index.css                # Base Tailwind styles, custom scrollbars, safe-area
    ├── main.jsx                 # React root renderer
    │
    ├── data/
    │   └── profile.js           # ⚡ Centralized configuration for all personal data
    │
    ├── utils/
    │   ├── contact.js           # vCard (.vcf) generator & contact link helpers
    │   ├── sharing.js           # Web Share API & clipboard copy fallback
    │   └── qr.js                # Dynamic QR code generator & PNG download helper
    │
    └── components/
        ├── Icons.jsx            # Pixel-perfect SVG brand icons (LinkedIn, GitHub, WhatsApp, etc.)
        ├── Toast.jsx            # Notification toast system (no alert() popups)
        ├── Navbar.jsx           # Responsive header with mobile drawer & quick connect
        ├── ProfilePhoto.jsx     # Responsive rounded profile image with active status ring
        ├── ConnectActions.jsx   # Primary CTAs (Connect modal, WhatsApp, LinkedIn, vCard, QR)
        ├── VisualProfileCard.jsx# Digital business card preview with embedded scannable QR
        ├── Hero.jsx             # Mobile-first hero screen & desktop 2-column layout
        ├── QuickStats.jsx       # 4 verified academic & leadership stat cards
        ├── About.jsx            # Narrative summary, location badges & resume link
        ├── Skills.jsx           # Categorized technical competencies (AI/ML, Dev, Data, Cloud)
        ├── ProjectCard.jsx      # Individual project card with technology tags
        ├── Projects.jsx         # 3 featured projects (MediTrack, EduPathAI, Anniversary Gift)
        ├── IEEESection.jsx      # IEEE Student Branch CIS 2K26 Treasurer details & quote
        ├── NetworkingSection.jsx# "Met Me at an Event?" fast connection section
        ├── QRSection.jsx        # Dedicated prominent QR scanner & download section
        ├── ContactSection.jsx   # Direct contact channels, social grid & campus/native info
        ├── MobileStickyBar.jsx  # Translucent mobile bottom bar (Connect, WhatsApp, LinkedIn)
        ├── ConnectModal.jsx     # Mobile bottom sheet & desktop centered connect modal
        └── Footer.jsx           # Brand signature, copyright & back-to-top button
```

---

## 🛠️ Local Development & Running

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the local development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

3. **Validate production build**:
   ```bash
   npm run build
   ```

4. **Preview the production bundle locally**:
   ```bash
   npm run preview
   ```

---

## 🌐 Deploying to Vercel

### Option 1: Via Vercel CLI (Recommended)
1. In the project root, run:
   ```bash
   npx vercel
   ```
2. Follow the prompts (link to your Vercel account, accept default Vite build settings: `npm run build`, output directory `dist`).

### Option 2: Via GitHub & Vercel Dashboard
1. Push this directory to your GitHub repository: `https://github.com/gokulnathad-1827/`
2. Go to [https://vercel.com/dashboard](https://vercel.com/dashboard)
3. Click **Add New Project** → Import your repository.
4. Framework Preset will be automatically detected as **Vite**.
5. Click **Deploy**.

---

## 🔄 Updating Your Profile Details

### 1. Update Personal Info, Links, or Text
All information is centralized in:
👉 [`src/data/profile.js`](file:///c:/Users/admin/Downloads/Card/src/data/profile.js)
You can update:
- Headline & degree
- WhatsApp pre-filled message
- IEEE titles & descriptions
- Skills & projects
- Social media URLs

### 2. Replace Profile Photo
The site is already loaded with your photo downloaded directly from your Google Drive link into `public/profile.jpg`.
If you want to update it in the future with a new picture:
- Save your new photo as:
  👉 `public/profile.jpg`
- The website automatically uses this file across the Hero, Visual Business Card, and Social Previews.

### 3. Update Resume Link
- The Resume functionality is powered directly by your Google Drive link configured in:
  👉 [`src/data/profile.js`](file:///c:/Users/admin/Downloads/Card/src/data/profile.js) (`profileData.resume`)
  Default URL: `https://drive.google.com/file/d/1BIJLPu0KMZcQcoaJEBM9fVk1u7V0lnQE/view?usp=sharing`
- Both the **Hero Connect Actions** and **About Section** have the `View My Resume ↗` button opening this Google Drive document in a new tab.
- A local backup copy is also preserved at `public/Gokulnath_Resume.pdf`.

---

## 📱 Features & Highlights

- **Direct vCard (.vcf) Download**: One-tap saving of Gokulnath's phone (+91 7639499348), email, college, and social profiles directly into iOS/Android Contacts.
- **Smart QR Code**: Dynamically adapts to the current deployed URL (never hardcodes localhost in production). Can be shown on-screen or downloaded as a high-resolution 800px PNG.
- **Web Share API**: One-tap native mobile sharing to WhatsApp, Messages, or AirDrop with automatic fallback to clipboard copy.
- **Subtle Personal Signature**: Features `"I CAN DO IT."` subtly as requested.
- **Zero Fake Metrics**: Adheres strictly to verified academic, project, and IEEE leadership details.
