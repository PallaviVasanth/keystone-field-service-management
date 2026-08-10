CREATE TABLE sites (
    id UUID PRIMARY KEY,

    customer_id UUID NOT NULL,

    site_code VARCHAR(50) NOT NULL UNIQUE,
    site_name VARCHAR(255) NOT NULL,

    address_line1 VARCHAR(255) NOT NULL,
    address_line2 VARCHAR(255),

    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    postal_code VARCHAR(20),
    country VARCHAR(100) NOT NULL,

    contact_person VARCHAR(200),
    phone_number VARCHAR(20),

    active BOOLEAN NOT NULL DEFAULT TRUE,

    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL,

    CONSTRAINT fk_sites_customer
        FOREIGN KEY (customer_id)
        REFERENCES customers(id)
);