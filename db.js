/**
 * GuardiansCall — SQLite Database Layer
 * Swap for Supabase/PostgreSQL in production by replacing these methods
 */
import sqlite3 from 'sqlite3';
import { promisify } from 'util';

const _db = new sqlite3.Database(process.env.DB_PATH || './support.db');

// Promisify sqlite3 methods
const run = promisify(_db.run.bind(_db));
const all = promisify(_db.all.bind(_db));
const get = promisify(_db.get.bind(_db));

// ── Schema migration ──
await run(`
  CREATE TABLE IF NOT EXISTS tickets (
    id        INTEGER PRIMARY KEY AUTOINCREMENT,
    name      TEXT NOT NULL,
    email     TEXT NOT NULL,
    issue     TEXT NOT NULL,
    agent     TEXT DEFAULT 'general',
    urgency   TEXT DEFAULT 'normal',
    status    TEXT DEFAULT 'open',
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

export const db = {
  async createTicket({ name, email, issue, agent, urgency }) {
    await run(
      `INSERT INTO tickets (name, email, issue, agent, urgency) VALUES (?, ?, ?, ?, ?)`,
      [name, email, issue, agent, urgency]
    );
    const row = await get('SELECT last_insert_rowid() as id');
    return row.id;
  },
  async getTickets(limit = 50) {
    return all(
      `SELECT id, name, email, issue, agent, urgency, status, timestamp
       FROM tickets ORDER BY timestamp DESC LIMIT ?`,
      [limit]
    );
  },
  async updateStatus(id, status) {
    return run(`UPDATE tickets SET status = ? WHERE id = ?`, [status, id]);
  },
};
