IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'MapApplication')
BEGIN
    CREATE DATABASE [MapApplication]
END