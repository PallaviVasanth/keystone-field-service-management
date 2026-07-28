package com.keystone.auth.controller;

import com.keystone.auth.dto.LoginRequest;
import com.keystone.auth.dto.LoginResponse;
import com.keystone.auth.dto.RegisterRequest;
import com.keystone.auth.dto.RegisterResponse;
import com.keystone.auth.service.AuthenticationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Exposes KEYSTONE's public authentication endpoints.
 * <p>
 * Both endpoints are permitted without an existing token (see {@code
 * SecurityConfig}'s {@code /auth/**} rule) — this class only validates
 * incoming requests and maps them onto {@link AuthenticationService};
 * it holds no registration or login logic of its own.
 */
@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationService authenticationService;

    /**
     * Registers a new KEYSTONE user.
     *
     * @param request the registration details
     * @return {@code 201 Created} with the newly created user's details
     */
    @PostMapping("/register")
    public ResponseEntity<RegisterResponse> register(@Valid @RequestBody RegisterRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(authenticationService.register(request));
    }

    /**
     * Authenticates a user and issues a JWT.
     *
     * @param request the login credentials
     * @return {@code 200 OK} with the issued token and user details
     */
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest request) {
        return ResponseEntity.ok(authenticationService.login(request));
    }

}