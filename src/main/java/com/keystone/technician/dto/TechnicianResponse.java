package com.keystone.technician.dto;

import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TechnicianResponse {

    private UUID id;

    private String employeeCode;

    private String firstName;

    private String lastName;

    private String email;

    private String phoneNumber;

    private String specialization;

    private Boolean active;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}