# AI Creative Portfolio — Setup & Deployment Guide

A complete, production-ready portfolio website for an AI Creative Specialist, Automation Engineer, and Vibe Coding Developer. Pure HTML/CSS/JS — no build tools, no dependencies, deploys directly to GitHub Pages.

---

## Quick Start (VS Code)

1. Open the `portfolio/` folder in VS Code
2. Install the **Live Server** extension (ritwickdey.LiveServer)
3. Right-click `index.html` → **Open with Live Server**
4. Your site opens at `http://127.0.0.1:5500`

That's it. No npm install, no build step.

---

## Files

```
portfolio/
├── index.html      ← All page content and structure
├── styles.css      ← Design system + all styles
├── script.js       ← Navigation, animations, form handling
├── image/          ← Campaign images (image_1–3) + supporting photography
└── README.md       ← This file
```

### Image credits
Supporting photos are from Unsplash (Unsplash License — free for commercial use, attribution appreciated but not required):
- `work-automation.jpg` — Chris Ried · `work-jewelry.jpg` — Sabrianna · `work-saas.jpg` — Luke Chesser
- `work-ads.jpg` — Piqo Design · `work-agent.jpg` — Denny Müller · `about-studio.jpg` — Nikita Kachanovsky
- `case-automation.jpg` — Arnold Francisca · `case-saas.jpg` — Ales Nesetril

Swap any of these for real project screenshots/renders as they become available — same filename, no code changes needed.
`about-studio.jpg` is a stand-in for a headshot.

---

## Personalizing Your Portfolio

### Step 1 — Replace your name and identity
Open `index.html` and search for:
- `Your Name` → your actual name (appears in nav, footer, page title)
- `YN` → your initials (logo mark)
- Update `<title>` and `<meta name="description">` with your name and positioning

### Step 2 — Social and contact links
Search for these placeholders and replace:
- `YOUR_EMAIL@example.com` → your email
- `YOUR_INSTAGRAM_HANDLE` → your Instagram handle (e.g. `johndoe`)
- `YOUR_LINKEDIN` → your LinkedIn username (e.g. `john-doe-123`)
- `YOUR_GITHUB` → your GitHub username

### Step 3 — Add your real work
In the **Selected Work** section, each `.work-placeholder` div is a placeholder. Replace with:

**Option A — Image:**
```html
<img src="images/project-fashion-campaign.jpg" alt="AI Fashion Campaign" loading="lazy" />
```

**Option B — Video:**
```html
<video src="videos/fashion-reel.mp4" autoplay muted loop playsinline></video>
```

Create an `images/` and `videos/` folder in the portfolio directory and add your files there.

### Step 4 — Update project descriptions
In each `.work-card`, `.case-study`, and `.auto-card`, replace the placeholder text with your actual project details, tools used, and results.

### Step 5 — Update case study metrics
Find `[ Placeholder — add verified metric ]` entries in the case studies section and replace with your actual results. Only include numbers you can substantiate.

### Step 6 — Instagram posts
In the Instagram section, each `.ig-post-placeholder` can be replaced:

**Option A — Manual (simplest):**
```html
<a href="https://instagram.com/p/YOUR_POST_ID" target="_blank" rel="noopener" class="ig-post">
  <img src="images/ig-post-1.jpg" alt="AI fashion campaign" loading="lazy" />
  <div class="ig-post-overlay">...</div>
</a>
```
Export your Instagram photos and place them in your `images/` folder.

**Option B — Curator.io (free live feed):**
1. Create a free account at curator.io
2. Connect your Instagram
3. Replace the ig-grid section with their embed code

**Option C — EmbedSocial:**
Similar to Curator.io, with a free tier.

