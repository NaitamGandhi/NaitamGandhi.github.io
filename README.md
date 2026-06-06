# Creating a Portfolio Site

A fast, dependency-free portfolio site with a dark terminal/dev aesthetic. Everything you'd ever want to change lives in **one file: `config.js`**. No build step, no framework — just static files that drop straight onto GitHub Pages.

## Files

| File | What it is | Touch it? |
|------|-----------|-----------|
| `config.js` | All your content: profile, experience, projects, skills, education, theme colors. | **Yes — this is the only file you normally edit.** |
| `index.html` | Page skeleton. | Rarely |
| `styles.css` | Dark terminal theme. Colors come from `config.js`. | Only for deeper restyling |
| `main.js` | Renders the page from `config.js`. | No |
| `Resume_SWE_2026.pdf` | Drop your resume here to enable the download button. | Optional |

## Edit your content

Open `config.js` and edit the values. It's commented throughout.

**Add a future passion project** — copy a block inside `projects: [ ]`:

```js
{
  title: "My Next Passion Project",
  year: "2026",
  status: "in-progress",        // shipped | in-progress | exploring
  featured: true,
  blurb: "One or two sentences on what it is and why it's cool.",
  tags: ["Rust", "Kubernetes", "Side Project"],
  links: [
    { label: "GitHub", url: "https://github.com/<user>/repo" },
    { label: "Live Demo", url: "https://..." },
  ],
},
```

The projects section auto-builds its tag filters from whatever tags you use, and `featured: true` cards sort to the front. Change theme colors in the `theme: { }` block at the bottom.

## Preview locally

Because the browser loads `config.js` as a script, just opening `index.html` works. For a server-like preview:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Deploy to GitHub Pages

To publish:

1. Put these files in the repo root (or a `/docs` folder).
2. Commit and push:
   ```bash
   git add .
   git commit -m "New portfolio"
   git push
   ```
3. On GitHub: **Settings → Pages → Build and deployment → Source: Deploy from a branch**, pick your branch and `/ (root)` (or `/docs`), **Save**.
4. Live in ~1 minute at the URL of your specification.

To use a custom domain later, add a `CNAME` file with your domain and set the DNS records GitHub shows you.