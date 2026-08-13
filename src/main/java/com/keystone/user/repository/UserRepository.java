package com.keystone.user.repository;

import com.keystone.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

/**
 * Spring Data JPA repository for {@link User}.
 * <p>
 * Provides standard CRUD operations via {@link JpaRepository}, plus
 * lookup by email — the natural unique identifier users log in with,
 * ahead of authentication being implemented in the {@code auth} package.
 */
@Repository
public interface UserRepository extends JpaRepository<User, UUID> {

    /**
     * Finds a user by their unique email address.
     *
     * @param email the email address to search for
     * @return an {@link Optional} containing the matching user, or empty
     *         if no user has that email
     */
    Optional<User> findByEmail(String email);

    /**
     * Checks whether a user with the given email address already exists.
     *
     * @param email the email address to check
     * @return {@code true} if a user with that email exists, otherwise
     *         {@code false}
     */
    boolean existsByEmail(String email);

}