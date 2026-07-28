-- ============================================================================
-- V1__create_users_table.sql
--
-- Creates the "users" table backing com.keystone.user.entity.User.
-- ============================================================================

CREATE TABLE users
(
    id           UUID         NOT NULL PRIMARY KEY,
    first_name   VARCHAR(100) NOT NULL,
    last_name    VARCHAR(100) NOT NULL,
    email        VARCHAR(255) NOT NULL UNIQUE,
    password     VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20),
    role         VARCHAR(20)  NOT NULL,
    active       BOOLEAN      NOT NULL DEFAULT TRUE,
    created_at   TIMESTAMP    NOT NULL,
    updated_at   TIMESTAMP    NOT NULL
);