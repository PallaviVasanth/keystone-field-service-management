package com.keystone.security;

import io.jsonwebtoken.JwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private static final String AUTHORIZATION_HEADER = "Authorization";
    private static final String BEARER_PREFIX = "Bearer ";

    private final JwtService jwtService;
    private final CustomUserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain
    ) throws ServletException, IOException {

        String requestUri = request.getRequestURI();
        String authHeader = request.getHeader(AUTHORIZATION_HEADER);

        System.out.println("=================================================");
        System.out.println("JWT FILTER");
        System.out.println("Request: " + request.getMethod() + " " + requestUri);
        System.out.println("Authorization header present: " + (authHeader != null));

        /*
         * No Bearer token.
         * Let Spring Security decide whether the endpoint is public
         * or requires authentication.
         */
        if (authHeader == null || !authHeader.startsWith(BEARER_PREFIX)) {
            System.out.println("JWT FILTER: No Bearer token found.");
            System.out.println("=================================================");

            filterChain.doFilter(request, response);
            return;
        }

        String token = authHeader.substring(BEARER_PREFIX.length()).trim();

        /*
         * Never print the actual JWT to the console.
         */
        System.out.println(
                "JWT FILTER: Token received. Length = " + token.length()
        );

        try {

            String username = jwtService.extractUsername(token);

            System.out.println(
                    "JWT FILTER: Extracted username = " + username
            );

            if (username != null
                    && SecurityContextHolder.getContext().getAuthentication() == null) {

                UserDetails userDetails =
                        userDetailsService.loadUserByUsername(username);

                System.out.println(
                        "JWT FILTER: User found = " + userDetails.getUsername()
                );

                System.out.println(
                        "JWT FILTER: Authorities = " + userDetails.getAuthorities()
                );

                boolean valid =
                        jwtService.isTokenValid(token, userDetails);

                System.out.println(
                        "JWT FILTER: Token valid = " + valid
                );

                if (valid) {

                    UsernamePasswordAuthenticationToken authentication =
                            new UsernamePasswordAuthenticationToken(
                                    userDetails,
                                    null,
                                    userDetails.getAuthorities()
                            );

                    authentication.setDetails(
                            new WebAuthenticationDetailsSource()
                                    .buildDetails(request)
                    );

                    SecurityContextHolder
                            .getContext()
                            .setAuthentication(authentication);

                    System.out.println(
                            "JWT FILTER: Authentication SUCCESS"
                    );

                    System.out.println(
                            "JWT FILTER: Authenticated user = "
                                    + SecurityContextHolder
                                    .getContext()
                                    .getAuthentication()
                                    .getName()
                    );

                    System.out.println(
                            "JWT FILTER: Authorities = "
                                    + SecurityContextHolder
                                    .getContext()
                                    .getAuthentication()
                                    .getAuthorities()
                    );

                } else {

                    System.out.println(
                            "JWT FILTER: Authentication FAILED - invalid token"
                    );
                }

            } else {

                System.out.println(
                        "JWT FILTER: Username missing OR authentication already exists."
                );
            }

        } catch (JwtException | IllegalArgumentException ex) {

            /*
             * Do not crash the request because of an invalid JWT.
             * Spring Security will subsequently treat the request
             * as unauthenticated.
             */
            System.out.println(
                    "JWT FILTER: Invalid JWT - " + ex.getMessage()
            );

            SecurityContextHolder.clearContext();

        } catch (Exception ex) {

            System.out.println(
                    "JWT FILTER: Unexpected authentication error - "
                            + ex.getClass().getName()
                            + ": "
                            + ex.getMessage()
            );

            SecurityContextHolder.clearContext();
        }

        System.out.println("=================================================");

        filterChain.doFilter(request, response);
    }
}