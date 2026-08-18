package com.keystone.workorder.controller;

import com.keystone.workorder.dto.CreateWorkOrderRequest;
import com.keystone.workorder.dto.UpdateWorkOrderRequest;
import com.keystone.workorder.dto.WorkOrderResponse;
import com.keystone.workorder.service.WorkOrderService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/workorders")
@RequiredArgsConstructor
public class WorkOrderController {

    private final WorkOrderService workOrderService;

    @PostMapping
    public ResponseEntity<WorkOrderResponse> createWorkOrder(
            @Valid @RequestBody CreateWorkOrderRequest request
    ) {

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(workOrderService.createWorkOrder(request));
    }

    @GetMapping
    public ResponseEntity<List<WorkOrderResponse>> getAllWorkOrders() {

        return ResponseEntity.ok(
                workOrderService.getAllWorkOrders()
        );
    }

    /**
     * Returns only the authenticated customer's work orders.
     */
    @GetMapping("/my")
    public ResponseEntity<List<WorkOrderResponse>> getMyWorkOrders(
            Authentication authentication
    ) {

        return ResponseEntity.ok(
                workOrderService.getMyWorkOrders(
                        authentication.getName()
                )
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<WorkOrderResponse> getWorkOrderById(
            @PathVariable UUID id
    ) {

        return ResponseEntity.ok(
                workOrderService.getWorkOrderById(id)
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<WorkOrderResponse> updateWorkOrder(
            @PathVariable UUID id,
            @Valid @RequestBody UpdateWorkOrderRequest request
    ) {

        return ResponseEntity.ok(
                workOrderService.updateWorkOrder(id, request)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteWorkOrder(
            @PathVariable UUID id
    ) {

        workOrderService.deleteWorkOrder(id);

        return ResponseEntity.noContent().build();
    }
}