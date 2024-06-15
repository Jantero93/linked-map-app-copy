# LinkedIn Map Copy

**WORK IN PROGRESS**

![GitHub Last commit](https://img.shields.io/github/last-commit/Jantero93/linked-map-app-copy)
![GitHub Commit activity](https://img.shields.io/github/commit-activity/m/Jantero93/linked-map-app-copy)
![Total Lines of Code](https://sloc.xyz/github/Jantero93/linked-map-app-copy)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/Jantero93/linked-map-app-copy)

The purpose of this program is to be similar to LinkedIn, allowing users to place job positions on a map and view people's work experiences at those job positions. Initially, all visible information (companies, work experiences) is intended to be public.

The program also includes a timeline component. When a company is clicked, the timeline shows the people who have worked there, or if a person is selected, it shows their work experiences across different job positions.

The application aims to include a feed similar to LinkedIn, Facebook, and other platforms, displaying posts, messages, etc., from people who are friends or connected with each other. There will also be an option for private conversations between individuals or even group chats.

### Production
First version on production probably incoming when users can add companies and search them from map and click information from company icon.

## Key Technologies Used

### Client:
- TypeScript React
- Redux
- MUI
- Leaflet

### Server:
- .NET Core
- Dapper
- OpenIddict
- Entity Framework Core

### Database:
- SQL Server
- Grate

### Other:
- Docker
- Nginx (for production)
- AWS (for production)

## Features
**Done**
> - Add Company
> - Register user & login
> - Basic layout for client, basic backend structure
> - Structure for database migrations (grate)

**Not implemented yet**
> - Show added companies on map
> - Add work experience
> - Company and person search
> - Add timeline component (shows person's work experiences for person or company's for people work experiences)
> - Make connection / friend requests between persons
> - Private chat between persons
> - Facebook & LinkedIn like post feed
> - Small frontend improvements (e.g. better light theme etc fine tuning)

## High level architecture
...coming soon

## Configuration
...coming soon

## Starting the Entire Application with Docker
...coming soon

## Starting the Server Separately
...coming soon

## Starting the Client Separately
...coming soon
