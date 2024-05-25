dotnet ef database update

grate --folders=./grate/migrations \
--connectionstring="Server=localhost;Database=MapApplication;Trusted_Connection=True;TrustServerCertificate=True;" \
--silent=true \
--transaction=true \
--warnandignoreononetimescriptchanges=true
