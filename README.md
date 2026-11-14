# xiao98.github.io

Personal website of Hao Xiao. Static HTML on the Phantom template (HTML5 UP), served by GitHub Pages from
`main`. No build step: edit the files and push.

## Preview locally

Pages use absolute paths (`/assets/...`), so open them through a local server, not as files:

```
python -m http.server 8000
```

## Where things are

| What | File |
|---|---|
| Home, Research, Projects, Interests, Blog | `index.html`, `research/`, `projects/`, `interests/`, `notes/` (each an `index.html`) |
| Menu, header, footer, internship expiry | `assets/js/site.js` |
| List of notes | `assets/js/posts.js` |
| Site-specific styles (on top of `main.css`) | `assets/css/custom.css` |
| Comments | `assets/js/comments.js`, `comments-worker/` (see its README) |

Projects and preprints appear on several pages (Home, Projects, Research): when one changes, update each.

## Common edits

- **Publish a note**: copy `notes/_template.html` to `notes/<slug>/index.html`, replace `TITLE`, `SUMMARY`,
  `SLUG`, `DATE` and the text, add a line to `POSTS` in `assets/js/posts.js`, and a `<url>` line to
  `sitemap.xml`. The Notes page, the "Latest notes" section of the home page and the comment form follow.
- **Withdraw a note**: delete its folder and its lines in `posts.js` and `sitemap.xml`.
- **Internship sentence**: the paragraph with `data-expires="2027-04-01"` in `index.html` disappears by itself
  from that date. Change the text and the date there.
- **Add an email**: add a link to the two `profile-links` paragraphs of `index.html`.
- **Art media**: only files cleared for publication, with a title, role, description and alt text.

## Public boundary

Only the repositories already linked may appear. No private repository names, paths or media; no school
other than Université Paris-Saclay (M2 MIA), Sorbonne Université (Master 1 in Computer Science) and Université Paris Cité (bachelor's degree in Mathematics).
