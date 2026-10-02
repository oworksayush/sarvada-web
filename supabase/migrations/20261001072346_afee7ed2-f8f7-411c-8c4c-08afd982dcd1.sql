create type public.app_role as enum ('admin','user');
create table public.user_roles (id uuid primary key default gen_random_uuid(), user_id uuid references auth.users(id) on delete cascade not null, role app_role not null, unique(user_id, role));
grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;
create or replace function public.has_role(_user_id uuid, _role app_role) returns boolean language sql stable security definer set search_path = public as $$ select exists (select 1 from public.user_roles where user_id = _user_id and role = _role) $$;
create policy "Users read own roles" on public.user_roles for select to authenticated using (auth.uid() = user_id);

create table public.enquiries (
  id uuid primary key default gen_random_uuid(),
  full_name text not null check (char_length(full_name) between 1 and 120),
  phone text not null check (char_length(phone) between 6 and 25),
  email text check (email is null or char_length(email) <= 200),
  interest text not null check (interest in ('project_details','site_visit','sarvada_club')),
  preferred_date date,
  message text check (message is null or char_length(message) <= 2000),
  consent boolean not null check (consent = true),
  created_at timestamptz not null default now()
);
grant insert on public.enquiries to anon, authenticated;
grant select on public.enquiries to authenticated;
grant all on public.enquiries to service_role;
alter table public.enquiries enable row level security;
create policy "Anyone can submit enquiry" on public.enquiries for insert to anon, authenticated with check (consent = true);
create policy "Admins read enquiries" on public.enquiries for select to authenticated using (public.has_role(auth.uid(), 'admin'));