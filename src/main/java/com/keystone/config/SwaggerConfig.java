package com.keystone.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI keystoneOpenAPI() {

        return new OpenAPI()
                .info(new Info()
                        .title("KEYSTONE Field Service Management API")
                        .description("""
                                Backend REST API for the KEYSTONE Field Service Management Platform.

                                Features:
                                • JWT Authentication
                                • Customer Management
                                • Site Management
                                • Technician Management
                                • Work Orders
                                • Asset Management
                                • Dashboard Analytics
                                """)
                        .version("1.0.0")
                        .contact(new Contact()
                                .name("Meridian Facilities Management")
                                .email("support@keystone.com"))
                        .license(new License()
                                .name("Zidio Development Internship")));
    }
}