# Zayys Portfolio

Files: `index.html`, `styles.css`, `main.js`, `README.md` (+ optional `images/` folder you create).

## Run locally
No install needed. Double-click `index.html`, or for a local server run `python3 -m http.server 8000` in this folder and open http://localhost:8000.
Internet is needed for Three.js (cdnjs, free, pinned r128) and Google Fonts (free). Without them the site still works with a fallback font and no 3D crystal.

## Edit your content
Open `main.js` and change the `CONTENT` block at the top: email, social links, projects, skills, artwork, businesses and journey. Put images in an `images/` folder and reference them like `"images/art1.jpg"`. Empty image fields show a labelled placeholder. Placeholder entries are marked `[PLACEHOLDER]`; replace them before publishing.

## Contact form
No form is included because a static site can't send messages by itself. The email button uses `mailto:`. To add a form, use a free service such as Formspree (needs an account) and point a `<form action>` at it.

## Deploy
Upload the folder to any static host (Netlify, GitHub Pages, Cloudflare Pages).

## Test checklist
Nav links scroll to sections; mobile menu (narrow the window) opens; art filters work; clicking a project or artwork opens a dialog (Esc closes); Tab key shows focus rings; enabling "reduce motion" in your OS stops animations.