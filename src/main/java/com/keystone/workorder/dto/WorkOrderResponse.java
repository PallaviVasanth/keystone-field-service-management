package com.keystone.workorder.dto;

import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WorkOrderResponse {

    private UUID id;

    private String workOrderNumber;

    private UUID customerId;

    private UUID siteId;

    private UUID technicianId;

    private String title;

    private String description;

    private String priority;

    private String status;

    private LocalDateTime scheduledDate;

    private LocalDateTime completedDate;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}