package com.keystone.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import lombok.Getter;
import lombok.Setter;

/**
 * Binds JWT-related configuration values from {@code application.yml}
 * (properties under the {@code jwt} prefix).
 * <p>
 * A plain configuration holder only — it performs no token generation,
 * signing, or validation. That logic belongs to the {@code security}
 * package once introduced.
 */
@Getter
@Setter
@Component
@ConfigurationProperties(prefix = "keystone.security.jwt")

public class JwtProperties {

    private String secret;

    private long expirationMs;

}