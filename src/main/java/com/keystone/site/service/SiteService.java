package com.keystone.site.service;

import com.keystone.customer.entity.Customer;
import com.keystone.customer.repository.CustomerRepository;
import com.keystone.site.dto.CreateSiteRequest;
import com.keystone.site.dto.SiteResponse;
import com.keystone.site.dto.UpdateSiteRequest;
import com.keystone.site.entity.Site;
import com.keystone.site.repository.SiteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SiteService {

    private final SiteRepository siteRepository;
    private final CustomerRepository customerRepository;

    public SiteResponse createSite(CreateSiteRequest request) {

        if (siteRepository.existsBySiteCode(request.getSiteCode())) {
            throw new IllegalArgumentException("Site code already exists.");
        }

        Customer customer = customerRepository.findById(request.getCustomerId())
                .orElseThrow(() ->
                        new IllegalArgumentException("Customer not found."));

        Site site = Site.builder()
                .customer(customer)
                .siteCode(request.getSiteCode())
                .siteName(request.getSiteName())
                .addressLine1(request.getAddressLine1())
                .addressLine2(request.getAddressLine2())
                .city(request.getCity())
                .state(request.getState())
                .postalCode(request.getPostalCode())
                .country(request.getCountry())
                .contactPerson(request.getContactPerson())
                .phoneNumber(request.getPhoneNumber())
                .build();

        return mapToResponse(siteRepository.save(site));
    }

    public List<SiteResponse> getAllSites() {

        return siteRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public SiteResponse getSiteById(UUID id) {

        Site site = siteRepository.findById(id)
                .orElseThrow(() ->
                        new IllegalArgumentException("Site not found."));

        return mapToResponse(site);
    }

    public SiteResponse updateSite(UUID id, UpdateSiteRequest request) {

        Site site = siteRepository.findById(id)
                .orElseThrow(() ->
                        new IllegalArgumentException("Site not found."));

        site.setSiteName(request.getSiteName());
        site.setAddressLine1(request.getAddressLine1());
        site.setAddressLine2(request.getAddressLine2());
        site.setCity(request.getCity());
        site.setState(request.getState());
        site.setPostalCode(request.getPostalCode());
        site.setCountry(request.getCountry());
        site.setContactPerson(request.getContactPerson());
        site.setPhoneNumber(request.getPhoneNumber());
        site.setActive(request.getActive());

        return mapToResponse(siteRepository.save(site));
    }

    public void deleteSite(UUID id) {

        Site site = siteRepository.findById(id)
                .orElseThrow(() ->
                        new IllegalArgumentException("Site not found."));

        siteRepository.delete(site);
    }

    private SiteResponse mapToResponse(Site site) {

        return SiteResponse.builder()
                .id(site.getId())
                .customerId(site.getCustomer().getId())
                .siteCode(site.getSiteCode())
                .siteName(site.getSiteName())
                .addressLine1(site.getAddressLine1())
                .addressLine2(site.getAddressLine2())
                .city(site.getCity())
                .state(site.getState())
                .postalCode(site.getPostalCode())
                .country(site.getCountry())
                .contactPerson(site.getContactPerson())
                .phoneNumber(site.getPhoneNumber())
                .active(site.getActive())
                .createdAt(site.getCreatedAt())
                .updatedAt(site.getUpdatedAt())
                .build();
    }
}