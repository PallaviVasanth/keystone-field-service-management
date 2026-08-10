package com.keystone.customer.service;

import com.keystone.customer.dto.CreateCustomerRequest;
import com.keystone.customer.dto.CustomerResponse;
import com.keystone.customer.entity.Customer;
import com.keystone.customer.repository.CustomerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomerService {

    private final CustomerRepository customerRepository;

    public CustomerResponse createCustomer(CreateCustomerRequest request) {

        if (customerRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Customer email already exists.");
        }

        if (customerRepository.existsByCustomerCode(request.getCustomerCode())) {
            throw new IllegalArgumentException("Customer code already exists.");
        }

        Customer customer = Customer.builder()
                .customerCode(request.getCustomerCode())
                .companyName(request.getCompanyName())
                .contactPerson(request.getContactPerson())
                .email(request.getEmail())
                .phoneNumber(request.getPhoneNumber())
                .addressLine1(request.getAddressLine1())
                .addressLine2(request.getAddressLine2())
                .city(request.getCity())
                .state(request.getState())
                .postalCode(request.getPostalCode())
                .country(request.getCountry())
                .build();

        Customer savedCustomer = customerRepository.save(customer);

        return CustomerResponse.builder()
                .id(savedCustomer.getId())
                .customerCode(savedCustomer.getCustomerCode())
                .companyName(savedCustomer.getCompanyName())
                .contactPerson(savedCustomer.getContactPerson())
                .email(savedCustomer.getEmail())
                .phoneNumber(savedCustomer.getPhoneNumber())
                .addressLine1(savedCustomer.getAddressLine1())
                .addressLine2(savedCustomer.getAddressLine2())
                .city(savedCustomer.getCity())
                .state(savedCustomer.getState())
                .postalCode(savedCustomer.getPostalCode())
                .country(savedCustomer.getCountry())
                .active(savedCustomer.getActive())
                .createdAt(savedCustomer.getCreatedAt())
                .updatedAt(savedCustomer.getUpdatedAt())
                .build();
    }
}