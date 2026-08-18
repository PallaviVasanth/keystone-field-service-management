package com.keystone.customer.service;

import com.keystone.customer.dto.CreateCustomerRequest;
import com.keystone.customer.dto.CustomerResponse;
import com.keystone.customer.dto.UpdateCustomerRequest;
import com.keystone.customer.entity.Customer;
import com.keystone.customer.repository.CustomerRepository;
import com.keystone.user.entity.User;
import com.keystone.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CustomerService {

    private final CustomerRepository customerRepository;
    private final UserRepository userRepository;

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

        return mapToResponse(savedCustomer);
    }

    public List<CustomerResponse> getAllCustomers() {

        return customerRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public CustomerResponse getCustomerById(UUID id) {

        Customer customer = customerRepository.findById(id)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Customer not found with id: " + id
                        )
                );

        return mapToResponse(customer);
    }

    /**
     * Returns the customer record linked to the authenticated user email.
     */
    public CustomerResponse getMyCustomer(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Authenticated user not found."
                        )
                );

        if (user.getCustomer() == null) {
            throw new IllegalArgumentException(
                    "This user is not linked to a customer account."
            );
        }

        return mapToResponse(user.getCustomer());
    }

    public CustomerResponse updateCustomer(
            UUID id,
            UpdateCustomerRequest request
    ) {

        Customer customer = customerRepository.findById(id)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Customer not found with id: " + id
                        )
                );

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

        Customer updatedCustomer =
                customerRepository.save(customer);

        return mapToResponse(updatedCustomer);
    }

    public void deleteCustomer(UUID id) {

        Customer customer = customerRepository.findById(id)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Customer not found with id: " + id
                        )
                );

        customerRepository.delete(customer);
    }

    private CustomerResponse mapToResponse(Customer customer) {

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
}