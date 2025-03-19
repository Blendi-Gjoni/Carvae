package com.carvea.service.impl;

import com.carvea.dto.DealershipDto;
import com.carvea.dto.DealershipRequestDto;
import com.carvea.enums.DealershipCustomError;
import com.carvea.exceptions.CustomException;
import com.carvea.mapper.DealershipMapper;
import com.carvea.model.Dealership;
import com.carvea.repository.DealershipRepository;
import com.carvea.service.DealershipService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
public class DealershipServiceImpl implements DealershipService {
    private final DealershipRepository dealershipRepository;

    public DealershipServiceImpl(DealershipRepository dealershipRepository) {
        this.dealershipRepository = dealershipRepository;
    }

    public DealershipDto addDealership(DealershipRequestDto dealershipRequestDto) throws IOException {
        Dealership dealership = Dealership.builder()
                .name(dealershipRequestDto.getName())
                .address(dealershipRequestDto.getAddress())
                .city(dealershipRequestDto.getCity())
                .state(dealershipRequestDto.getState())
                .phoneNumber(dealershipRequestDto.getPhoneNumber())
                .email(dealershipRequestDto.getEmail())
                .website(dealershipRequestDto.getWebsite())
                .openingHours(dealershipRequestDto.getOpeningHours())
                .build();

        if(dealershipRequestDto.getImage() != null && !dealershipRequestDto.getImage().isEmpty()) {
            String imagePath = saveImage(dealershipRequestDto.getImage(), "dealerships");
            dealership.setImagePath(imagePath);
        }

        log.info("Adding dealership: {}.", dealership);
        Dealership savedDealership = dealershipRepository.save(dealership);
        log.info("Successfully added dealership: {}.", savedDealership);
        return DealershipMapper.toDealershipDto(savedDealership);
    }

    public DealershipDto getDealershipById(Long id) {
        Dealership dealership = dealershipRepository.findById(id)
                .orElseThrow(() -> {
                    log.error("Dealership with ID {} not found. Cannot get dealership.", id);
                    return new CustomException(DealershipCustomError.DEALERSHIP_NOT_FOUND);
                });
        log.info("Fetched dealership with ID {}.", id);
        return DealershipMapper.toDealershipDto(dealership);
    }

    public List<DealershipDto> getAllDealerships() {
        List<Dealership> dealerships = dealershipRepository.findAll();
        if(dealerships.isEmpty()) {
            log.warn("No dealerships found!");
        }
        log.info("Fetched {} dealerships from the database.", dealerships.size());
        return dealerships.stream()
                .map(DealershipMapper::toDealershipDto)
                .collect(Collectors.toList());
    }

    public DealershipDto updateDealership(Long id, DealershipDto dealershipDto) {
        Dealership existingDealership = dealershipRepository.findById(id)
                .orElseThrow(() -> {
                    log.error("Dealership with ID {} not found. Cannot update.", id);
                    return new CustomException(DealershipCustomError.DEALERSHIP_NOT_FOUND);
                });
        log.info("Updating dealership with ID: {}.", id);
        Dealership updatedDealership = DealershipMapper.toDealershipEntity(dealershipDto);
        updatedDealership.setId(existingDealership.getId());
        dealershipRepository.save(updatedDealership);
        log.info("Successfully updated dealership: {}.", updatedDealership);
        return DealershipMapper.toDealershipDto(updatedDealership);
    }

    public void deleteDealership(Long id) {
        Dealership dealership = dealershipRepository.findById(id)
                .orElseThrow(() -> {
                    log.error("Dealership with ID {} not found. Cannot delete.", id);
                    return new CustomException(DealershipCustomError.DEALERSHIP_NOT_FOUND);
                });
        log.info("Deleting dealership with ID: {}.", id);
        dealershipRepository.delete(dealership);
        log.info("Successfully deleted dealership with ID: {}.", id);
    }

    public List<Object[]> getNumberOfDealershipsByState(){
        log.info("Fetched number of Dealerships by state.");
        return dealershipRepository.findNumberOfDealershipsByState();
    }

    private String saveImage(MultipartFile image, String folder) throws IOException {
        String uploadDir = "uploads/" + folder;
        File directory = new File(uploadDir);
        if (!directory.exists()) {
            directory.mkdirs();
        }

        String fileName = System.currentTimeMillis() + "_" + image.getOriginalFilename();
        Path filePath = Paths.get(directory.getAbsolutePath(), fileName);

        Files.copy(image.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        return folder + "/" + fileName;
    }
}
