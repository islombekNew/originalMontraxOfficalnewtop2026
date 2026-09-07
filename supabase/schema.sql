-- MONTRAX CMS — Supabase sxemasi
-- Supabase Dashboard → SQL Editor → shu faylni to'liq nusxalab "Run" bosing.

-- ─── 1. Kontent jadvali ────────────────────────────────────────────────────
create table if not exists public.cms_docs (
  key        text primary key,
  value      jsonb       not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.cms_docs enable row level security;

-- Sayt (anon kalit bilan) faqat o'qiydi.
drop policy if exists "cms_docs public read" on public.cms_docs;
create policy "cms_docs public read"
  on public.cms_docs for select
  using (true);

-- Yozish faqat service_role orqali (u RLS'ni chetlab o'tadi) — admin panel shuni ishlatadi.
-- Shu sababli anon uchun insert/update/delete siyosati ATAYLAB yo'q.

-- ─── 2. Media uchun storage bucket ─────────────────────────────────────────
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do update set public = true;

drop policy if exists "media public read" on storage.objects;
create policy "media public read"
  on storage.objects for select
  using (bucket_id = 'media');

-- Yuklash/o'chirish ham service_role orqali bo'ladi.
