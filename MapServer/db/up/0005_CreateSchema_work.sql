IF NOT EXISTS (
  SELECT
    *
  FROM
    sys.schemas
  WHERE
    name = 'work'
) BEGIN EXEC('CREATE SCHEMA work');

END