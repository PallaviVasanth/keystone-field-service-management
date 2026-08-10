package com.keystone.customer.controller;

import com.keystone.customer.dto.CreateCustomerRequest;
import com.keystone.customer.dto.CustomerResponse;
import com.keystone.customer.service.CustomerService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/customers")
@RequiredArgsConstructor
public class CustomerController {

    private final CustomerService customerService;

    @PostMapping
    public ResponseEntity<CustomerResponse> createCustomer(
            @Valid @RequestBody CreateCustomerRequest request) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(customerService.createCustomer(request));
    }
}