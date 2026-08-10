package com.keystone.asset.controller;

import com.keystone.asset.dto.AssetResponse;
import com.keystone.asset.dto.CreateAssetRequest;
import com.keystone.asset.dto.UpdateAssetRequest;
import com.keystone.asset.service.AssetService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/assets")
@RequiredArgsConstructor
public class AssetController {

    private final AssetService assetService;

    @PostMapping
    public ResponseEntity<AssetResponse> createAsset(
            @Valid @RequestBody CreateAssetRequest request) {

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(assetService.createAsset(request));
    }

    @GetMapping
    public ResponseEntity<List<AssetResponse>> getAllAssets() {

        return ResponseEntity.ok(assetService.getAllAssets());
    }

    @GetMapping("/{id}")
    public ResponseEntity<AssetResponse> getAssetById(
            @PathVariable UUID id) {

        return ResponseEntity.ok(assetService.getAssetById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<AssetResponse> updateAsset(
            @PathVariable UUID id,
            @Valid @RequestBody UpdateAssetRequest request) {

        return ResponseEntity.ok(
                assetService.updateAsset(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAsset(
            @PathVariable UUID id) {

        assetService.deleteAsset(id);
        return ResponseEntity.noContent().build();
    }
}