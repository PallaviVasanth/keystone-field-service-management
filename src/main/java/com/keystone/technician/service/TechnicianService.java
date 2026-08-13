package com.keystone.technician.service;

import com.keystone.technician.dto.CreateTechnicianRequest;
import com.keystone.technician.dto.TechnicianResponse;
import com.keystone.technician.dto.UpdateTechnicianRequest;
import com.keystone.technician.entity.Technician;
import com.keystone.technician.repository.TechnicianRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TechnicianService {

    private final TechnicianRepository technicianRepository;

    public TechnicianResponse createTechnician(CreateTechnicianRequest request) {

        if (technicianRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Technician email already exists.");
        }

        if (technicianRepository.existsByEmployeeCode(request.getEmployeeCode())) {
            throw new IllegalArgumentException("Employee code already exists.");
        }

        Technician technician = Technician.builder()
                .employeeCode(request.getEmployeeCode())
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .phoneNumber(request.getPhoneNumber())
                .specialization(request.getSpecialization())
                .build();

        return mapToResponse(technicianRepository.save(technician));
    }

    public List<TechnicianResponse> getAllTechnicians() {

        return technicianRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public TechnicianResponse getTechnicianById(UUID id) {

        Technician technician = technicianRepository.findById(id)
                .orElseThrow(() ->
                        new IllegalArgumentException("Technician not found."));

        return mapToResponse(technician);
    }

    public TechnicianResponse updateTechnician(UUID id, UpdateTechnicianRequest request) {

        Technician technician = technicianRepository.findById(id)
                .orElseThrow(() ->
                        new IllegalArgumentException("Technician not found."));

        technician.setFirstName(request.getFirstName());
        technician.setLastName(request.getLastName());
        technician.setEmail(request.getEmail());
        technician.setPhoneNumber(request.getPhoneNumber());
        technician.setSpecialization(request.getSpecialization());
        technician.setActive(request.getActive());

        return mapToResponse(technicianRepository.save(technician));
    }

    public void deleteTechnician(UUID id) {

        Technician technician = technicianRepository.findById(id)
                .orElseThrow(() ->
                        new IllegalArgumentException("Technician not found."));

        technicianRepository.delete(technician);
    }

    private TechnicianResponse mapToResponse(Technician technician) {

        return TechnicianResponse.builder()
                .id(technician.getId())
                .employeeCode(technician.getEmployeeCode())
                .firstName(technician.getFirstName())
                .lastName(technician.getLastName())
                .email(technician.getEmail())
                .phoneNumber(technician.getPhoneNumber())
                .specialization(technician.getSpecialization())
                .active(technician.getActive())
                .createdAt(technician.getCreatedAt())
                .updatedAt(technician.getUpdatedAt())
                .build();
    }
}