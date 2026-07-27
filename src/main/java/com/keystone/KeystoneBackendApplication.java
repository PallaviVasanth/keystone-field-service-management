package com.keystone;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * KEYSTONE — Field Service Management Platform.
 *
 * Entry point for the Spring Boot application. This class intentionally
 * contains no business logic — it only bootstraps the Spring context.
 *
 * Feature modules (auth, user, customer, workorder, technician, dispatcher)
 * are auto-discovered via component scanning under the com.keystone base
 * package, so no explicit @ComponentScan is required as long as new
 * feature packages stay under com.keystone.*.
 */
@SpringBootApplication
public class KeystoneBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(KeystoneBackendApplication.class, args);
    }

}
