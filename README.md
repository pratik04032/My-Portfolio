# Developer Portfolio Template

A responsive, mobile-optimized personal developer portfolio inspired by the structure and visual identity of `Jagan-Mohan-Khuntia-PortFolio`, rebuilt with React, TypeScript, Tailwind CSS, and Vite for fast customization and effortless deployment to **Vercel** or **GitHub Pages**.

---

## Features

- **Single-File Customization**: Update your name, bio, portrait, skills, 6+ projects, social media links, and Formspree endpoint inside `src/config/portfolioConfig.ts`.
- **In-Browser Live Customizer**: Click **Customize Placeholders** in the footer to test your own personal details, social links, and project descriptions live, then copy or download the generated TypeScript configuration snippet.
- **Mobile-First & Responsive**: Clean collapsible mobile drawer, responsive portrait framing across all screen sizes, 44px+ touch targets, and accessible keyboard navigation.
- **Interactive Skills & Projects**: Filterable skill categories with paired domain visuals, filterable project showcase with detailed overview modals, and a Formspree-ready contact form with confirmation modal.
- **Deploy-Ready**: Pre-configured with `vercel.json` and `.github/workflows/deploy-gh-pages.yml`.

---

## Quick Start (Local Development)

### Prerequisites
- [Node.js](https://nodejs.org/) v18 or higher (v20 recommended)
- `npm` (bundled with Node.js)

### Run Locally

```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm run dev

# 3. Build for production
npm run build
```

---

## How to Customize Your Portfolio

### Option A: Edit `src/config/portfolioConfig.ts` Directly (Recommended)

Open `src/config/portfolioConfig.ts` and replace the placeholder values inside `DEFAULT_PORTFOLIO_CONFIG`:

1. **Personal Information (`personal`)**
   - `fullName`: Displayed in the navigation bar, browser title, and footer.
   - `shortName`: Highlighted in the Hero headline (`Hi, I'm ...`).
   - `role` & `tagline`: Displayed beneath your name in the Hero section and footer.
   - `location`, `education`, `specialization`, `availability`, `email`: Shown in the Hero, About, and Contact sections.
   - `resumeUrl`: Paste a link to your hosted PDF resume (or leave `""` to hide the Resume button).
   - `aboutParagraphs`: Array of biography paragraphs shown in the About section.

2. **Profile & Workspace Photos (`heroImage` & `aboutImage`)**
   - Place your own photos inside the `public/` folder (for example, `public/profile.jpg` and `public/workspace.jpg`).
   - Update `heroImage: '/profile.jpg'` and `aboutImage: '/workspace.jpg'` in `src/config/portfolioConfig.ts`.

3. **Social Media Links (`social`)**
   - Update `linkedin`, `github`, `twitter`, and `email` with your profile URLs.
   - Leave any link as `""` to automatically hide that icon.

4. **Skills (`skillsSection`)**
   - Edit the skill names and `level` percentages (`0–100`) across the `frontend`, `backend`, and `aiml` categories.

5. **Projects (`projectsSection.projects`)**
   - Update each project's `title`, `category` (`'AI & ML' | 'Full-Stack' | 'Computer Vision'`), `year`, `summary`, `details`, `highlights`, `techStack`, `githubUrl`, and `liveUrl`.
   - You can add or remove project objects freely.

6. **Live Contact Form via Formspree (`contactSection.formspreeEndpoint`)**
   - Create a free account at [formspree.io](https://formspree.io) and create a new form.
   - Copy your form endpoint (for example, `https://formspree.io/f/abcd1234`) and paste it into `formspreeEndpoint`.
   - Update `<title>` and meta description tags in `index.html` with your own name for SEO and link previews.

### Option B: Use the Built-In Live Customizer

1. Scroll to the footer of the running site and click **Customize Placeholders**.
2. Edit your personal info, social URLs, and project descriptions to preview changes immediately.
3. Click **Copy Config** (or **Download .ts**) and paste the output into `DEFAULT_PORTFOLIO_CONFIG` inside `src/config/portfolioConfig.ts`.

---

## Deploying to Vercel

Vercel provides automatic previews, HTTPS, and instant builds via the included `vercel.json`.

### Method 1: Deploy via GitHub (Recommended)
1. Push your customized project to a GitHub repository.
2. Sign in at [vercel.com](https://vercel.com) and click **Add New → Project**.
3. Import your GitHub repository.
4. Vercel automatically detects **Vite** (`Build Command: npm run build`, `Output Directory: dist`).
5. Click **Deploy**. Every future `git push` to `main` automatically redeploys your portfolio.

### Method 2: Deploy via Vercel CLI
```bash
npm install -g vercel
vercel
# For a production deployment:
vercel --prod
```

---

## Deploying to GitHub Pages

This project includes an automated GitHub Actions workflow at `.github/workflows/deploy-gh-pages.yml` that sets the correct Vite base path automatically for both project sites (`https://<username>.github.io/<repo-name>/`) and user sites (`https://<username>.github.io/`).

### Steps
1. Create a new repository on GitHub and push your code to the `main` branch:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio setup"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo>.git
   git push -u origin main
   ```
2. Open your repository on GitHub and go to **Settings → Pages**.
3. Under **Build and deployment → Source**, select **GitHub Actions**.
4. Wait ~1 minute for the **Deploy Portfolio to GitHub Pages** workflow in the **Actions** tab to finish.
5. Your live site URL will appear in the **Actions** run summary and under **Settings → Pages**.

---

## Project Structure

```text
├── .github/workflows/
│   └── deploy-gh-pages.yml      # Automated GitHub Pages CI/CD
├── src/
│   ├── assets/images/           # Generated placeholder artwork & photos
│   ├── components/
│   │   ├── Header.tsx           # Responsive 3-zone header + mobile drawer
│   │   ├── Hero.tsx             # Split hero + social links + highlights strip
│   │   ├── About.tsx            # Workspace visual + bio + quick facts
│   │   ├── Skills.tsx           # Filterable skills + paired visual showcase
│   │   ├── Projects.tsx         # Filterable project cards + detail modal
│   │   ├── Contact.tsx          # Formspree contact form + confirmation popup
│   │   ├── Footer.tsx           # Multi-column footer + back-to-top button
│   │   ├── CustomizeDrawer.tsx  # Live browser placeholder editor & exporter
│   │   └── ResilientImage.tsx   # Fallback-safe image component
│   ├── config/
│   │   └── portfolioConfig.ts   # Single source of truth for all content
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── index.html
├── vercel.json                  # Vercel SPA configuration
├── vite.config.ts
└── README.md
```
