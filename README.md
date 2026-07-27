# KEYSTONE Backend

Backend service for **Project KEYSTONE — Field Service Management Platform**,
built for Meridian Facilities Management as part of a Zidio Development
Java Full-Stack internship engagement.

> **Status: Phase 1 — Project Foundation.**
> This repository currently contains scaffolding only: package structure,
> build configuration, environment profiles, and local infrastructure.
> No authentication, business logic, REST endpoints, or database schema
> have been implemented yet. See [Roadmap](#roadmap--future-modules) below.

---

## 1. Project Overview

KEYSTONE is the system of record for Meridian's field-service operation —
from a customer raising a request, through dispatch and on-site work, to
completion, sign-off, and reporting. The platform serves four roles:
**dispatcher**, **technician**, **manager/admin**, and **customer**, each
with a distinct view and a server-enforced set of permissions.

This repository is the **back end**: a Spring Boot REST API backed by
PostgreSQL, designed to be consumed by the existing React + TypeScript
front end (developed separately by a teammate).

---

## 2. Tech Stack

| Layer          | Technology                          |
|----------------|--------------------------------------|
| Language       | Java 21                              |
| Framework      | Spring Boot 3.5.x                    |
| Build tool     | Maven (via Maven Wrapper)            |
| Web            | Spring Web (MVC)                     |
| Persistence    | Spring Data JPA / Hibernate          |
| Database       | PostgreSQL                           |
| Migrations     | Flyway                               |
| Security       | Spring Security (config pending)     |
| Validation     | Jakarta Bean Validation               |
| Boilerplate    | Lombok                               |
| Dev experience | Spring Boot DevTools                 |
| Local infra    | Docker Compose (PostgreSQL only)     |

No JWT library, API-doc generator (Swagger/OpenAPI), or MapStruct has been
added yet — these are deliberately deferred to later phases so this
scaffold stays lean and easy to review.

---

## 3. Folder Structure

The codebase uses **feature-based** packaging rather than traditional
layer-based packaging (i.e. no top-level `controllers/`, `services/`,
`repositories/` containing every feature mixed together). Each business
capability owns its own vertical slice:

```
com.keystone
├── auth/                  # authentication & credential handling (Phase 2)
│   ├── controller/
│   ├── dto/
│   ├── entity/
│   ├── repository/
│   ├── service/
│   │   └── impl/
│   ├── mapper/
│   └── util/
│
├── user/                  # platform users & roles (Phase 2)
│   ├── controller/
│   ├── dto/
│   ├── entity/
│   ├── repository/
│   ├── service/
│   │   └── impl/
│   └── mapper/
│
├── customer/               # customers & sites (Phase 2+)
├── workorder/               # work-order lifecycle, parts, time, SLA (Phase 3)
├── technician/               # technician field view (Phase 3)
├── dispatcher/               # dispatch & assignment (Phase 3)
│   └── (each mirrors the controller/dto/entity/repository/service/mapper shape above)
│
├── common/                  # cross-cutting, feature-agnostic code
│   ├── exception/            # global exception handling, custom exceptions
│   ├── constants/             # shared constants/enums
│   ├── response/               # standard API response envelopes
│   └── util/                    # generic helpers
│
├── config/                   # Spring @Configuration classes (CORS, beans, OpenAPI, etc.)
├── security/                  # Spring Security configuration, JWT filter (Phase 2)
└── KeystoneBackendApplication.java
```

**Note on `service.impl`:** the brief describes this as `service.impl`,
but Java package names map directly to nested directories — a single
folder literally named `service.impl` would not compile as package
`com.keystone.<feature>.service.impl`. This scaffold uses the equivalent,
compiler-correct nested form `service/impl/`, which is the standard
convention for separating a service **interface** from its
**implementation**.

### Resources

```
src/main/resources/
├── application.yml          # shared configuration, profile-agnostic
├── application-dev.yml       # local development overrides
├── application-prod.yml       # production overrides
├── db/migration/                # Flyway SQL migrations (empty for now)
├── static/                        # static assets, if ever served by this app
└── templates/                      # server-rendered templates, if ever needed
```

---

## 4. Prerequisites

- **Java 21** (JDK)
- **Docker** and **Docker Compose** (for local PostgreSQL)
- Maven is **not** required to be pre-installed — this project ships the
  Maven Wrapper (`mvnw` / `mvnw.cmd`).

---

## 5. How to Run (Local Development)

### 5.1 Start PostgreSQL

Create a `.env` file in the project root (git-ignored) with at least:

```
DB_NAME=keystone_dev
DB_USERNAME=postgres
DB_PASSWORD=change-me-locally
DB_PORT=5432
```

Then start the database:

```bash
docker compose up -d
```

### 5.2 Configure environment variables

The application reads its datasource credentials from environment
variables (see `application-dev.yml`). At minimum, export:

```bash
export DB_URL=jdbc:postgresql://localhost:5432/keystone_dev
export DB_USERNAME=keystone_user
export DB_PASSWORD=change-me-locally
```

### 5.3 Run the application

```bash
./mvnw spring-boot:run
```

Windows:

```bash
mvnw.cmd spring-boot:run
```

The `dev` profile is active by default (`SPRING_PROFILES_ACTIVE` defaults
to `dev` in `application.yml`). The app starts on **port 8080** unless
`SERVER_PORT` is set.

### 5.4 Run tests

```bash
./mvnw test
```

The included smoke test (`KeystoneBackendApplicationTests`) verifies the
Spring context loads and does not require a live database — data-layer
autoconfiguration is excluded specifically for that test.

### 5.5 Migrations / seed data

Not applicable yet — `db/migration/` is empty by design. See
`src/main/resources/db/migration/README.md` for the naming convention
that will be followed once entities are introduced.

---

## 6. Environment Variables Reference

| Variable                | Used in       | Purpose                                   | Default (dev)                              |
|--------------------------|---------------|---------------------------------------------|-----------------------------------------------|
| `SPRING_PROFILES_ACTIVE` | all           | Active Spring profile                         | `dev`                                          |
| `SERVER_PORT`             | all           | HTTP port                                      | `8080`                                          |
| `DB_URL`                   | dev / prod    | JDBC connection string                          | `jdbc:postgresql://localhost:5432/keystone_dev` |
| `DB_USERNAME`               | dev / prod    | Database user                                    | `keystone_user`                                  |
| `DB_PASSWORD`                | dev / prod    | Database password                                 | *(none — must be supplied)*                       |
| `DB_POOL_SIZE`                | prod          | HikariCP max pool size                              | `20`                                                |
| `JWT_SECRET`                    | all (unused yet) | Reserved for Phase 2 JWT signing                | *(empty)*                                            |
| `JWT_EXPIRATION_MS`              | all (unused yet) | Reserved for Phase 2 token expiry                | `3600000`                                              |
| `CORS_ALLOWED_ORIGINS`             | all (unused yet) | Reserved for Phase 2 CORS config vs. the React SPA | `http://localhost:5173`                                 |

None of these have hard-coded secrets in source control — all
credentials must be supplied via environment at runtime.

---

## 7. Architecture Summary

- **Layered inside each feature, not across the whole app.** Every
  feature package (`auth`, `user`, `customer`, `workorder`,
  `technician`, `dispatcher`) is self-contained: its own controller,
  DTOs, entity, repository, service interface + implementation, and
  mapper. This keeps each business capability easy to locate, test, and
  eventually extract if the platform ever needs to be split apart.
- **`common/` holds only what is genuinely cross-cutting** — exception
  handling, shared constants, a standard API response envelope, and
  generic utilities. It must never depend on a feature package.
- **`config/` and `security/` are infrastructure, not business logic.**
  CORS, bean wiring, and (later) JWT/Spring Security rules live here,
  separate from the feature slices they support.
- **Hibernate never owns the schema.** `ddl-auto: validate` plus Flyway
  means every schema change is a reviewed, versioned SQL migration —
  never implicit auto-generation.
- **Configuration is profile-driven.** `application.yml` holds
  profile-agnostic defaults; `application-dev.yml` and
  `application-prod.yml` override only what actually differs between
  environments (logging verbosity, pool sizing, error detail exposure).

---

## 8. Frontend Compatibility Note

A React + TypeScript front end already exists for this project and was
reviewed (read-only) to keep this scaffold compatible with it — package
naming, the four-role model (dispatcher / technician / manager /
customer), and the expected resource vocabulary (customers, sites, work
orders) all line up with what the UI already expects. The front end
currently runs against local mock data; no endpoints are wired up yet,
which will happen once the `auth` and `workorder` modules are
implemented in later phases.

---

## 9. Roadmap / Future Modules

This scaffold deliberately excludes the following — all planned for
subsequent phases:

- **Phase 2 — Foundation logic:** JWT authentication, Spring Security
  rules, `User` entity + roles, global exception handling via
  `common/exception`, first Flyway migrations.
- **Phase 3 — Core domain:** Customers & sites, the work-order entity
  and governed lifecycle (state machine), dispatch/assignment, parts &
  time logging.
- **Phase 4 — Platform features:** SLA tracking & notifications,
  manager dashboard/reporting endpoints, customer self-service portal.
- **Phase 5 — Productionizing:** OpenAPI/Swagger documentation,
  integration tests, containerized deployment, CI/CD.

---

## 10. Conventions for Contributors

- Business logic belongs in `service` implementations — controllers
  stay thin (HTTP concerns only).
- Entities are never returned directly from controllers — always map to
  a DTO (mapper classes live alongside each feature).
- No secrets committed to the repository — use environment variables or
  a git-ignored `.env` file locally.
- New feature modules should mirror the existing package shape
  (`controller / dto / entity / repository / service(+impl) / mapper`).

---

*Zidio Development · Java Full-Stack Engineering Internship · Project KEYSTONE*
