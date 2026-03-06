-- SMCC Student Dashboard: add student progress columns
-- Run this in your Supabase SQL editor (Project Settings → SQL Editor)

alter table enrollments
  add column if not exists student_name           text,
  add column if not exists progress               integer default 0,
  add column if not exists certificate_issued     boolean default false,
  add column if not exists certificate_issued_at  timestamptz;
