package com.keystone.site.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UpdateSiteRequest {

    @NotBlank
    @Size(max = 255)
    private String siteName;

    @NotBlank
    private String addressLine1;

    private String addressLine2;

    @NotBlank
    private String city;

    @NotBlank
    private String state;

    private String postalCode;

    @NotBlank
    private String country;

    @Size(max = 200)
    private String contactPerson;

    @Size(max = 20)
    private String phoneNumber;

    private Boolean active;
}