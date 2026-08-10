package com.keystone.dashboard.service;

import com.keystone.asset.repository.AssetRepository;
import com.keystone.customer.repository.CustomerRepository;
import com.keystone.dashboard.dto.DashboardSummaryResponse;
import com.keystone.site.repository.SiteRepository;
import com.keystone.technician.repository.TechnicianRepository;
import com.keystone.workorder.entity.WorkOrder;
import com.keystone.workorder.repository.WorkOrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final CustomerRepository customerRepository;
    private final SiteRepository siteRepository;
    private final AssetRepository assetRepository;
    private final TechnicianRepository technicianRepository;
    private final WorkOrderRepository workOrderRepository;

    public DashboardSummaryResponse getSummary() {

        long totalCustomers = customerRepository.count();
        long totalSites = siteRepository.count();
        long totalAssets = assetRepository.count();
        long totalTechnicians = technicianRepository.count();
        long totalWorkOrders = workOrderRepository.count();

        long openWorkOrders = workOrderRepository.findAll()
                .stream()
                .filter(workOrder ->
                        "OPEN".equalsIgnoreCase(workOrder.getStatus()))
                .count();

        long completedWorkOrders = workOrderRepository.findAll()
                .stream()
                .filter(workOrder ->
                        "COMPLETED".equalsIgnoreCase(workOrder.getStatus()))
                .count();

        return DashboardSummaryResponse.builder()
                .totalCustomers(totalCustomers)
                .totalSites(totalSites)
                .totalAssets(totalAssets)
                .totalTechnicians(totalTechnicians)
                .totalWorkOrders(totalWorkOrders)
                .openWorkOrders(openWorkOrders)
                .completedWorkOrders(completedWorkOrders)
                .build();
    }
}