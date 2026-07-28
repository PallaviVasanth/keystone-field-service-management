package com.keystone.security;

import com.keystone.config.JwtProperties;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

/**
 * Provides JWT generation, validation, and claim extraction for
 * authenticated KEYSTONE users.
 * <p>
 * This service only handles token mechanics — issuing a signed token,
 * reading claims back out of one, and checking that it is valid and
 * unexpired for a given {@link UserDetails}. It performs no
 * authentication itself (credential checking lives in the {@code auth}
 * package) and issues no refresh tokens.
 */
@Service
@RequiredArgsConstructor
public class JwtService {

    private final JwtProperties jwtProperties;

    /**
     * Generates a signed JWT for the given user, using the subject
     * (username) plus standard issued-at / expiration timestamps — no
     * extra claims are embedded.
     *
     * @param userDetails the authenticated user's details
     * @return a signed, compact JWT string
     */
    public String generateToken(UserDetails userDetails) {
        return buildToken(new HashMap<>(), userDetails, jwtProperties.getExpirationMs());
    }

    /**
     * Extracts the username (subject) embedded in the given token.
     *
     * @param token the JWT to read
     * @return the username stored as the token's subject
     */
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    /**
     * Checks whether the given token is valid for the given user: its
     * subject matches the user's username, and it has not expired.
     *
     * @param token       the JWT to validate
     * @param userDetails the user the token is expected to belong to
     * @return {@code true} if the token is valid for this user, otherwise
     *         {@code false}
     */
    public boolean isTokenValid(String token, UserDetails userDetails) {
        String username = extractUsername(token);
        return username.equals(userDetails.getUsername()) && !isTokenExpired(token);
    }

    /**
     * Builds and signs a JWT (HS256) with the given extra claims,
     * subject, and expiration window.
     */
    private String buildToken(Map<String, Object> extraClaims, UserDetails userDetails, long expiration) {
        Date issuedAt = new Date();
        Date expiresAt = new Date(issuedAt.getTime() + expiration);

        return Jwts.builder()
                .claims(extraClaims)
                .subject(userDetails.getUsername())
                .issuedAt(issuedAt)
                .expiration(expiresAt)
                .signWith(getSigningKey(), Jwts.SIG.HS256)
                .compact();
    }

    /**
     * Extracts a single claim from the token using the given resolver
     * function.
     */
    private <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    /**
     * Parses and verifies the token's signature, returning all of its
     * claims.
     */
    private Claims extractAllClaims(String token) {
        return Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    /**
     * Builds the HMAC-SHA signing key used for HS256, derived from the
     * configured JWT secret.
     */
    private SecretKey getSigningKey() {
        byte[] keyBytes = jwtProperties.getSecret().getBytes(StandardCharsets.UTF_8);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    /**
     * Determines whether the token's expiration timestamp is in the past.
     */
    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    /**
     * Extracts the token's expiration timestamp.
     */
    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

}