# 🛡️💜 GuardiansCall · SentinelHaven H.A.V.E.N  v2.0.0

> *"Life is what you put into it."*

Two fully independent AI-powered platforms — one shared codebase, separate deployments.

**H.A.V.E.N** — *Holistic AI Visitor Engagement Network*

---

## 🗂️ Complete File Manifest

```
guardianscall/
│
│  ── DEPLOY EITHER FILE AS YOUR ENTRY POINT ──
├── index.html                     ← GuardiansCall (GC + SentinelHaven switcher)
├── sentinelhaven.html             ← SentinelHaven standalone (deploy independently)
│
│  ── SOURCE & STYLES ──
├── guardianscall-unified.jsx      ← Full React source, both platforms (3,289 lines)
├── guardianscall-unified.css      ← Unified design system (GC dark + SH indigo)
├── sentinelhaven.css              ← SentinelHaven standalone stylesheet
│
│  ── ASSETS ──
├── guardianscall_logo.png         ← Transparent PNG logo, 4647×4234px
│
│  ── PWA ──
├── manifest.json                  ← GuardiansCall PWA manifest (6 shortcuts)
├── sentinel-manifest.json         ← SentinelHaven PWA manifest (3 shortcuts)
├── sw.js                          ← Shared Service Worker (offline, dual cache)
│
│  ── SEO / CRAWL ──
├── robots.txt                     ← Crawl directives (both domains)
├── sitemap.xml                    ← XML sitemap (both platforms, 8 URLs)
│
│  ── BUILD ──
├── package.json                   ← npm scripts (dev, build, serve, deploy)
├── vite.config.js                 ← Vite — builds both HTML entry points
├── README.md                      ← This file
│
└── backend/
    ├── server.js                  ← Express: /api/support, /api/support/history
    ├── db.js                      ← SQLite ticket store (swap → Supabase)
    ├── notify.js                  ← Gmail + Teams Adaptive Card webhook
    └── .env.example               ← All environment variables
```

---

## 🚀 Three Deployment Options

### A — Instant (zero setup)
- **GuardiansCall + SentinelHaven together**: open `index.html`
- **SentinelHaven standalone**: open `sentinelhaven.html`
- No npm, no server, no build step required.

### B — Static Hosting

| Host | GuardiansCall | SentinelHaven |
|---|---|---|
| **Netlify** | Drag `index.html` to drop.netlify.com | Drag `sentinelhaven.html` separately |
| **Vercel** | `vercel --prod` | Deploy `sentinelhaven.html` as a second project |
| **GitHub Pages** | Push to `gh-pages`, set root | Separate repo → Pages |
| **Azure Static Web Apps** | Connect repo, `index.html` as entry | Second app → `sentinelhaven.html` |
| **AWS S3** | `aws s3 sync . s3://gc-bucket` | `aws s3 cp sentinelhaven.html s3://sh-bucket/index.html` |

### C — Full Stack (backend + notifications)
```bash
npm install
cp backend/.env.example backend/.env
# Fill in: SUPPORT_EMAIL, SUPPORT_PASS, TEAMS_WEBHOOK_URL, ALLOWED_ORIGIN
npm start
# Frontend: http://localhost:5173
# API:      http://localhost:3001
```

---

## 🔄 Platform Navigation

### Unified (index.html)
A fixed pill switcher at the top of every view:
```
┌────────────────────────────────────────┐
│  🛡 GuardiansCall ↗  │  💜 SentinelHaven ↗  │
└────────────────────────────────────────┘
```
Each button **opens the other platform in a new tab** — preserving state in the current window.

### URL Hash Routing
Direct linking is fully supported:
```
index.html#landing          → GuardiansCall home
index.html#dictionary       → ADA Dictionary
index.html#passenger        → ARIA Companion App
index.html#cc-companion     → H.A.V.E.N chat (opens as SentinelHaven)
sentinelhaven.html#cc-companion  → H.A.V.E.N chat
sentinelhaven.html#cc-family     → Family Portal
sentinelhaven.html#cc-caregiver  → Caregiver Portal
```

---

## 🛡️ Platform A — GuardiansCall (Airport AI Accessibility)

For passengers with TBI, PTSD, cognitive impairments, and non-visible disabilities.

| Feature | Description |
|---|---|
| ARIA AI Companion | Claude streaming chat with passenger profile context |
| ADA Dictionary | 107 terms A–Z, Say This / Not That, industry filter |
| Staff Dashboard | AI empathy briefings, passenger tracking, stress indicators |
| FAST Detection | Dysarthria acoustic analysis → ECO dispatch |
| SOS Button | Always-visible emergency trigger |
| Onboarding | 5-step: conditions, triggers, comms preferences |
| Staff Portal | Role-based login (gate agent, TSA, admin) |

---

## 💜 Platform B — SentinelHaven H.A.V.E.N

**H.A.V.E.N** — *Holistic AI Visitor Engagement Network*

An AI companion ecosystem for people with cognitive difficulties, loneliness, memory issues, and social isolation — and the caregivers and families who support them.

### Three Portals

**Person (H.A.V.E.N Companion)**

The primary AI companion interface — designed for the person who needs support.

- Voice + text conversation with H.A.V.E.N (Claude AI, streaming)
- Daily mood log: score 1–10, energy 1–10, loneliness flag, free notes
- Activity tracker: 8 suggested activities (cognitive, social, physical, wellbeing)
- Reminder list: configurable daily/weekly alerts
- Memory Timeline: life events H.A.V.E.N references naturally in conversation
- Quick reply chips: one-tap conversation starters
- 40-message rolling context window
- Crisis detection: distress language → gentle escalation to 988 or family

