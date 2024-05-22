#!/bin/bash

# Function to print messages only if not silent
function print_message() {
  if [ "$silent" != true ]; then
    echo -e "$1"
  fi
}

# Parse input arguments
silent=false
for arg in "$@"; do
  case $arg in
    --silent)
      silent=true
      shift
    ;;
    *)
      shift
    ;;
  esac
done

print_message '\033[36m==================================================================================================================\033[0m'
print_message '\033[36mExecuting order: drop database, rebuild identity-related tables with Entity Framework, run Grate scripts.\033[0m'
print_message '\033[36mEntity Framework is ONLY to manage identity-related tables.\033[0m'
print_message '\033[36mThere are tables created by Grate which relate to OpenIddict tables, so Entity Framework must be executed first.\033[0m'
print_message '\033[36m==================================================================================================================\033[0m\n'

grate --silent=true --connectionstring="Server=localhost;Database=MapApplication;Trusted_Connection=True;TrustServerCertificate=True;" --drop

# Check if Grate command succeeded
if [ $? -ne 0 ]; then
  print_message "Grate migration failed"
  print_message "Rebuild failed"
  print_message '\033[32mDropping (only) database with Grate failed.\033[0m'
  exit 1
else
  print_message '\033[32mDropped database successfully.\033[0m'
fi

print_message '\033[36m======================================================\033[0m'
print_message '\033[36mExecuting Entity Framework Migrations\033[0m'
print_message '\033[36m======================================================\033[0m\n'

# Run Entity Framework migrations
dotnet ef database update

# Check if EF database update succeeded
if [ $? -ne 0 ]; then
  print_message "EF database update failed"
  print_message "Rebuild failed"
  exit 1
else
  print_message '\n\033[32mEntity Framework migrations applied successfully.\033[0m'
fi

print_message '\n\033[36mExecuting Grate Migrations\033[0m\n'

# Run Grate migrations only if EF migrations are successful
grate --folders=./db \
--connectionstring="Server=localhost;Database=MapApplication;Trusted_Connection=True;TrustServerCertificate=True;" \
--silent=true \
--transaction=true \

# Check if Grate command succeeded
if [ $? -ne 0 ]; then
  print_message "Grate migration failed"
  print_message "Rebuild failed"
  exit 1
else
  print_message '\033[32mGrate migrations applied successfully.\033[0m'
fi

print_message '\n\033[36m================================================\033[0m'
print_message '\033[36mDatabase rebuild completed successfully.\033[0m'
print_message '\033[36m================================================\033[0m'
