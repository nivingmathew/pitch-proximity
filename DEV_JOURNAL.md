## Day 1 - Sprint 1 (Card 1: Spring Boot & PostgreSQL Setup)

### Goal
Set up the monorepo architecture, generate the Spring Boot 4 / Java 25 backend template, and establish a local PostgreSQL database container via Docker Compose.

### What Was Built Today
* Structured the repository into `backend/` and `frontend/` monorepo folders.
* Configured a root `.gitignore` to protect sensitive files and ignore compiled assets.
* Wrote `docker-compose.yml` to spin up PostgreSQL 16 on port `5432` using local `.env` credentials.
* Configured `application.yaml` and successfully started `BackendApplication.java` connected to the active database.
