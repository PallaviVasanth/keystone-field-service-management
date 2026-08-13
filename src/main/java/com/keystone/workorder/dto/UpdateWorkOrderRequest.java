package com.keystone.workorder.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UpdateWorkOrderRequest {

    private UUID technicianId;

    @NotBlank
    private String title;

    private String description;

    @NotBlank
    private String priority;

    @NotBlank
    private String status;

    private LocalDateTime scheduledDate;

    private LocalDateTime completedDate;
}