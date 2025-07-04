package com.carvea.service.impl;

import com.carvea.dto.RentalDto;
import com.carvea.dto.RentalRequestDto;
import com.carvea.enums.RentalCustomError;
import com.carvea.exceptions.CustomException;
import com.carvea.mapper.RentalMapper;
import com.carvea.model.Rental;
import com.carvea.repository.RentalRepository;
import com.carvea.service.RentalService;
import com.carvea.specification.RentalSpecification;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.domain.Specification;
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
public class RentalServiceImpl implements RentalService {
    private final RentalRepository rentalRepository;

    public RentalServiceImpl(RentalRepository rentalRepository) {
        this.rentalRepository = rentalRepository;
    }

    public RentalDto addRental(RentalRequestDto rentalRequestDto) throws IOException {
        Rental rental = Rental.builder()
                .name(rentalRequestDto.getName())
                .address(rentalRequestDto.getAddress())
                .city(rentalRequestDto.getCity())
                .state(rentalRequestDto.getState())
                .phoneNumber(rentalRequestDto.getPhoneNumber())
                .email(rentalRequestDto.getEmail())
                .website(rentalRequestDto.getWebsite())
                .openingHours(rentalRequestDto.getOpeningHours())
                .build();

        if (rentalRequestDto.getImage() != null && !rentalRequestDto.getImage().isEmpty()) {
            String imagePath = saveImage(rentalRequestDto.getImage(), "rentals");
            rental.setImagePath(imagePath);
        }
 
        log.info("Adding rental: {}.", rental);
        Rental savedRental = rentalRepository.save(rental);
        log.info("Successfully added rental: {}.", savedRental);
        return RentalMapper.toRentalDto(savedRental);
    }

    public RentalDto updateRental(Long id, RentalDto rentalDto) {
        Rental existingRental = rentalRepository.findById(id)
                .orElseThrow(() -> {
                    log.error("Rental with ID {} not found. Cannot update.", id);
                    return new CustomException(RentalCustomError.RENTAL_NOT_FOUND);
                });
        Rental updatedRental = RentalMapper.toRentalEntity(rentalDto);
        updatedRental.setId(existingRental.getId());
        log.info("Updating rental with ID: {}.", id);
        rentalRepository.save(updatedRental);
        log.info("Successfully updated rental with ID: {}.", id);
        return RentalMapper.toRentalDto(updatedRental);
    }

    public RentalDto getRentalById(Long id) {
        Rental rental = rentalRepository.findById(id)
                .orElseThrow(() -> {
                    log.error("Rental with ID {} not found. Cannot get rental.", id);
                    return new CustomException(RentalCustomError.RENTAL_NOT_FOUND);
                });
        log.info("Fetched rental with ID {}.", id);
        return RentalMapper.toRentalDto(rental);
    }

    public List<RentalDto> getAllRentals() {
        List<Rental> rentals = rentalRepository.findAll();
        log.info("Fetched {} rentals from the database.", rentals.size());
        return rentals.stream().map(RentalMapper::toRentalDto).collect(Collectors.toList());
    }

    public Page<RentalDto> getAllRentalsWithPagination(PageRequest pageRequest) {
        Page<Rental> rentals = rentalRepository.findAll(pageRequest);
        if(rentals.isEmpty()) {
            log.warn("No rental found.");
        }
        List<RentalDto> rentalsDto = rentals.stream()
                .map(RentalMapper::toRentalDto)
                .collect(Collectors.toList());
        log.info("Fetched {} rentals from the database( page {} of {}).",
                rentalsDto.size(),
                pageRequest.getPageNumber(),
                rentals.getTotalPages());
        return new PageImpl<>(rentalsDto, pageRequest, rentals.getTotalElements());
    }

    public void deleteRental(Long id) {
        try{
            Rental rental = rentalRepository.findById(id)
                    .orElseThrow(() -> {
                        log.error("Rental with ID {} not found. Cannot delete.", id);
                        return new CustomException(RentalCustomError.RENTAL_NOT_FOUND);
                    });
            log.info("Deleting renal with ID: {}", id);
            rentalRepository.delete(rental);
            log.info("Successfully deleted renal with ID: {}", id);
        }catch (CustomException e) {
            log.error("Error deleting rental with ID {}: {}", id, e.getMessage());
            throw e;
        }
    }

    public List<RentalDto> searchRentalsByName(String name) {
        log.info("Searching rentals by name: {}", name);
        final Specification<Rental> specification = RentalSpecification.filterRentalByName(name);
        final List<Rental> rentals = rentalRepository.findAll(specification);
        if(rentals.isEmpty()) {
            log.warn("No rentals found matching name: {}", name);
        }
        log.info("Found {} rentals matching name: {}", rentals.size(), name);
        return rentals.stream()
                .map(RentalMapper::toRentalDto)
                .collect(Collectors.toList());
    }

    public List<String> getRentalCities(){
        log.info("Fetched rental cities.");
        return rentalRepository.findRentalCities();
    }

    public List<Object[]> getNumberOfRentalsByCity(){
        log.info("Fetched number of rentals by city.");
        return rentalRepository.findNumberOfRentalsByCity();
    }

    public List<RentalDto> searchRentalsByCity(String city) {
        log.info("Searching rentals by city: {}", city);
        final Specification<Rental> specification = RentalSpecification.filterRentalByCity(city);
        final List<Rental> rentals = rentalRepository.findAll(specification);
        if(rentals.isEmpty()) {
            log.warn("No rentals found matching city: {}", city);
        }
        log.info("Found {} rentals matching city: {}", rentals.size(), city);
        return rentals.stream()
                .map(RentalMapper::toRentalDto)
                .collect(Collectors.toList());
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