**Family Member Portal**

For family members monitoring a loved one's wellbeing remotely.

- Wellness stat cards: avg mood, lonely days, active days, total logs
- AI-generated weekly summary (Claude analyzes 7-day patterns)
- Full mood log history with visual progress bars
- Loneliness alert with action suggestion (>2 lonely days in 7)
- "Encourage check-in" prompt if no recent activity

**Caregiver Portal**

For professional or personal caregivers managing care plans.

- Reminder creation, editing, deletion
- Care note / handoff log with timestamps
- Crisis and loneliness alerts at top of dashboard
- Progress overview: total logs, avg mood, low/high mood day counts

### H.A.V.E.N Memory System
```json
{
  "name": "John",
  "conditions": "Mild cognitive impairment, social isolation",
  "favoriteTopics": "Fishing, family stories, gardening",
  "importantPeople": "Daughter Sarah, grandson Tommy",
  "memories": [
    { "year": "1975", "event": "First job at the shipyard" },
    { "year": "1982", "event": "Married Margaret" },
    { "year": "2019", "event": "Started the garden on the back porch" }
  ]
}
```
H.A.V.E.N references these naturally:
> "You mentioned you built the house on Maple Street in 1995. Did you have a garden there too?"

### Multi-Agent Architecture
| Agent | Role |
|---|---|
| Master Agent | Routes to the right specialist |
| Companion Agent | Empathy, dialogue, natural conversation |
| Cognitive Assistant | Memory support, reminders, routines |
| Wellness Agent | Mood tracking, loneliness detection |
| Safety Agent | Crisis detection, escalation, 988 |

### Safety & Crisis Design
- Detects statements indicating distress or crisis intent
- Responds with compassion and offers 988 or family contact
- Encourages human connection — H.A.V.E.N is a bridge, not a replacement
- Loneliness patterns flagged after 3+ days → alert to family/caregiver
- Never positions AI as the user's only support

---

## 💬 Microsoft Teams Live Support

Floating action button (bottom-right) on **both platforms**.

| Feature | Detail |
|---|---|
| Agents | 4: Accessibility Support, H.A.V.E.N/TBI Navigator, Crisis Response, General |
| Urgency | Normal / Urgent / Crisis (color-coded) |
| ADA modal | Keyboard trap, ESC close, focus restore, `role="dialog"` |
| Ticket history | Persisted to sessionStorage |
| Teams webhook | Adaptive Card with facts + action button |
| Email | Gmail via Nodemailer |

**Setup:**
```bash
# backend/.env
TEAMS_WEBHOOK_URL=https://outlook.office.com/webhook/...
SUPPORT_EMAIL=you@gmail.com
SUPPORT_PASS=xxxx xxxx xxxx xxxx  # 16-char Gmail app password
```
Replace `teamsLink` values in `SUPPORT_AGENTS` array with your actual Teams meeting URLs.

---

## 🔐 Environment Variables

| Variable | Required | Description |
|---|---|---|
| `PORT` | No | API port (default: 3001) |
| `SUPPORT_EMAIL` | Email | Gmail sender address |
| `SUPPORT_PASS` | Email | Gmail 16-char app password |
| `TEAMS_WEBHOOK_URL` | Teams | Incoming webhook URL |
| `ALLOWED_ORIGIN` | Production | CORS allowed origin |
| `DB_PATH` | No | SQLite file path |

---

## ♿ Accessibility

- **WCAG 2.1 AA** compliant
- **ADA Section 508** aligned
- All modals: keyboard trap, ESC, focus restore, `role="dialog"` + `aria-modal`
- `aria-live` on AI chat, alerts, dynamic content
- High-contrast mode (`forced-colors: active`)
- Reduced motion respected
- All interactive elements `focus-visible` outlined
- Crisis resources (988, 741741) accessible without login
- Simple navigation — no complex passwords for cognitive users

---

## 🏗️ Tech Stack

| Layer | Tech |
|---|---|
| Frontend | React 18, CSS custom properties |
| Fonts | DM Serif Display, DM Sans, Space Mono |
| AI | Anthropic Claude `claude-sonnet-4-20250514` (streaming) |
| Backend | Node.js 18+ / Express 4 |
| Database | SQLite → Supabase (production) |
| Notifications | Nodemailer + Teams Adaptive Card |
| PWA | Service Worker, Web App Manifest, Background Sync |
| Deploy | Any static host + optional Node API |

---

## 📋 Roadmap Reference

| Phase | Delivered |
|---|---|
| Phase 1 | Auth · AI Chat · Memory · Onboarding |
| Phase 2 | Reminders · Mood tracking · Activity suggestions |
| Phase 3 | Family portal · Caregiver portal · Teams alerts · Escalation |
| Phase 4 | Multi-agent system · Life story timeline · Analytics |

---

## 📞 Crisis Resources

- **988 Suicide & Crisis Lifeline** — Call or text 988
- **Crisis Text Line** — Text HOME to 741741
- **BIAUSA** — biausa.org
- **Family Caregiver Alliance** — caregiver.org
- **NAMI Helpline** — 1-800-950-NAMI

---

© 2025 GuardiansCall · SentinelHaven · All rights reserved  
*"Life is what you put into it."*
