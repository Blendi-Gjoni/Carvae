package com.carvea.service.impl;

import com.carvea.dto.RentalDto;
import com.carvea.enums.RentalCustomError;
import com.carvea.exceptions.CustomException;
import com.carvea.mapper.RentalMapper;
import com.carvea.model.Rental;
import com.carvea.repository.RentalRepository;
import com.carvea.service.RentalService;
import com.carvea.specification.RentalSpecification;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
public class RentalServiceImpl implements RentalService {
    private final RentalRepository rentalRepository;

    public RentalServiceImpl(RentalRepository rentalRepository) {
        this.rentalRepository = rentalRepository;
    }

    public RentalDto addRental(RentalDto rentalDto) {
        Rental rental = RentalMapper.toRentalEntity(rentalDto);
        log.info("Adding rental: {}.", rental);
        Rental savedRental = rentalRepository.save(rental);
        log.info("Successfully added rental: {}.", savedRental);
        return RentalMapper.toRentalDto(savedRental);
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
        if(rentals.isEmpty()) {
            log.warn("No rental found.");
        }
        log.info("Fetched {} rentals from the database.", rentals.size());
        return rentals.stream()
                .map(RentalMapper::toRentalDto)
                .collect(Collectors.toList());
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

}
