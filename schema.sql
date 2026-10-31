-- PNG MK survey: anonymous, insert-only responses + a key-protected results function.
create extension if not exists pgcrypto with schema extensions;

create table if not exists public.mk_survey_responses (
  id           bigint generated always as identity primary key,
  client_id    uuid not null unique,
  version      text not null,
  answers      jsonb not null,
  email        text,
  duration_sec integer,
  created_at   timestamptz not null default now(),
  constraint answers_is_object check (jsonb_typeof(answers) = 'object'),
  constraint answers_size check (pg_column_size(answers) < 60000),
  constraint email_len check (email is null or length(email) <= 200),
  constraint version_len check (length(version) <= 40)
);

alter table public.mk_survey_responses enable row level security;

-- Anyone with the link may add a response; nobody can read, change or delete through the API.
drop policy if exists "anon can insert" on public.mk_survey_responses;
create policy "anon can insert" on public.mk_survey_responses
  for insert to anon, authenticated with check (true);

revoke all on public.mk_survey_responses from anon, authenticated;
grant insert (client_id, version, answers, email, duration_sec) on public.mk_survey_responses to anon, authenticated;

-- Results key lives as a hash in a table the API cannot reach.
create table if not exists public.mk_survey_admin (
  id int primary key default 1 check (id = 1),
  key_hash text not null
);
alter table public.mk_survey_admin enable row level security;
revoke all on public.mk_survey_admin from anon, authenticated;

create or replace function public.mk_survey_results(p_key text)
returns jsonb
language plpgsql
security definer
set search_path = public, extensions
as $$
begin
  if not exists (
    select 1 from public.mk_survey_admin
    where key_hash = encode(extensions.digest(p_key, 'sha256'), 'hex')
  ) then
    perform pg_sleep(1);
    raise exception 'invalid key' using errcode = '28000';
  end if;
  return coalesce((
    select jsonb_agg(jsonb_build_object(
      'id', id, 'created_at', created_at, 'version', version,
      'answers', answers, 'email', email, 'duration_sec', duration_sec) order by id)
    from public.mk_survey_responses), '[]'::jsonb);
end $$;

revoke all on function public.mk_survey_results(text) from public;
grant execute on function public.mk_survey_results(text) to anon, authenticated;
