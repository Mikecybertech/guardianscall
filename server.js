/**
 * GuardiansCall — Backend API Server  v1.1.0
 * Node.js + Express
 * Endpoints: /api/support (POST), /api/support/history (GET)
 * Notifications: Email (Nodemailer) + Teams Webhook
 *
 * Environment variables (.env):
 *   PORT=3001
 *   SUPPORT_EMAIL=you@example.com
 *   SUPPORT_PASS=your_gmail_app_password
 *   TEAMS_WEBHOOK_URL=https://outlook.office.com/webhook/...
 *   ALLOWED_ORIGIN=https://guardianscall.com
 */

import express    from 'express';
import cors       from 'cors';
import dotenv     from 'dotenv';
import { db }     from './db.js';
import { notify } from './notify.js';

dotenv.config();

const app  = express();
const PORT = process.env.PORT || 3001;

// ── Middleware ──
app.use(cors({ origin: process.env.ALLOWED_ORIGIN || '*' }));
app.use(express.json());
app.use((req, _res, next) => { console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`); next(); });

// ── POST /api/support — Create support ticket ──
app.post('/api/support', async (req, res) => {
  const { name, email, issue, agent, urgency = 'normal' } = req.body;

  if (!name || !email || !issue) {
    return res.status(400).json({ error: 'name, email, and issue are required' });
  }

  try {
    const id = await db.createTicket({ name, email, issue, agent, urgency });
    await notify({ id, name, email, issue, agent, urgency });
    res.json({ status: 'ok', ticketId: id });
  } catch (err) {
    console.error('[GC API] Error creating ticket:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ── GET /api/support/history — Fetch last 50 tickets ──
app.get('/api/support/history', async (req, res) => {
  try {
    const rows = await db.getTickets();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── GET /api/health ──
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', version: '1.1.0', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => console.log(`[GC] Server running on http://localhost:${PORT}`));
