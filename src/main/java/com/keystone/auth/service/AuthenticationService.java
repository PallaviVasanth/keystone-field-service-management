package com.keystone.auth.service;

import com.keystone.auth.dto.LoginRequest;
import com.keystone.auth.dto.LoginResponse;
import com.keystone.auth.dto.RegisterRequest;
import com.keystone.auth.dto.RegisterResponse;
import com.keystone.security.JwtService;
import com.keystone.user.entity.User;
import com.keystone.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

/**
 * Handles KEYSTONE's registration and login flows.
 * <p>
 * Registration creates and persists a new {@link User} with an encoded
 * password. Login delegates credential verification to the {@link
 * AuthenticationManager} and, once authenticated, issues a JWT for the
 * caller via {@link JwtService}. This class holds no token mechanics
 * and no user-lookup logic of its own — those belong to {@link
 * JwtService} and {@code CustomUserDetailsService} respectively.
 */
@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    /**
     * Registers a new user.
     *
     * @param request the registration details
     * @return the created user's details
     * @throws IllegalArgumentException if a user with the given email
     *                                   already exists
     */
    public RegisterResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Email already exists");
        }

        User user = User.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .phoneNumber(request.getPhoneNumber())
                .role(request.getRole())
                .build();

        User savedUser = userRepository.save(user);

        return RegisterResponse.builder()
                .id(savedUser.getId())
                .firstName(savedUser.getFirstName())
                .lastName(savedUser.getLastName())
                .email(savedUser.getEmail())
                .phoneNumber(savedUser.getPhoneNumber())
                .role(savedUser.getRole())
                .active(savedUser.getActive())
                .createdAt(savedUser.getCreatedAt())
                .build();
    }

    /**
     * Authenticates a user and issues a JWT for subsequent requests.
     *
     * @param request the login credentials
     * @return the issued token together with the authenticated user's
     *         details
     * @throws org.springframework.security.core.AuthenticationException
     *         if the credentials are invalid
     * @throws IllegalArgumentException if the authenticated user cannot
     *                                   be found (unexpected in practice)
     */
    public LoginResponse login(LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String token = jwtService.generateToken(userDetails);

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new IllegalArgumentException(
                        "User not found with email: " + request.getEmail()));

        return LoginResponse.builder()
                .token(token)
                .tokenType("Bearer")
                .userId(user.getId())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .role(user.getRole())
                .build();
    }

}