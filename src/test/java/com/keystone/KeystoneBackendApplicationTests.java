package com.keystone;

import org.junit.jupiter.api.Test;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.flyway.FlywayAutoConfiguration;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.autoconfigure.orm.jpa.HibernateJpaAutoConfiguration;
import org.springframework.boot.test.context.SpringBootTest;

/**
 * Smoke test: verifies the Spring application context loads with the
 * current scaffold.
 *
 * Data-layer autoconfiguration is intentionally excluded here so this
 * test can run in CI or local environments without a live PostgreSQL
 * instance. Once domain entities and repositories are introduced
 * (Phase 2+), prefer a Testcontainers-backed integration test instead.
 */
@SpringBootTest
@EnableAutoConfiguration(exclude = {
        DataSourceAutoConfiguration.class,
        HibernateJpaAutoConfiguration.class,
        FlywayAutoConfiguration.class
})
class KeystoneBackendApplicationTests {

    @Test
    void contextLoads() {
        // Intentionally empty. A failure here means the application
        // context (config, entities, beans) does not wire up correctly.
    }

}
