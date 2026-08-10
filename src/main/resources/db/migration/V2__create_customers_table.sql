-- ============================================================================
-- V2__create_customers_table.sql
--
-- Creates the "customers" table.
-- ============================================================================
CREATE TABLE customers
(
    id              UUID         NOT NULL PRIMARY KEY,

    customer_code   VARCHAR(20)  NOT NULL UNIQUE,

    company_name    VARCHAR(255) NOT NULL,

    contact_person  VARCHAR(200) NOT NULL,

    email           VARCHAR(255) NOT NULL,

    phone_number    VARCHAR(20),

    address_line1   VARCHAR(255) NOT NULL,

    address_line2   VARCHAR(255),

    city            VARCHAR(100) NOT NULL,

    state           VARCHAR(100) NOT NULL,

    postal_code     VARCHAR(20),

    country         VARCHAR(100) NOT NULL,

    active          BOOLEAN      NOT NULL DEFAULT TRUE,

    created_at      TIMESTAMP    NOT NULL,

    updated_at      TIMESTAMP    NOT NULL
);