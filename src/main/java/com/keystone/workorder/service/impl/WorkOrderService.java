package com.keystone.workorder.service;

import com.keystone.customer.entity.Customer;
import com.keystone.customer.repository.CustomerRepository;
import com.keystone.site.entity.Site;
import com.keystone.site.repository.SiteRepository;
import com.keystone.technician.entity.Technician;
import com.keystone.technician.repository.TechnicianRepository;
import com.keystone.workorder.dto.CreateWorkOrderRequest;
import com.keystone.workorder.dto.UpdateWorkOrderRequest;
import com.keystone.workorder.dto.WorkOrderResponse;
import com.keystone.workorder.entity.WorkOrder;
import com.keystone.workorder.repository.WorkOrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class WorkOrderService {

    private final WorkOrderRepository workOrderRepository;
    private final CustomerRepository customerRepository;
    private final SiteRepository siteRepository;
    private final TechnicianRepository technicianRepository;

    public WorkOrderResponse createWorkOrder(CreateWorkOrderRequest request) {

        if (workOrderRepository.existsByWorkOrderNumber(request.getWorkOrderNumber())) {
            throw new IllegalArgumentException("Work Order Number already exists.");
        }

        Customer customer = customerRepository.findById(request.getCustomerId())
                .orElseThrow(() -> new IllegalArgumentException("Customer not found."));

        Site site = siteRepository.findById(request.getSiteId())
                .orElseThrow(() -> new IllegalArgumentException("Site not found."));

        Technician technician = null;

        if (request.getTechnicianId() != null) {
            technician = technicianRepository.findById(request.getTechnicianId())
                    .orElseThrow(() -> new IllegalArgumentException("Technician not found."));
        }

        WorkOrder workOrder = WorkOrder.builder()
                .workOrderNumber(request.getWorkOrderNumber())
                .customer(customer)
                .site(site)
                .technician(technician)
                .title(request.getTitle())
                .description(request.getDescription())
                .priority(request.getPriority())
                .status(request.getStatus())
                .scheduledDate(request.getScheduledDate())
                .build();

        return mapToResponse(workOrderRepository.save(workOrder));
    }

    public List<WorkOrderResponse> getAllWorkOrders() {

        return workOrderRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public WorkOrderResponse getWorkOrderById(UUID id) {

        WorkOrder workOrder = workOrderRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Work Order not found."));

        return mapToResponse(workOrder);
    }

    public WorkOrderResponse updateWorkOrder(UUID id, UpdateWorkOrderRequest request) {

        WorkOrder workOrder = workOrderRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Work Order not found."));

        Technician technician = null;

        if (request.getTechnicianId() != null) {
            technician = technicianRepository.findById(request.getTechnicianId())
                    .orElseThrow(() -> new IllegalArgumentException("Technician not found."));
        }

        workOrder.setTechnician(technician);
        workOrder.setTitle(request.getTitle());
        workOrder.setDescription(request.getDescription());
        workOrder.setPriority(request.getPriority());
        workOrder.setStatus(request.getStatus());
        workOrder.setScheduledDate(request.getScheduledDate());
        workOrder.setCompletedDate(request.getCompletedDate());

        return mapToResponse(workOrderRepository.save(workOrder));
    }

    public void deleteWorkOrder(UUID id) {

        WorkOrder workOrder = workOrderRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Work Order not found."));

        workOrderRepository.delete(workOrder);
    }

    private WorkOrderResponse mapToResponse(WorkOrder workOrder) {

        return WorkOrderResponse.builder()
                .id(workOrder.getId())
                .workOrderNumber(workOrder.getWorkOrderNumber())
                .customerId(workOrder.getCustomer().getId())
                .siteId(workOrder.getSite().getId())
                .technicianId(
                        workOrder.getTechnician() != null
                                ? workOrder.getTechnician().getId()
                                : null)
                .title(workOrder.getTitle())
                .description(workOrder.getDescription())
                .priority(workOrder.getPriority())
                .status(workOrder.getStatus())
                .scheduledDate(workOrder.getScheduledDate())
                .completedDate(workOrder.getCompletedDate())
                .createdAt(workOrder.getCreatedAt())
                .updatedAt(workOrder.getUpdatedAt())
                .build();
    }
}