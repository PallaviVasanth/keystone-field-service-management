CREATE TABLE work_orders (

    id UUID PRIMARY KEY,

    work_order_number VARCHAR(50) NOT NULL UNIQUE,

    customer_id UUID NOT NULL,

    site_id UUID NOT NULL,

    technician_id UUID,

    title VARCHAR(255) NOT NULL,

    description TEXT,

    priority VARCHAR(20) NOT NULL,

    status VARCHAR(20) NOT NULL,

    scheduled_date TIMESTAMP,

    completed_date TIMESTAMP,

    created_at TIMESTAMP NOT NULL,

    updated_at TIMESTAMP NOT NULL,

    CONSTRAINT fk_workorder_customer
        FOREIGN KEY (customer_id)
        REFERENCES customers(id),

    CONSTRAINT fk_workorder_site
        FOREIGN KEY (site_id)
        REFERENCES sites(id),

    CONSTRAINT fk_workorder_technician
        FOREIGN KEY (technician_id)
        REFERENCES technicians(id)
);