IF NOT EXISTS (SELECT * FROM sys.schemas WHERE name = 'test')
BEGIN
    EXEC('CREATE SCHEMA test');
END

IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'test' AND TABLE_NAME = 'TestTable')
BEGIN
    CREATE TABLE test.TestTable (
        Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
        NumberValue INT,
        StringValue VARCHAR(255)
    );
END

-- Add test data
INSERT INTO Test.TestTable (NumberValue, StringValue) VALUES
(252, 'randomString'), (555, 'test'), (999999, 'very good testing')
