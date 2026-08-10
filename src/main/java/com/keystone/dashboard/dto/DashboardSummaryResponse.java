package com.keystone.dashboard.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DashboardSummaryResponse {

    private long totalCustomers;

    private long totalSites;

    private long totalAssets;

    private long totalTechnicians;

    private long totalWorkOrders;

    private long openWorkOrders;

    private long completedWorkOrders;
}