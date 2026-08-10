package com.keystone.asset.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDate;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateAssetRequest {

    @NotNull
    private UUID siteId;

    @NotBlank
    private String assetCode;

    @NotBlank
    private String assetName;

    @NotBlank
    private String assetType;

    private String manufacturer;

    private String model;

    private String serialNumber;

    private LocalDate installationDate;

    private LocalDate warrantyExpiry;
}