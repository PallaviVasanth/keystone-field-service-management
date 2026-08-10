package com.keystone.asset.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UpdateAssetRequest {

    @NotBlank
    private String assetName;

    @NotBlank
    private String assetType;

    private String manufacturer;

    private String model;

    private String serialNumber;

    private LocalDate installationDate;

    private LocalDate warrantyExpiry;

    private Boolean active;
}