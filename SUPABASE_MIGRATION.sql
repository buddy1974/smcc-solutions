-- SMCC Enrollments Table
-- Run this in your Supabase SQL editor before deploying the enrollment system.

create table if not exists enrollments (
  id                    uuid          default gen_random_uuid() primary key,
  reference             text          unique not null,
  program               text          not null,          -- 'cohort1' | '7pillars'
  program_name          text          not null,
  amount                integer       not null,
  status                text          default 'initiated'
                                      check (status in ('initiated', 'confirmed', 'cancelled')),
  payunit_transaction_id text,
  checked_in            boolean       default false,
  checked_in_at         timestamptz,
  source                text,                            -- UTM / referral source
  created_at            timestamptz   default now()
);

-- Index for quick lookups
create index if not exists enrollments_reference_idx on enrollments (reference);
create index if not exists enrollments_status_idx     on enrollments (status);
create index if not exists enrollments_created_at_idx on enrollments (created_at desc);

-- Optional: enable RLS and add a service-role policy
-- alter table enrollments enable row level security;
