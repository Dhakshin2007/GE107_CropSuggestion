create table environment_data (
  id bigint generated always as identity primary key,
  device_id text,
  temperature float,
  humidity float,
  light int,
  soil int,
  created_at timestamp default now()
);
