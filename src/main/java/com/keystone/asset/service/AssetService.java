package com.keystone.asset.service;

import com.keystone.asset.dto.AssetResponse;
import com.keystone.asset.dto.CreateAssetRequest;
import com.keystone.asset.dto.UpdateAssetRequest;
import com.keystone.asset.entity.Asset;
import com.keystone.asset.repository.AssetRepository;
import com.keystone.site.entity.Site;
import com.keystone.site.repository.SiteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AssetService {

    private final AssetRepository assetRepository;
    private final SiteRepository siteRepository;

    public AssetResponse createAsset(CreateAssetRequest request) {

        if (assetRepository.existsByAssetCode(request.getAssetCode())) {
            throw new IllegalArgumentException("Asset code already exists.");
        }

        Site site = siteRepository.findById(request.getSiteId())
                .orElseThrow(() ->
                        new IllegalArgumentException("Site not found."));

        Asset asset = Asset.builder()
                .site(site)
                .assetCode(request.getAssetCode())
                .assetName(request.getAssetName())
                .assetType(request.getAssetType())
                .manufacturer(request.getManufacturer())
                .model(request.getModel())
                .serialNumber(request.getSerialNumber())
                .installationDate(request.getInstallationDate())
                .warrantyExpiry(request.getWarrantyExpiry())
                .build();

        return mapToResponse(assetRepository.save(asset));
    }

    public List<AssetResponse> getAllAssets() {

        return assetRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public AssetResponse getAssetById(UUID id) {

        Asset asset = assetRepository.findById(id)
                .orElseThrow(() ->
                        new IllegalArgumentException("Asset not found."));

        return mapToResponse(asset);
    }

    public AssetResponse updateAsset(UUID id, UpdateAssetRequest request) {

        Asset asset = assetRepository.findById(id)
                .orElseThrow(() ->
                        new IllegalArgumentException("Asset not found."));

        asset.setAssetName(request.getAssetName());
        asset.setAssetType(request.getAssetType());
        asset.setManufacturer(request.getManufacturer());
        asset.setModel(request.getModel());
        asset.setSerialNumber(request.getSerialNumber());
        asset.setInstallationDate(request.getInstallationDate());
        asset.setWarrantyExpiry(request.getWarrantyExpiry());
        asset.setActive(request.getActive());

        return mapToResponse(assetRepository.save(asset));
    }

    public void deleteAsset(UUID id) {

        Asset asset = assetRepository.findById(id)
                .orElseThrow(() ->
                        new IllegalArgumentException("Asset not found."));

        assetRepository.delete(asset);
    }

    private AssetResponse mapToResponse(Asset asset) {

        return AssetResponse.builder()
                .id(asset.getId())
                .siteId(asset.getSite().getId())
                .assetCode(asset.getAssetCode())
                .assetName(asset.getAssetName())
                .assetType(asset.getAssetType())
                .manufacturer(asset.getManufacturer())
                .model(asset.getModel())
                .serialNumber(asset.getSerialNumber())
                .installationDate(asset.getInstallationDate())
                .warrantyExpiry(asset.getWarrantyExpiry())
                .active(asset.getActive())
                .createdAt(asset.getCreatedAt())
                .updatedAt(asset.getUpdatedAt())
                .build();
    }
}