package com.carvea.service;

import com.carvea.dto.DealershipDto;
import com.carvea.mapper.DealershipMapper;
import com.carvea.model.Dealership;
import com.carvea.repository.DealershipRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DealershipService {
    @Autowired
    private DealershipRepository dealershipRepository;

    public DealershipDto addDealership(DealershipDto dealershipDto) {
        Dealership dealership = DealershipMapper.toDealershipEntity(dealershipDto);
        Dealership savedDealership = dealershipRepository.save(dealership);
        return DealershipMapper.toDealershipDto(savedDealership);
    }

    public DealershipDto getDealershipById(Long id) {
        Dealership dealership = dealershipRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Dealership not found"));
        return DealershipMapper.toDealershipDto(dealership);
    }

    public List<DealershipDto> getAllDealerships() {
        List<Dealership> dealerships = dealershipRepository.findAll();
        return dealerships.stream()
                .map(DealershipMapper::toDealershipDto)
                .collect(Collectors.toList());
    }

    public DealershipDto updateDealership(Long id, DealershipDto dealershipDto) {
        Dealership existingDealership = dealershipRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Dealership not found"));
        Dealership updatedDealership = DealershipMapper.toDealershipEntity(dealershipDto);
        updatedDealership.setId(existingDealership.getId());
        dealershipRepository.save(updatedDealership);
        return DealershipMapper.toDealershipDto(updatedDealership);
    }

    public void deleteDealership(Long id) {
        Dealership dealership = dealershipRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Dealership not found"));
        dealershipRepository.delete(dealership);
    }

    public List<Object[]> getNumberOfDealershipsByState(){
        return dealershipRepository.findNumberOfDealershipsByState();
    }
}
