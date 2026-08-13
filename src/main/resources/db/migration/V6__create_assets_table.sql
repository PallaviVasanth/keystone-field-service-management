CREATE TABLE assets (

    id UUID PRIMARY KEY,

    site_id UUID NOT NULL,

    asset_code VARCHAR(50) NOT NULL UNIQUE,

    asset_name VARCHAR(255) NOT NULL,

    asset_type VARCHAR(100) NOT NULL,

    manufacturer VARCHAR(100),

    model VARCHAR(100),

    serial_number VARCHAR(100),

    installation_date DATE,

    warranty_expiry DATE,

    active BOOLEAN NOT NULL DEFAULT TRUE,

    created_at TIMESTAMP NOT NULL,

    updated_at TIMESTAMP NOT NULL,

    CONSTRAINT fk_assets_site
        FOREIGN KEY (site_id)
        REFERENCES sites(id)
);