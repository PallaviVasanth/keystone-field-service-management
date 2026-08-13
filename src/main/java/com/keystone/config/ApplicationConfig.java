package com.keystone.config;

import com.keystone.security.CustomUserDetailsService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.crypto.password.PasswordEncoder;

/**
 * Wires the authentication mechanics that back KEYSTONE's login flow.
 * <p>
 * Combines {@link CustomUserDetailsService} (how a user is looked up) with
 * {@link PasswordEncoder} (how their password is verified) into a
 * {@link DaoAuthenticationProvider}, and exposes the {@link
 * AuthenticationManager} used to actually perform authentication. Token
 * issuance and the {@code JwtAuthenticationFilter} are handled elsewhere.
 */
@Configuration
@RequiredArgsConstructor
public class ApplicationConfig {

    private final CustomUserDetailsService userDetailsService;
    private final PasswordEncoder passwordEncoder;

    /**
     * Builds the {@link AuthenticationProvider} used to authenticate
     * login attempts: it looks up the user via {@link
     * CustomUserDetailsService} and verifies their password with the
     * configured {@link PasswordEncoder}.
     *
     * @return a configured {@link DaoAuthenticationProvider}
     */
    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider(userDetailsService);
        authenticationProvider.setPasswordEncoder(passwordEncoder);
        return authenticationProvider;
    }

    /**
     * Exposes the {@link AuthenticationManager} Spring Security assembles
     * from the configured {@link AuthenticationProvider}, so it can be
     * injected wherever login attempts need to be authenticated (e.g. the
     * {@code auth} service).
     *
     * @param config the auto-configured {@link AuthenticationConfiguration}
     * @return the application's {@link AuthenticationManager}
     * @throws Exception if the underlying {@link AuthenticationManager}
     *                    cannot be obtained
     */
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

}