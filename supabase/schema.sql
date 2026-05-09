-- Create tables + policies for Glam
-- Run this in Supabase SQL editor (or via supabase CLI migration).

create extension if not exists pgcrypto;

-- Public profile table synced from auth.users
create table if not exists public.users (
  id uuid primary key references auth.users (id) on delete cascade,
  email text unique,
  name text,
  avatar_url text,
  is_vip boolean not null default false,
  created_at timestamptz not null default now()
);

-- Sync new auth.users rows into public.users
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.users (id, email, name, avatar_url)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'name', ''),
    new.raw_user_meta_data->>'avatar_url'
  )
  on conflict (id) do update
    set email = excluded.email,
        name = excluded.name,
        avatar_url = excluded.avatar_url;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

-- Inventory
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users (id) on delete cascade,
  name text not null,
  brand text,
  category text,
  color text,
  photo_url text,
  created_at timestamptz not null default now()
);

-- Looks
create table if not exists public.looks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users (id) on delete cascade,
  name text not null,
  theme text,
  products_used jsonb not null default '[]'::jsonb,
  steps jsonb not null default '[]'::jsonb,
  is_vip boolean not null default false,
  created_at timestamptz not null default now()
);

-- Friends (directed edge)
create table if not exists public.friends (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users (id) on delete cascade,
  friend_id uuid not null references public.users (id) on delete cascade,
  created_at timestamptz not null default now(),
  constraint friends_unique_pair unique (user_id, friend_id),
  constraint friends_no_self check (user_id <> friend_id)
);

-- Events
create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  creator_id uuid not null references public.users (id) on delete cascade,
  name text not null,
  theme text,
  date timestamptz,
  invited_users jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);

-- RLS
alter table public.users enable row level security;
alter table public.products enable row level security;
alter table public.looks enable row level security;
alter table public.friends enable row level security;
alter table public.events enable row level security;

-- users policies
drop policy if exists "users can view own profile" on public.users;
create policy "users can view own profile"
on public.users
for select
using (auth.uid() = id);

drop policy if exists "users can update own profile" on public.users;
create policy "users can update own profile"
on public.users
for update
using (auth.uid() = id)
with check (auth.uid() = id);

-- products policies
drop policy if exists "products are owner-readable" on public.products;
create policy "products are owner-readable"
on public.products
for select
using (auth.uid() = user_id);

drop policy if exists "products are owner-writable" on public.products;
create policy "products are owner-writable"
on public.products
for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

-- looks policies
drop policy if exists "looks are owner-readable" on public.looks;
create policy "looks are owner-readable"
on public.looks
for select
using (auth.uid() = user_id);

drop policy if exists "looks are owner-writable" on public.looks;
create policy "looks are owner-writable"
on public.looks
for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

-- friends policies
drop policy if exists "friends are owner-readable" on public.friends;
create policy "friends are owner-readable"
on public.friends
for select
using (auth.uid() = user_id);

drop policy if exists "friends are owner-writable" on public.friends;
create policy "friends are owner-writable"
on public.friends
for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

-- events policies
drop policy if exists "events are creator-readable" on public.events;
create policy "events are creator-readable"
on public.events
for select
using (auth.uid() = creator_id);

drop policy if exists "events are creator-writable" on public.events;
create policy "events are creator-writable"
on public.events
for all
using (auth.uid() = creator_id)
with check (auth.uid() = creator_id);

