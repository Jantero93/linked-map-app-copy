IF NOT EXISTS (
  SELECT
    *
  FROM
    sys.databases
  WHERE
    name = 'MapApplication'
) BEGIN CREATE DATABASE [MapApplication] COLLATE Finnish_Swedish_CI_AS;

END