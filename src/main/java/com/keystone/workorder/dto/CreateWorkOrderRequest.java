package com.keystone.workorder.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateWorkOrderRequest {

    @NotBlank
    private String workOrderNumber;

    @NotNull
    private UUID customerId;

    @NotNull
    private UUID siteId;

    private UUID technicianId;

    @NotBlank
    private String title;

    private String description;

    @NotBlank
    private String priority;

    @NotBlank
    private String status;

    private LocalDateTime scheduledDate;
}