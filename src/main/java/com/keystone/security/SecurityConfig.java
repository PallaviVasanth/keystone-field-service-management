package com.keystone.security;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

/**
 * Core Spring Security configuration for the KEYSTONE API.
 * <p>
 * Establishes the baseline security posture — stateless sessions, CSRF
 * disabled (appropriate for a stateless, token-authenticated REST API),
 * and which endpoints are public versus authenticated. Authentication
 * itself is delegated to the injected {@link AuthenticationProvider},
 * and every request is authenticated from its JWT by the injected
 * {@link JwtAuthenticationFilter}, registered ahead of Spring Security's
 * own {@link UsernamePasswordAuthenticationFilter}.
 */
@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final AuthenticationProvider authenticationProvider;

    /**
     * Defines the HTTP security rules applied to every request.
     * <p>
     * Authentication endpoints and the health-check endpoint are public;
     * everything else requires an authenticated principal. Session
     * creation is disabled, since authentication state will be carried
     * by a token on every request rather than a server-side session.
     * The configured {@link AuthenticationProvider} is registered for
     * credential verification, and {@link JwtAuthenticationFilter} runs
     * before {@link UsernamePasswordAuthenticationFilter} to populate the
     * security context from each request's JWT.
     *
     * @param http the {@link HttpSecurity} to configure
     * @return the built {@link SecurityFilterChain}
     * @throws Exception if the security configuration cannot be built
     */
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers("/auth/**", "/actuator/health").permitAll()
                        .anyRequest().authenticated()
                )
                .exceptionHandling(exceptionHandling -> {
                    // Spring Security defaults (401 for unauthenticated,
                    // 403 for unauthorized) are used as-is for now.
                })
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

}