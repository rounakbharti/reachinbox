// src/config/playbookSnippets.ts
export interface Snippet { id: string; text: string }

export const PLAYBOOK_SNIPPETS: Snippet[] = [
  {
    id: 'product-description',
    text: `
ReachInbox is an AI‑driven, all‑in‑one cold‑outreach platform.
With a single prompt, it discovers and verifies high‑intent leads across email, LinkedIn, Twitter, and phone.
It enriches leads with firmographic data, crafts personalized sequences, and notifies you in real‑time whenever a prospect engages.
Never miss a hot lead—automate the heavy lifting so you can focus on closing deals.
`.trim()
  },
  {
    id: 'agenda-interested',
    text: `
If a lead expresses interest:
1. Thank them.
2. Restate ReachInbox’s core value.
3. Share your Calendly link (e.g. https://cal.com/example) or propose time slots.
4. Offer any pre‑meeting materials.
`.trim()
  },
  {
    id: 'agenda-meeting-booked',
    text: `
When a meeting is booked:
1. Confirm date, time, and format.
2. Provide the call link.
3. Ask if they need materials or topics to cover.
4. Express excitement to connect.
`.trim()
  },
  {
    id: 'agenda-not-interested',
    text: `
If not interested:
1. Acknowledge politely.
2. Thank them for their time.
3. Leave the door open (“Feel free to reach out later.”).
4. Sign off courteously.
`.trim()
  },
  {
    id: 'agenda-spam',
    text: `
If it’s spam or irrelevant:
1. Optionally send a brief acknowledgment.
2. Unsubscribe or block if appropriate.
3. Otherwise, no reply is fine.
4. Keep it extremely short.
`.trim()
  },
  {
    id: 'agenda-out-of-office',
    text: `
If out of office:
1. Acknowledge (“Hope you enjoy your time away!”).
2. Offer to follow up at a future date.
3. Remind them of your value proposition.
4. Sign off warmly.
`.trim()
  },
  {
    id: 'tone-guidelines',
    text: `
Tone & style:
– Professional yet friendly.
– Concise (<150 words).
– Clear call‑to‑action.
– Personalize using the lead’s name and company.
`.trim()
  },
];