### Step 7 — Contact form (Formspree — free)
1. Go to [formspree.io](https://formspree.io) and sign up free
2. Create a new form
3. Copy your form endpoint (looks like `https://formspree.io/f/xyzabc12`)
4. In `index.html`, find:
   ```html
   action="https://formspree.io/f/YOUR_FORMSPREE_ID"
   ```
   Replace `YOUR_FORMSPREE_ID` with your actual ID.
   
Formspree handles submissions, sends you emails, and provides a spam filter — free up to 50 submissions/month.

**Alternative:** Remove the form entirely and keep only the contact links. The form is optional.

### Step 8 — About photo
Find `.about-photo-placeholder` and replace the div with:
```html
<img src="images/headshot.jpg" alt="Your Name" class="about-photo" />
```
Add this CSS to `styles.css`:
```css
.about-photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: var(--radius-xl);
  border: 1px solid var(--color-border);
}
```

---

## Deploying to GitHub Pages

### Option A — Automatic (Recommended)

1. Create a new GitHub repository named `yourusername.github.io`
   (Replace `yourusername` with your actual GitHub username — this is important)

2. In VS Code, open the terminal and run:
   ```bash
   cd path/to/portfolio
   git init
   git add .
   git commit -m "Initial portfolio deploy"
   git branch -M main
   git remote add origin https://github.com/yourusername/yourusername.github.io.git
   git push -u origin main
   ```

3. Go to your repo on GitHub → **Settings** → **Pages**
4. Under "Source", select **Deploy from a branch** → **main** → **/ (root)**
5. Click **Save**

Your site will be live at `https://yourusername.github.io` within 2–3 minutes.

### Option B — Project repo (custom path)

If you name the repo anything other than `yourusername.github.io`:
- Your site will be at `https://yourusername.github.io/repo-name`
- The site still works, but internal links stay relative so nothing breaks.

### Option C — Custom domain

1. Buy a domain (Namecheap, Cloudflare, etc.)
2. In your GitHub repo → **Settings** → **Pages** → **Custom domain** → enter your domain
3. At your DNS provider, add:
   - 4 A records pointing to GitHub's IPs: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - Or a CNAME record: `www` → `yourusername.github.io`
4. Enable **Enforce HTTPS** once DNS propagates

---

## Adding New Projects

To add a new project to the work grid, copy this block inside `.work-grid`:

```html
<article class="work-card">
  <div class="work-card-media">
    <img src="images/your-project.jpg" alt="Project description" loading="lazy" />
    <div class="work-card-overlay">
      <span class="work-tag">Your Category</span>
    </div>
  </div>
  <div class="work-card-body">
    <h3 class="work-card-title">Project Title</h3>
    <p class="work-card-desc">Brief description of what you made, who it was for, and why it matters.</p>
    <div class="work-card-meta">
      <span>Tool 1</span>
      <span>Tool 2</span>
    </div>
  </div>
</article>
```

---

## Customizing Colors

All colors are CSS custom properties in `styles.css` under `:root`. The accent color is:
```css
--color-accent:  #5B4FE8;   /* indigo — change this to your preferred accent */
--color-accent-2: #7B70F0;  /* lighter variant used in tags and icons */
```

---

## Performance Tips

- Compress images before adding them. Use [Squoosh](https://squoosh.app) (free, browser-based) to export WebP at ~80% quality.
- For hero images, aim for under 200KB. For work thumbnails, under 100KB.
- Videos: use H.264/H.265 MP4. Keep autoplay clips under 5MB.

---

## SEO

Update these in `index.html` before going live:
```html
<title>Your Name — AI Creative Specialist & Automation Engineer</title>
<meta name="description" content="Your 1-2 sentence positioning statement." />
<meta property="og:title" content="Your Name — AI Creative Specialist & Automation Engineer" />
<meta property="og:description" content="Your positioning statement." />
<meta property="og:url" content="https://yourusername.github.io" />
```

Optionally add an OG image (social sharing preview):
```html
<meta property="og:image" content="https://yourusername.github.io/images/og-image.jpg" />
```
Create a 1200×630px image for this.

---

## Quick Checklist Before Going Live

- [ ] Name and initials replaced throughout
- [ ] Email, Instagram, LinkedIn, GitHub links updated
- [ ] Project placeholders replaced with real work (or clearly labeled as "coming soon")
- [ ] Case study metrics verified (remove or label any invented numbers)
- [ ] About section written in your own voice
- [ ] About photo added
- [ ] Formspree form ID updated (or form removed)
- [ ] Instagram handle updated
- [ ] Page title and meta description personalized
- [ ] Test on mobile (Chrome DevTools or your phone)
- [ ] Test all links and buttons
