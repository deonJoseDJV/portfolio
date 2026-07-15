-- ============================================================
--  Portfolio database schema
--  Run this in your Supabase project:  Dashboard → SQL Editor → New query → paste → Run
-- ============================================================

-- ---------- BOOKINGS (Book a Call) ----------
create table if not exists public.bookings (
  id               uuid primary key default gen_random_uuid(),
  name             text not null,
  email            text not null,
  booking_date     date not null,
  booking_time     text not null,
  booking_datetime timestamptz,
  status           text not null default 'confirmed',
  meeting_link     text,
  created_at       timestamptz not null default now(),
  -- Prevents two people grabbing the same slot (real double-booking guard)
  unique (booking_date, booking_time)
);

alter table public.bookings enable row level security;

-- Anyone can see which slots are taken (only times are read by the app)
create policy "bookings_select_anon"
  on public.bookings for select
  to anon, authenticated
  using (true);

-- Anyone can create a booking
create policy "bookings_insert_anon"
  on public.bookings for insert
  to anon, authenticated
  with check (true);


-- ---------- GUESTBOOK ----------
create table if not exists public.guestbook (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  email       text,
  message     text not null,
  avatar_url  text,
  created_at  timestamptz not null default now()
);

alter table public.guestbook enable row level security;

-- Everyone can read the wall
create policy "guestbook_select_all"
  on public.guestbook for select
  to anon, authenticated
  using (true);

-- Only signed-in users can post
create policy "guestbook_insert_authenticated"
  on public.guestbook for insert
  to authenticated
  with check (true);
