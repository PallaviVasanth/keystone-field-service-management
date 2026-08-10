package com.keystone.asset.dto;

import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AssetResponse {

    private UUID id;

    private UUID siteId;

    private String assetCode;

    private String assetName;

    private String assetType;

    private String manufacturer;

    private String model;

    private String serialNumber;

    private LocalDate installationDate;

    private LocalDate warrantyExpiry;

    private Boolean active;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}