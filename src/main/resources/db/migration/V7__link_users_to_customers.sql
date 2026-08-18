-- ============================================================================
-- V3__link_users_to_customers.sql
--
-- Links CUSTOMER portal users to an existing customer record.
-- A user may optionally belong to a customer.
-- ============================================================================

ALTER TABLE users
    ADD COLUMN customer_id UUID;

ALTER TABLE users
    ADD CONSTRAINT fk_users_customer
    FOREIGN KEY (customer_id)
    REFERENCES customers(id);

CREATE INDEX idx_users_customer_id
    ON users(customer_id);