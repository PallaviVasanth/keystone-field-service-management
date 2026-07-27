# Flyway Migrations

This folder is intentionally empty in Phase 1.

Flyway is enabled and configured (see `application.yml`), and will fail
the application startup if it finds no migrations **only once** JPA
entities requiring `ddl-auto: validate` are introduced. Until then, an
empty migration folder is valid — Flyway simply has nothing to apply yet.

## Naming convention (for Phase 2+)

Use versioned, immutable migrations:

```
V1__init_schema.sql
V2__add_work_order_tables.sql
V3__add_indexes.sql
```

Rules:
- Never edit a migration that has already been applied to any shared
  environment — write a new one instead.
- Keep each migration focused (one concern per file).
- Repeatable migrations (`R__...sql`), if ever needed, are for
  non-structural objects (views, seed lookups) only.
