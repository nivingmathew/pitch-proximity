## Day 1 - Sprint 1 (Card 1: Spring Boot & PostgreSQL Setup)

### Goal
Set up the monorepo architecture, generate the Spring Boot 4 / Java 25 backend template, and establish a local PostgreSQL database container via Docker Compose.

### What Was Built Today
* Structured the repository into `backend/` and `frontend/` monorepo folders.
* Configured a root `.gitignore` to protect sensitive files and ignore compiled assets.
* Wrote `docker-compose.yml` to spin up PostgreSQL 16 on port `5432` using local `.env` credentials.
* Configured `application.yaml` and successfully started `BackendApplication.java` connected to the active database.

---

## Day 1 - Sprint 1 (Card 2: Flyway & Database Version Control)

### Goal
Implement automated database version control and seed the database with initial gameplay data so the game is playable immediately.

### What Was Built Today
* Added `flyway-core` and `flyway-database-postgresql` dependencies to `pom.xml`.
* Locked down Hibernate by setting `ddl-auto: validate` in `application.yaml`, officially transferring schema management ownership to Flyway.
* Created the `V1__init_schema.sql` migration script inside `src/main/resources/db/migration/`.
* Designed the initial `football_events` table architecture (`id`, `event_description`, `event_year`) and seeded it with 20 historical football events.
* Successfully ran the Spring Boot application, verifying that Flyway executed the V1 script and populated the PostgreSQL container.

---

## Day 2 - Sprint 1 (Card 3: Entity, Repository & REST API)

### Goal
Map the PostgreSQL `football_events` schema to a Java JPA Entity, construct a native random query repository, and expose a REST endpoint for the React client.

### What Was Built Today
* Created `FootballEvent.java` entity class matching the Flyway schema with `Integer` ID primary keys.
* Built `FootballEventRepository.java` extending `JpaRepository` with a custom native PostgreSQL query (`ORDER BY RANDOM() LIMIT 1`) to fetch random trivia events.
* Implemented `QuestionController.java` with `@CrossOrigin` support, exposing the `/api/question/random` endpoint.
* Verified end-to-end data flow: HTTP GET requests successfully fetch random football questions from PostgreSQL via Spring Boot.

---

## Day 2 - Sprint 1 (Card 4: React UI Setup & Slider Component)

### Goal
Initialize the React frontend application using Vite, clean out starter boilerplate, and construct a mobile-first slider UI for numerical year inputs.

### What Was Built Today
* Generated the React 18 / Vite frontend inside the `frontend/` monorepo directory.
* Built the core `<input type="range">` slider component driven by React state (`useState`), bounded between 1990 and 2026.
* Verified real-time client-side rendering as slider coordinates update dynamically on user input.