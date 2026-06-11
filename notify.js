/**
 * GuardiansCall — Notification Service
 * Sends email + Microsoft Teams webhook on new support ticket
 */
import nodemailer from 'nodemailer';

const AGENT_NAMES = {
  accessibility: 'Accessibility Support',
  tbi:           'TBI Navigator',
  crisis:        'Crisis Response',
  general:       'General Support',
};

export async function notify({ id, name, email, issue, agent, urgency }) {
  const agentName  = AGENT_NAMES[agent] || agent;
  const urgencyTag = urgency.toUpperCase();
  const subject    = `[${urgencyTag}] New GuardiansCall Support Request #${id} — ${name}`;
  const body       = `
GuardiansCall Support Ticket #${id}
================================
Urgency : ${urgencyTag}
Name    : ${name}
Email   : ${email}
Agent   : ${agentName}
Time    : ${new Date().toLocaleString()}

Issue:
------
${issue}
  `.trim();

  // ── Email notification ──
  if (process.env.SUPPORT_EMAIL && process.env.SUPPORT_PASS) {
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: { user: process.env.SUPPORT_EMAIL, pass: process.env.SUPPORT_PASS },
      });
      await transporter.sendMail({
        from:    process.env.SUPPORT_EMAIL,
        to:      process.env.SUPPORT_EMAIL,
        subject,
        text:    body,
      });
      console.log(`[GC Notify] Email sent for ticket #${id}`);
    } catch (e) {
      console.error('[GC Notify] Email failed:', e.message);
    }
  }

  // ── Microsoft Teams Webhook ──
  if (process.env.TEAMS_WEBHOOK_URL) {
    try {
      const urgencyColor = { normal: '00B4D8', urgent: 'F59E0B', crisis: 'EF4444' }[urgency] || '2563EB';
      const card = {
        type: 'message',
        attachments: [{
          contentType: 'application/vnd.microsoft.card.adaptive',
          content: {
            '$schema': 'http://adaptivecards.io/schemas/adaptive-card.json',
            type: 'AdaptiveCard',
            version: '1.4',
            body: [
              { type: 'TextBlock', size: 'Medium', weight: 'Bolder', text: `🛡️ GuardiansCall Support #${id}`, color: 'Accent' },
              { type: 'FactSet', facts: [
                { title: 'Name',    value: name },
                { title: 'Email',   value: email },
                { title: 'Agent',   value: agentName },
                { title: 'Urgency', value: urgencyTag },
              ]},
              { type: 'TextBlock', text: issue, wrap: true, spacing: 'Medium' },
            ],
            actions: [{
              type: 'Action.OpenUrl',
              title: 'Open in Teams',
              url: `https://teams.microsoft.com`,
            }],
          },
        }],
      };
      const { default: fetch } = await import('node-fetch');
      await fetch(process.env.TEAMS_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(card),
      });
      console.log(`[GC Notify] Teams webhook sent for ticket #${id}`);
    } catch (e) {
      console.error('[GC Notify] Teams webhook failed:', e.message);
    }
  }
}
