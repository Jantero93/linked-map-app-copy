IF NOT EXISTS (
  SELECT
    *
  FROM
    INFORMATION_SCHEMA.TABLES
  WHERE
    TABLE_SCHEMA = 'map'
    AND TABLE_NAME = 'Location'
) BEGIN CREATE TABLE MAP.Location (
  Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID() NOT NULL,
  Street VARCHAR(255) NOT NULL,
  StreetNumber NVARCHAR(255) NOT NULL,
  Longitude DECIMAL(12, 9) NOT NULL,
  Latitude DECIMAL(12, 9) NOT NULL,
  Suburb VARCHAR(255) NULL,
  City VARCHAR(255) NOT NULL,
  PostalCode NVARCHAR(127) NULL,
);

END