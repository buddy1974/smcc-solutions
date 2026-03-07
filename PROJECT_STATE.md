# PROJECT STATE — SMCC (School of Marriage Counseling & Coaching)

Last Updated: 2026-02-22

---

## 1. Hosting

Frontend:
- Next.js 14 (App Router)
- Hosted on Vercel

Backend:
- Next.js API Routes (/api/*)
- Runs on Vercel Serverless Functions

Deployment Platform:
- GitHub → Vercel (auto deploy)

---

## 2. Canonical Domain

Production URL:
https://smcc.solutions

API Base:
https://smcc.solutions/api

---

## 3. Backend Architecture

Framework:
Next.js App Router + Route Handlers

Active API Routes:

- POST /api/payunit/initiate
- POST /api/payunit/webhook
- POST /api/assessment
- POST /api/crm/lead
- POST /api/delphi/chat
- POST /api/delphi-lead (stub)
- GET  /api/admin/metrics
- POST /api/appointments
- POST /api/automation/followup
- POST /api/track-event

Orphaned Route:
- POST /api/submit (not currently triggered by frontend)

---

## 4. Environment Variables (Required)

Server-side only:

GMAIL_USER
GMAIL_APP_PASSWORD
WA_PHONE
WA_CALLMEBOT_KEY
PAYUNIT_API_KEY
PAYUNIT_API_USER
PAYUNIT_API_PASSWORD
OPENAI_API_KEY
ADMIN_SECRET
SUPABASE_URL
SUPABASE_SERVICE_ROLE_KEY

⚠ NEXT_PUBLIC_ADMIN_SECRET must be removed (security issue).

---

## 5. Messaging

WhatsApp:
- CallMeBot integration
- Outbound alerts only
- Not unified across ecosystem

Email:
- Gmail SMTP via Nodemailer

---

## 6. Payments

Provider:
PayUnit

Status:
- KYC Pending
- Webhook partially implemented
- No signature validation
- No Supabase enrollment confirmation pipeline

---

## 7. Database

Provider:
Supabase

Used For:
- Leads
- Appointments
- Chat sessions
- Admin metrics

Not yet unified for:
- Enrollment confirmation pipeline

---

## 8. Security Status

Admin Protection:
❌ Insecure (NEXT_PUBLIC_ADMIN_SECRET exposed in browser)

Webhook Validation:
❌ No signature verification

Rate Limiting:
❌ Not implemented

---

## 9. Known Issues

- /api/submit orphaned
- Admin token exposed to client
- No rate limiting
- PayUnit webhook accepts unsigned POST
- Phone number hardcoded multiple places

---

## 10. Next Architectural Step

1. Fix admin auth (remove NEXT_PUBLIC_ usage)
2. Normalize enrollment pipeline (webhook becomes source of truth)
3. Add webhook signature validation
4. Add rate limiting to API routes
5. Centralize constants (phone, emails)