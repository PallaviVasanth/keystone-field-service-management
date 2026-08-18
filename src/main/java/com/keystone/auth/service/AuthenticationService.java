package com.keystone.auth.service;

import com.keystone.auth.dto.LoginRequest;
import com.keystone.auth.dto.LoginResponse;
import com.keystone.auth.dto.RegisterRequest;
import com.keystone.auth.dto.RegisterResponse;
import com.keystone.customer.entity.Customer;
import com.keystone.customer.repository.CustomerRepository;
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
 */
@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;
    private final CustomerRepository customerRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    /**
     * Registers a new user.
     *
     * CUSTOMER registration requires an existing Customer record
     * with the same email address. This links the portal user to
     * the company/customer record rather than creating a duplicate.
     */
    public RegisterResponse register(RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Email already exists");
        }

        Customer customer = null;

        /*
         * CUSTOMER accounts must belong to an existing customer record.
         */
        if (request.getRole().name().equals("CUSTOMER")) {
            customer = customerRepository.findByEmail(request.getEmail())
                    .orElseThrow(() -> new IllegalArgumentException(
                            "No customer record exists for this email. "
                                    + "Please contact your KEYSTONE administrator."
                    ));
        }

        User user = User.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .phoneNumber(request.getPhoneNumber())
                .role(request.getRole())
                .customer(customer)
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
     * Authenticates a user and issues a JWT.
     */
    public LoginResponse login(LoginRequest request) {

        Authentication authentication =
                authenticationManager.authenticate(
                        new UsernamePasswordAuthenticationToken(
                                request.getEmail(),
                                request.getPassword()
                        )
                );

        UserDetails userDetails =
                (UserDetails) authentication.getPrincipal();

        String token = jwtService.generateToken(userDetails);

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new IllegalArgumentException(
                        "User not found with email: " + request.getEmail()
                ));

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