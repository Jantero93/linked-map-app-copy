IF EXISTS (
  SELECT
    *
  FROM
    sys.databases
  WHERE
    name = 'MapApplication'
) BEGIN DROP DATABASE [MapApplication]
END