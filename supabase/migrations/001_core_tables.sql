-- ============================================================
-- SMCC — Core Data Architecture
-- Run in: Supabase → SQL Editor
-- ============================================================

-- Drop old tables if they exist from previous MVP iteration
drop table if exists leads cascade;
drop table if exists events cascade;

-- ── 1. leads ─────────────────────────────────────────────────────────────────
-- Every serious inquiry captured by Delphi or the application form.
create table leads (
  id            uuid        default gen_random_uuid() primary key,
  session_id    text        unique,          -- links to chat_sessions
  full_name     text,
  email         text,
  phone         text,
  language      text,                        -- en / fr
  interest_type text,                        -- advisory / crisis / training
  crisis_score  integer     default 0,       -- 0–100 (client scale)
  source        text,                        -- chatbot / form
  created_at    timestamp   default now()
);

-- ── 2. appointments ──────────────────────────────────────────────────────────
-- Booked advisory sessions (Google Calendar or manual).
create table appointments (
  id              uuid        default gen_random_uuid() primary key,
  lead_id         uuid        references leads(id),
  scheduled_time  timestamp,
  calendar_source text,                      -- google
  status          text        default 'booked',  -- booked / completed / cancelled
  created_at      timestamp   default now()
);

-- ── 3. chat_sessions ─────────────────────────────────────────────────────────
-- One row per Delphi chat session (keyed by client-generated UUID).
create table chat_sessions (
  id           uuid        default gen_random_uuid() primary key,
  session_id   text        not null unique,
  language     text,
  crisis_score integer     default 0,
  escalated    boolean     default false,
  created_at   timestamp   default now()
);

-- ── 4. chat_messages ─────────────────────────────────────────────────────────
-- Full message history per session.
create table chat_messages (
  id         uuid        default gen_random_uuid() primary key,
  session_id text        not null,
  role       text        not null,           -- user / assistant
  message    text,
  created_at timestamp   default now()
);

-- ── 5. events (keep for /api/track-event) ────────────────────────────────────
create table events (
  id         uuid        default gen_random_uuid() primary key,
  event      text,
  meta       jsonb,
  created_at timestamp   default now()
);

-- ── Indexes for fast lookups ──────────────────────────────────────────────────
create index on chat_messages (session_id);
create index on chat_messages (created_at desc);
create index on chat_sessions (session_id);
create index on leads (session_id);
create index on leads (created_at desc);
