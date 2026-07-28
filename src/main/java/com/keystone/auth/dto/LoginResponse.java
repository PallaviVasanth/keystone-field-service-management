package com.keystone.auth.dto;

import com.keystone.user.entity.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

/**
 * Response body returned after a user successfully logs in.
 * <p>
 * A plain data carrier only — it holds no business logic and no JWT
 * generation logic, which belongs to the {@code security} package once
 * introduced. It never exposes the password.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LoginResponse {

    /**
     * The issued access token (e.g. a signed JWT).
     */
    private String token;

    /**
     * The scheme the token should be presented with, e.g. {@code "Bearer"}.
     */
    private String tokenType;

    private UUID userId;

    private String firstName;

    private String lastName;

    private String email;

    private Role role;

}