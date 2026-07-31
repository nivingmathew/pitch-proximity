# pitch-proximity
PitchProximity 1v1 Trivia game

> **Project Status:** Under Active Development (Sprint 1 of 5 - Building the Walking Skeleton).
> Daily engineering logs, bugs, and architectural updates are tracked in [DEV_JOURNAL.md](./DEV_JOURNAL.md).

# ⚽ PitchProximity 1v1 Trivia

![Java 17+](https://img.shields.io/badge/Java-17%2B-orange?style=for-the-badge&logo=openjdk)
![Spring Boot 3.x](https://img.shields.io/badge/Spring%20Boot-3.x-brightgreen?style=for-the-badge&logo=springboot)
![Redis](https://img.shields.io/badge/Redis-In--Memory-red?style=for-the-badge&logo=redis)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-blue?style=for-the-badge&logo=postgresql)
![React](https://img.shields.io/badge/React.js-Mobile--First-61dafb?style=for-the-badge&logo=react)
![Docker](https://img.shields.io/badge/Docker-Containers-2496ed?style=for-the-badge&logo=docker)

> A low-latency, real-time multiplayer football trivia platform engineered with Java Spring Boot, WebSockets (STOMP), and Redis. Features continuous numerical proximity scoring, microsecond concurrency tie-breaking, state recovery over network drops, and automated human-replay fallback bots.

---

## Overview

Traditional multiple-choice trivia applications suffer from a fatal flaw: users can easily search for answers in real time. **PitchProximity** solves this by shifting to a **numerical slider interface** ($1990 - 2026$). 

Instead of choosing A, B, C, or D, players compete in 10-round head-to-head matches by sliding an answer marker to estimate historical football event years. Points are awarded based on absolute proximity ($\vert{}Guess - CorrectYear\vert{}$). 

### Key Architectural Highlights
* **Sub-Second Matchmaking:** In-memory queueing using Redis Sets.
* **Synchronized State Loops:** Server-authoritative 10-second countdowns broadcast over WebSockets.
* **Microsecond Concurrency Management:** Thread-safe tie-breaking when players lock identical answers.
* **Fault-Tolerant Reconnections:** Session preservation across page reloads and cellular drops via JWT + Redis state recovery.
* **Ghost Replay Fallbacks:** Time-series playback of historical human matches when live lobbies are empty.
* **Full Observability:** Protected Admin Dashboard providing live Redis session tracking and cache management.

---

## Game Rules & Mechanics

| Rule | Description |
| :--- | :--- |
| **Match Format** | 1v1 real-time battle consisting of **10 consecutive rounds**. |
| **Question Domain** | Historical football trivia focused on exact years ($1990 - 2026$). |
| **Round Duration** | **10 seconds** per round enforced by a server-side authoritative timer. |
| **Scoring Logic** | Points are awarded based on how close the guess is to the correct year ($\vert{}Guess - Answer\vert{}$). |
| **Lock-In Security** | Once a player clicks "Lock Answer," the selection is immutable on both client and server. |
| **Tie-Breaker Rule** | If both players guess the exact same year, the player with the earlier **microsecond server timestamp** wins the round points. |
| **Result Reveal** | Answers are revealed simultaneously at round completion via WebSocket broadcast. |

---

## Complete Tech Stack

### Backend Infrastructure
* **Language:** Java 17+
* **Framework:** Spring Boot 3.x
* **Real-Time Engine:** Spring WebSockets + STOMP / SockJS
* **Caching & Queueing:** Spring Data Redis
* **Relational Database:** PostgreSQL (Managed via Flyway Migrations)
* **Security:** Spring Security + JWT (JSON Web Tokens)
* **Data Helper:** Project Lombok

### Frontend Engine
* **Framework:** React.js (Vite)
* **Networking:** Axios (HTTP) & `@stomp/stompjs` / `sockjs-client` (WebSockets)
* **Layout:** Mobile-first responsive CSS

### Testing & DevOps
* **Containerization:** Docker Desktop & Docker Compose
* **Testing:** JUnit 5, Mockito, Testcontainers (Isolated Postgres/Redis testing)
* **Deployment:** Render/Railway (Backend Containers) & Vercel (Frontend)

---

## Core Features

### 1. Disconnect / Reconnect Safety Net (State Recovery)
Mobile network switches often drop WebSocket connections. PitchProximity handles network faults gracefully:
1. Active round states (`GameSession`) are continuously checkpointed in Redis.
2. If a user refreshes or loses cellular signal, React re-establishes the WebSocket connection passing the stored JWT.
3. The server intercepts the handshake, identifies the user's active session in Redis, and immediately transmits a `RECONNECT_STATE` payload (current round, remaining clock seconds, and existing scores) so the client resumes seamlessly without forfeiting the match.

### 2. Ghost Replay Engine (Empty Lobby Fallback)
To ensure zero waiting friction for players during off-peak hours:
* If a player waits in the Redis matchmaking queue longer than **5 seconds**, the server automatically provisions a **Ghost Bot**.
* Rather than using random math, the backend retrieves a real historical match execution from PostgreSQL (`MatchHistory` & `RoundDetail`).
* The server replays the stored human slider movements and timestamps asynchronously across the WebSocket session.

### 3. Real-Time Admin Dashboard
Exposes system health metrics via secured endpoints:
* **Live System Metrics:** Active Redis game sessions, queue size, total PostgreSQL events, and total completed matches.
* **Cache Management:** Secured administrative controls allowing cache flushes and server reset operations.

---

## License
This project is open-source and available under the MIT License.
