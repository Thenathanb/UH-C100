# Collegiate 100 at University of Houston — Clutch City

React (Vite) + Tailwind CSS v4 site for the Clutch City chapter. \structure (hero → mission → pillars →
highlights → CTA), rebuilt from scratch with Collegiate 100's own branding
and content.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build -> dist/
```

## Deploying

**Live now on GitHub Pages: https://thenathanb.github.io/UH-C100/**

`.github/workflows/deploy.yml` builds and redeploys automatically on every
push to `main` — no manual step needed. GitHub Pages itself is configured
(repo Settings → Pages → source: GitHub Actions), no further setup required.

Since this is a GitHub Pages *project* site (served under `/UH-C100/`,
not the domain root), a few things are wired specifically for that:

- `vite.config.js` sets `base: '/UH-C100/'`.
- `src/main.jsx` passes that same base to `<BrowserRouter basename>`.
- `src/lib/url.js`'s `withBase()` prefixes runtime image paths (used by
  `PhotoSlot` and `Logo`) so photos resolve under the subpath too.
- `public/404.html` + a small script in `index.html` implement the
  [SPA-on-GitHub-Pages redirect trick](https://github.com/rafgraph/spa-github-pages),
  since GitHub Pages has no server-side rewrites — without it, a direct
  link to e.g. `/events/back-2-school-jam-2026` would 404 instead of
  loading the app.

**If you ever move to a custom domain** (still a TODO — see below) or a
host with real rewrites (Vercel/Netlify), the site would then live at the
domain root instead of a subpath, so `base`/`basename` should go back to
`/` and the 404.html trick can be removed (those hosts rewrite unmatched
routes to `index.html` for you).

- **Domain**: TODO — decide on a domain (e.g. `collegiate100uh.org`) and
  either point it at GitHub Pages (via a `CNAME` file + DNS) or migrate
  hosts.

## Adding real photos (no code changes needed)

Most images on the site are wired to a specific file path under
`public/images/`. Until a real file exists there, that spot shows a
labeled placeholder instead of a broken image — drop in a file with the
**exact same name** and it appears automatically, nothing else to edit.

| Path | Used for |
|---|---|
| `public/images/logo.jpg` | Navbar logo + browser tab favicon (real chapter logo, in place) |
| `public/images/national-logo.svg` | 100 Black Men of America logo in the footer |
| `public/images/hero.jpg` | Homepage hero (real formal group photo, in place) |
| `public/images/interns.jpg` | "25+ internships" collage — homepage Impact section + About page Why Join (real, in place) |
| `public/images/why-join.jpg` | Homepage's separate general "Why Join" section |
| `public/images/exec/*.jpg` | Exec board headshots (see `src/data/execBoard.js`) |
| `public/images/grads/*.jpg` | Graduate photos (see `src/data/grads.js`) |

Logo: the real chapter logo is already in place at `public/images/logo.jpg`
and wired into the navbar + browser tab icon. If you get a higher-res or
vector version later, drop it in as `logo.jpg`/`.png`/`.svg` and update the
one `src` reference in `src/components/Logo.jsx` to match.

### Event photos (one folder per event, swipeable gallery)

Event photos work differently on purpose: **each event gets its own folder**
at `src/assets/events/<event id>/` (the `<event id>` must match that
event's `id` in `src/data/events.js`). Drop in as many photos as you want
— any filenames, any count, `.jpg`/`.jpeg`/`.png`/`.webp` — and they
automatically:

- show up as a swipeable/arrow-and-dot gallery on that event's detail page
  (touch swipe works natively, no extra setup)
- surface the first photo (alphabetical by filename) as the event's cover
  thumbnail on the homepage and Events page, with a small photo-count
  badge if there's more than one
- fall back to a labeled placeholder automatically if the folder is empty

No entry in `events.js` and no separate `photo` field needed — it's purely
based on the folder's contents. Name files `01.jpg`, `02.jpg`, etc. if you
want to control the order; otherwise they sort alphabetically. Current
folders:

```
src/assets/events/
├── back-2-school-jam-2026/       01.jpg (real photo)
├── c100-conference-2026/         01.jpg (real photo)
├── mens-mental-health-conversation-2026/  01.jpg (real photo)
├── general-body-meeting-1/       (empty — add photos once it happens)
└── professional-workshop-1/      (empty — add photos once it happens)
```

## Where the content lives

All copy and organizational data is centralized so it's easy to update
without touching layout code:

- `src/data/site.js` — mission statement, pillars, contact email, social
  links, meeting schedule, membership requirements/dues, points system
  note.
- `src/data/events.js` — every event (past + upcoming). Add a new event by
  adding an object to the array; it automatically shows up on the
  calendar, the Events page, the homepage highlights, and gets its own
  detail page at `/events/<id>`.
- `src/data/eventPhotos.js` — the glob logic that turns each event's
  `src/assets/events/<id>/` folder into its gallery. Shouldn't need
  editing; see the photos section above.
- `src/data/execBoard.js` — exec board roster.
- `src/data/grads.js` — recent graduates, grouped by term.

## Outstanding TODOs

Things from the original checklist that still need real info (all marked
`// TODO` inline in the data files above):

- [x] Chapter logo — in place at `public/images/logo.jpg`
- [x] Brand colors — set from the logo + chapter's Houston-red accent:
      rich black `#0A0A0A`, red accent `#CE1141`, off-white `#FAFAFA`,
      light/mid gray `#F0F0F0` / `#DADADA` (see `@theme` in `src/index.css`)
- [ ] Higher-res / vector version of the chapter logo (current file is
      100×100, fine for the navbar but low-res if used any larger)
- [ ] National 100 Black Men of America logo (footer)
- [x] Back 2 School Jam, C100 Conference, and Men's Mental Health event
      photos — in place, each in its own folder (see photos section above)
- [x] Hero photo — in place at `public/images/hero.jpg`
- [x] "25+ internships" collage — in place at `public/images/interns.jpg`,
      featured on the homepage Impact section and About page Why Join
- [x] Homepage's "why-join.jpg" photo — in place
- [x] Exec board roster + headshots — 17 members: Elanna Benton
      (President), Ava Sienna Chambers (Vice President), LaZaria Holland
      (Secretary), Benesha Kasongo (Treasurer), Leah Masumbuko
      (Sergeant-At-Arms), Mario Torres & Jesiah James (Membership
      Co-Chairs), Ja'Shaud Johnson & Neha Addus (Mentorship Co-Chairs),
      Victoria Jones & Lauren Taylor (Economic Empowerment Co-Chairs),
      Anthony Smith (Health and Wellness Co-Chair) & Jasachin Harris
      (Health and Wellness Chair), Mikayla Nicholas & Alisha Caballero
      (Education Co-Chairs), Joel Abrha (Co-Director of Communications),
      Allen Chervil (Historian). No bios — cards show just name + title,
      overlaid directly on a full-bleed portrait photo (aspect 3:4) with
      a dark gradient, matching colorstackosu.org/execboard's card
      treatment exactly (see `src/components/ExecCard.jsx`) — 2/3/4-column
      grid depending on screen size. Hover shows a red accent bar on the
      left edge (no hover prompt text — removed per feedback). All 17
      members now have a LinkedIn link and are clickable
- [x] Recent grads — 8 members in place: Alaya Lee (Education), Jaiden
      Boyd (MIS/Marketing), Nilah Hurd (Political Science), Chloe Dennis
      (Health), Ronelle Urey (Public Health), Paris Joubert (Kinesiology),
      Nick Samuel (MIS), Dominique Barnes (Finance). Exact grad term
      (Spring/Summer 2026) still TODO — currently grouped as "Class of 2026"
- [x] Grad LinkedIn links — 6 of 8 in place (click a grad card, same
      modal as Exec Board). No link given yet for Paris Joubert or Nick
      Samuel, so those two cards aren't clickable
- [x] Real upcoming events — August: Virtual GBM (8/23), Cat's Back
      (8/25 & 8/26, Houston Room), Merch Madness (8/29, 1100 Merrill
      St), Love Island Watch Party (8/31, WhatItDo BBQ). September:
      C100 Mixer Collab (9/3, The Savoy), Women of Gold Kickball (9/8,
      TBD), Trail Ride (9/11, Lynn Eusan Park), E100 Learning Event
      (9/12, SC South), GBM (9/15, Engineering Lecture Hall), Chapter
      Photoshoot (9/15, TBD), Internship Panel: Synergy (9/17, SC
      North), Splash Pad (9/22, Lynn Eusan Park), What's Not in the
      Syllabus (9/28, CBB 118). Plus recurring Run Club (every 2nd &
      4th Sunday, 6 PM) and Bible Study (every 1st & 3rd Thursday, 7
      PM) seeded through late September. Added a new "Social" event
      category for these. No photos yet for any of them — will show
      placeholders until added
- [x] Events page redesign — matches colorstackosu.org/events'
      structure: a "Schedule / Event Calendar" section (their version
      embeds a paid third-party calendar widget we don't have access
      to, so this keeps our own custom-built `EventCalendar`, just
      relabeled/restyled to match), plus a new "Gallery / Recent
      Events" section that shows past-event photo recaps — but *only*
      for events that actually have photos dropped in
      (`src/assets/events/<id>/`); events without any photos are
      skipped entirely rather than showing a blank/placeholder recap,
      per explicit instruction. Currently shows all 3 past events
      since all 3 have real photos.
- [x] Fixed a real bug found while building this: the "Up next" list
      (now 20 events and growing) was wrapped in the same scroll-reveal
      animation as the calendar above it, making that combined block so
      tall that the calendar sat at `opacity: 0` on load — a visitor
      would've had to scroll most of the way down the sidebar before
      the calendar became visible. Split into separate reveals per
      section and capped "Up next" to the soonest 6 (with a "+N more on
      the calendar" note) so this can't recur as more events are added.
- [ ] Meeting schedule
- [ ] Involvement points system details
- [ ] Membership requirements + dues amount
- [ ] Recent graduates list
- [x] Real contact email — `uh.collegiate100@gmail.com`
- [x] Social media links — Instagram + LinkedIn in place; no TikTok
      given, so it's omitted from the footer/contact page for now
- [x] Membership application — there isn't one yet, so every "Apply" /
      "Join Us" CTA site-wide now points to the Contact page instead of
      a dead link. Once a real application/interest form exists, point
      `site.contactEmail`'s neighbors back to it (search the codebase
      for `to="/contact"` on the CTA buttons to swap them back)
- [ ] Domain name + hosting decision
- [ ] National org's brand usage rules (to confirm the current
      palette/logo treatment is compliant)
