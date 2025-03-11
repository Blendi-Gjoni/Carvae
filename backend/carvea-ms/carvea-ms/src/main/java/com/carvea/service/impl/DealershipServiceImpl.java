package com.carvea.service.impl;

import com.carvea.dto.DealershipDto;
import com.carvea.enums.DealershipCustomError;
import com.carvea.exceptions.CustomException;
import com.carvea.mapper.DealershipMapper;
import com.carvea.model.Dealership;
import com.carvea.repository.DealershipRepository;
import com.carvea.service.DealershipService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DealershipServiceImpl implements DealershipService {
    @Autowired
    private DealershipRepository dealershipRepository;

    public DealershipDto addDealership(DealershipDto dealershipDto) {
        Dealership dealership = DealershipMapper.toDealershipEntity(dealershipDto);
        Dealership savedDealership = dealershipRepository.save(dealership);
        return DealershipMapper.toDealershipDto(savedDealership);
    }

    public DealershipDto getDealershipById(Long id) {
        Dealership dealership = dealershipRepository.findById(id)
                .orElseThrow(() -> new CustomException(DealershipCustomError.DEALERSHIP_NOT_FOUND));
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
                .orElseThrow(() -> new CustomException(DealershipCustomError.DEALERSHIP_NOT_FOUND));
        Dealership updatedDealership = DealershipMapper.toDealershipEntity(dealershipDto);
        updatedDealership.setId(existingDealership.getId());
        dealershipRepository.save(updatedDealership);
        return DealershipMapper.toDealershipDto(updatedDealership);
    }

    public void deleteDealership(Long id) {
        Dealership dealership = dealershipRepository.findById(id)
                .orElseThrow(() -> new CustomException(DealershipCustomError.DEALERSHIP_NOT_FOUND));
        dealershipRepository.delete(dealership);
    }

    public List<Object[]> getNumberOfDealershipsByState(){
        return dealershipRepository.findNumberOfDealershipsByState();
    }
}
