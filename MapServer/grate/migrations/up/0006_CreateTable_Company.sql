IF NOT EXISTS (
  SELECT
    *
  FROM
    INFORMATION_SCHEMA.TABLES
  WHERE
    TABLE_SCHEMA = 'work'
    AND TABLE_NAME = 'Company'
) BEGIN CREATE TABLE WORK.Company (
  Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
  Name VARCHAR(127) NOT NULL,
  EstablishmentDate DATE NOT NULL,
  ClosureDate DATE NULL,
  LocationId UNIQUEIDENTIFIER NOT NULL,
  CONSTRAINT FK_Company_Location FOREIGN KEY (LocationId) REFERENCES MAP.Location(Id)
);

END
