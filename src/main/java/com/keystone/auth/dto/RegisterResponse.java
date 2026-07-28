package com.keystone.auth.dto;

import com.keystone.user.entity.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.UUID;

/**
 * Response body returned after a user successfully registers.
 * <p>
 * A plain data carrier only — it holds no business logic. It never
 * exposes the password, so a {@link com.keystone.user.entity.User}
 * entity must always be mapped to this DTO rather than returned
 * directly, keeping the credential fully off the wire.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RegisterResponse {

    private UUID id;

    private String firstName;

    private String lastName;

    private String email;

    private String phoneNumber;

    private Role role;

    private Boolean active;

    private LocalDateTime createdAt;

}