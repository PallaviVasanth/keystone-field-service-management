package com.keystone.user.entity;

/**
 * The set of roles a KEYSTONE platform user can hold.
 * <p>
 * Access rules for each role are enforced server-side (Spring Security,
 * once introduced) — this enum only defines the fixed vocabulary of roles
 * referenced across the platform.
 */
public enum Role {
    ADMIN,
    DISPATCHER,
    TECHNICIAN,
    CUSTOMER
}