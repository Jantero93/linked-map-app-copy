FROM mcr.microsoft.com/dotnet/aspnet:8.0-alpine AS base
WORKDIR /app
EXPOSE 5000

FROM mcr.microsoft.com/dotnet/sdk:8.0-alpine AS build
WORKDIR /src
COPY ["MapServer.csproj", "./"]
RUN dotnet restore "MapServer.csproj"
COPY . .
RUN dotnet build "MapServer.csproj" -c Release -o /app/build

FROM build as publish
RUN dotnet publish "MapServer.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
copy --from=publish /app/publish .
ENTRYPOINT ["dotnet", "MapServer.dll"]
