package com.keystone.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

/**
 * Provides the {@link PasswordEncoder} used throughout the application
 * to hash and verify user passwords.
 * <p>
 * Kept as a single, standalone bean definition — separate from any
 * {@code SecurityFilterChain} or authentication configuration, so the
 * encoder is available wherever it's needed (e.g. the {@code auth}
 * module) independently of how the security filter chain is set up.
 */
@Configuration
public class PasswordEncoderConfig {

    /**
     * Exposes a {@link BCryptPasswordEncoder} as the application's
     * {@link PasswordEncoder}, for hashing passwords on registration and
     * verifying them on login.
     *
     * @return a {@link BCryptPasswordEncoder} instance
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

}