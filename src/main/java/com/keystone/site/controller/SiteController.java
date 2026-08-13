package com.keystone.site.controller;

import com.keystone.site.dto.CreateSiteRequest;
import com.keystone.site.dto.SiteResponse;
import com.keystone.site.dto.UpdateSiteRequest;
import com.keystone.site.service.SiteService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/sites")
@RequiredArgsConstructor
public class SiteController {

    private final SiteService siteService;

    @PostMapping
    public ResponseEntity<SiteResponse> createSite(
            @Valid @RequestBody CreateSiteRequest request) {

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(siteService.createSite(request));
    }

    @GetMapping
    public ResponseEntity<List<SiteResponse>> getAllSites() {

        return ResponseEntity.ok(siteService.getAllSites());
    }

    @GetMapping("/{id}")
    public ResponseEntity<SiteResponse> getSiteById(
            @PathVariable UUID id) {

        return ResponseEntity.ok(siteService.getSiteById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<SiteResponse> updateSite(
            @PathVariable UUID id,
            @Valid @RequestBody UpdateSiteRequest request) {

        return ResponseEntity.ok(siteService.updateSite(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSite(
            @PathVariable UUID id) {

        siteService.deleteSite(id);
        return ResponseEntity.noContent().build();
    }
}