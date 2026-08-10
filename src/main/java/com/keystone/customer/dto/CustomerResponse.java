package com.keystone.customer.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CustomerResponse {

    private UUID id;

    private String customerCode;

    private String companyName;

    private String contactPerson;

    private String email;

    private String phoneNumber;

    private String addressLine1;

    private String addressLine2;

    private String city;

    private String state;

    private String postalCode;

    private String country;

    private Boolean active;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}