# Dockerfile.sql
FROM mcr.microsoft.com/mssql/server:2022-latest

ENV ACCEPT_EULA=Y

# Expects SA_PASSWORD to be passed as an argument
ARG SA_PASSWORD
ENV SA_PASSWORD=${SA_PASSWORD}

EXPOSE 1433

CMD /opt/mssql/bin/sqlservr
