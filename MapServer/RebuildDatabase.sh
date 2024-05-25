# Step 1: Drop and create the database using Grate
grate --folders=./grate/initDb \
--connectionstring="Server=localhost;Database=master;Trusted_Connection=True;TrustServerCertificate=True;" \
--silent=true \
--transaction=false \
--warnononetimescriptchanges \

# Step 2: Run Entity Framework migrations to create the database and apply EF migrations
dotnet ef database update

# Step 3: Run Grate migrations to apply remaining scripts
grate --folders=./grate/migrations \
--connectionstring="Server=localhost;Database=MapApplication;Trusted_Connection=True;TrustServerCertificate=True;" \
--silent=true \
--transaction=true \
--warnononetimescriptchanges
