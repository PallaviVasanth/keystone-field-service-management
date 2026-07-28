package com.keystone.auth.dto;

import com.keystone.user.entity.Role;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Request body for registering a new KEYSTONE user.
 * <p>
 * A plain data carrier only — it holds no business logic. Validation is
 * declarative (Jakarta Bean Validation); mapping to a {@link
 * com.keystone.user.entity.User} entity, password hashing, and
 * persistence are handled by the {@code auth} service layer once
 * introduced.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RegisterRequest {

    @NotBlank
    @Size(max = 100)
    private String firstName;

    @NotBlank
    @Size(max = 100)
    private String lastName;

    @NotBlank
    @Email
    @Size(max = 255)
    private String email;

    /**
     * Plain-text password as submitted by the client. Hashed (BCrypt)
     * before ever being persisted — never stored or logged as-is.
     */
    @NotBlank
    @Size(min = 8, max = 100)
    private String password;

    @Size(max = 20)
    private String phoneNumber;

    @NotNull
    private Role role;

}