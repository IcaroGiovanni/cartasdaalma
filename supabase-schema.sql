-- ============================================================
-- Cartas da Alma · esquema Supabase
-- Rode UMA vez no SQL Editor do seu projeto.
-- ============================================================

-- 1) perfis (pessoas do sistema) ------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null unique,
  name text,
  role text not null default 'therapist'
    check (role in ('therapist', 'admin')),
  school_unlocked boolean not null default false,
  school_progress integer not null default 0
    check (school_progress between 0 and 4),
  prefs jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

-- 2) mensagens (chat com a criadora + suporte do admin) -------
create table if not exists public.messages (
  id bigint generated always as identity primary key,
  chat_id text not null,   -- ex.: "support:ana@email.com" ou "creator:ana@email.com"
  peer text not null,      -- e-mail do terapeuta envolvido
  side text not null check (side in ('me', 'them')),
  body text not null,
  created_at timestamptz not null default now()
);

create index if not exists messages_chat_created_idx
  on public.messages (chat_id, created_at);
create index if not exists messages_peer_idx
  on public.messages (peer);

-- mensagens em tempo real (chat com a criadora / suporte)
do $$
begin
  alter publication supabase_realtime add table public.messages;
exception
  when duplicate_object then null;
end $$;

-- 3) função auxiliar: é administrador? ------------------------
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

-- 4) cria o perfil quando o usuário nasce no Auth -------------
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'name', split_part(new.email, '@', 1))
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- 5) administrador promove/demove papéis (função protegida) ---
create or replace function public.admin_set_role(
  p_email text,
  p_role text,
  p_name text default null
)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.is_admin() then
    raise exception 'sem permissão para alterar papéis';
  end if;

  if p_role not in ('therapist', 'admin') then
    raise exception 'papel inválido';
  end if;

  update public.profiles
     set role = p_role,
         name = coalesce(p_name, name)
   where email = p_email;
end;
$$;

revoke execute on function public.admin_set_role(text, text, text) from public;
grant execute on function public.admin_set_role(text, text, text) to authenticated;

-- 6) segurança (RLS) -----------------------------------------
alter table public.profiles enable row level security;
alter table public.messages enable row level security;

drop policy if exists "le proprio perfil e admins veem todos" on public.profiles;
create policy "le proprio perfil e admins veem todos"
  on public.profiles for select to authenticated
  using (id = auth.uid() or public.is_admin());

-- usuário comum edita só o próprio perfil, e NUNCA a coluna role
-- (role só muda pela função admin_set_role, acima)
revoke update on table public.profiles from authenticated;
grant update (name, prefs, school_progress, school_unlocked)
  on table public.profiles to authenticated;

drop policy if exists "atualiza o proprio perfil" on public.profiles;
create policy "atualiza o proprio perfil"
  on public.profiles for update to authenticated
  using (id = auth.uid())
  with check (id = auth.uid());

drop policy if exists "le as proprias mensagens e admins veem todas" on public.messages;
create policy "le as proprias mensagens e admins veem todas"
  on public.messages for select to authenticated
  using (
    peer = (select email from public.profiles where id = auth.uid())
    or public.is_admin()
  );

drop policy if exists "envia mensagens nas proprias conversas" on public.messages;
create policy "envia mensagens nas proprias conversas"
  on public.messages for insert to authenticated
  with check (
    peer = (select email from public.profiles where id = auth.uid())
    or public.is_admin()
  );

-- ============================================================
-- 7) SEU PRIMEIRO ADMINISTRADOR
--    a) Authentication -> Users -> "Add user" (e-mail + senha,
--       "Auto Confirm User" = ON)
--    b) depois rode:
-- update public.profiles set role = 'admin'
--  where email = 'seu@email.com';
-- ============================================================
