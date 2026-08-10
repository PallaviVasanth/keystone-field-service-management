package com.keystone.technician.controller;

import com.keystone.technician.dto.CreateTechnicianRequest;
import com.keystone.technician.dto.TechnicianResponse;
import com.keystone.technician.dto.UpdateTechnicianRequest;
import com.keystone.technician.service.TechnicianService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/technicians")
@RequiredArgsConstructor
public class TechnicianController {

    private final TechnicianService technicianService;

    @PostMapping
    public ResponseEntity<TechnicianResponse> createTechnician(
            @Valid @RequestBody CreateTechnicianRequest request) {

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(technicianService.createTechnician(request));
    }

    @GetMapping
    public ResponseEntity<List<TechnicianResponse>> getAllTechnicians() {

        return ResponseEntity.ok(technicianService.getAllTechnicians());
    }

    @GetMapping("/{id}")
    public ResponseEntity<TechnicianResponse> getTechnicianById(
            @PathVariable UUID id) {

        return ResponseEntity.ok(technicianService.getTechnicianById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<TechnicianResponse> updateTechnician(
            @PathVariable UUID id,
            @Valid @RequestBody UpdateTechnicianRequest request) {

        return ResponseEntity.ok(
                technicianService.updateTechnician(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTechnician(
            @PathVariable UUID id) {

        technicianService.deleteTechnician(id);
        return ResponseEntity.noContent().build();
    }
}