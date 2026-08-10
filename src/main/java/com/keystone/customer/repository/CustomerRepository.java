package com.keystone.customer.repository;

import com.keystone.customer.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface CustomerRepository extends JpaRepository<Customer, UUID> {

    Optional<Customer> findByEmail(String email);

    Optional<Customer> findByCustomerCode(String customerCode);

    boolean existsByEmail(String email);

    boolean existsByCustomerCode(String customerCode);
}