package com.keystone.security;

import com.keystone.user.entity.User;
import com.keystone.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Loads KEYSTONE users for Spring Security, keyed by email address.
 * <p>
 * Bridges the {@code users} table to Spring Security's authentication
 * machinery by adapting a {@link User} entity into a framework-native
 * {@link UserDetails}. It performs no authentication itself —
 * credential comparison is handled by Spring Security's own provider
 * infrastructure once wired in.
 */
@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    /**
     * Loads the user identified by the given username, which for
     * KEYSTONE is the user's email address.
     *
     * @param username the user's email address
     * @return a Spring Security {@link UserDetails} view of the matching user
     * @throws UsernameNotFoundException if no user exists with that email
     */
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + username));

        GrantedAuthority authority = new SimpleGrantedAuthority("ROLE_" + user.getRole().name());

        return org.springframework.security.core.userdetails.User.builder()
                .username(user.getEmail())
                .password(user.getPassword())
                .disabled(!user.getActive())
                .authorities(List.of(authority))
                .build();
    }

}