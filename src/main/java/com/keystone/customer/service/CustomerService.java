package com.keystone.customer.service;

import com.keystone.customer.dto.CreateCustomerRequest;
import com.keystone.customer.dto.CustomerResponse;
import com.keystone.customer.dto.UpdateCustomerRequest;
import com.keystone.customer.entity.Customer;
import com.keystone.customer.repository.CustomerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

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

    public List<CustomerResponse> getAllCustomers() {

        return customerRepository.findAll()
                .stream()
                .map(customer -> CustomerResponse.builder()
                        .id(customer.getId())
                        .customerCode(customer.getCustomerCode())
                        .companyName(customer.getCompanyName())
                        .contactPerson(customer.getContactPerson())
                        .email(customer.getEmail())
                        .phoneNumber(customer.getPhoneNumber())
                        .addressLine1(customer.getAddressLine1())
                        .addressLine2(customer.getAddressLine2())
                        .city(customer.getCity())
                        .state(customer.getState())
                        .postalCode(customer.getPostalCode())
                        .country(customer.getCountry())
                        .active(customer.getActive())
                        .createdAt(customer.getCreatedAt())
                        .updatedAt(customer.getUpdatedAt())
                        .build())
                .collect(Collectors.toList());
    }

    public CustomerResponse getCustomerById(UUID id) {

        Customer customer = customerRepository.findById(id)
                .orElseThrow(() ->
                        new IllegalArgumentException("Customer not found with id: " + id));

        return CustomerResponse.builder()
                .id(customer.getId())
                .customerCode(customer.getCustomerCode())
                .companyName(customer.getCompanyName())
                .contactPerson(customer.getContactPerson())
                .email(customer.getEmail())
                .phoneNumber(customer.getPhoneNumber())
                .addressLine1(customer.getAddressLine1())
                .addressLine2(customer.getAddressLine2())
                .city(customer.getCity())
                .state(customer.getState())
                .postalCode(customer.getPostalCode())
                .country(customer.getCountry())
                .active(customer.getActive())
                .createdAt(customer.getCreatedAt())
                .updatedAt(customer.getUpdatedAt())
                .build();
    }

    public CustomerResponse updateCustomer(UUID id, UpdateCustomerRequest request) {

        Customer customer = customerRepository.findById(id)
                .orElseThrow(() ->
                        new IllegalArgumentException("Customer not found with id: " + id));

        customer.setCompanyName(request.getCompanyName());
        customer.setContactPerson(request.getContactPerson());
        customer.setEmail(request.getEmail());
        customer.setPhoneNumber(request.getPhoneNumber());
        customer.setAddressLine1(request.getAddressLine1());
        customer.setAddressLine2(request.getAddressLine2());
        customer.setCity(request.getCity());
        customer.setState(request.getState());
        customer.setPostalCode(request.getPostalCode());
        customer.setCountry(request.getCountry());

        if (request.getActive() != null) {
            customer.setActive(request.getActive());
        }

        Customer updatedCustomer = customerRepository.save(customer);

        return CustomerResponse.builder()
                .id(updatedCustomer.getId())
                .customerCode(updatedCustomer.getCustomerCode())
                .companyName(updatedCustomer.getCompanyName())
                .contactPerson(updatedCustomer.getContactPerson())
                .email(updatedCustomer.getEmail())
                .phoneNumber(updatedCustomer.getPhoneNumber())
                .addressLine1(updatedCustomer.getAddressLine1())
                .addressLine2(updatedCustomer.getAddressLine2())
                .city(updatedCustomer.getCity())
                .state(updatedCustomer.getState())
                .postalCode(updatedCustomer.getPostalCode())
                .country(updatedCustomer.getCountry())
                .active(updatedCustomer.getActive())
                .createdAt(updatedCustomer.getCreatedAt())
                .updatedAt(updatedCustomer.getUpdatedAt())
                .build();
    }

    public void deleteCustomer(UUID id) {

        Customer customer = customerRepository.findById(id)
                .orElseThrow(() ->
                        new IllegalArgumentException("Customer not found with id: " + id));

        customerRepository.delete(customer);
    }
}