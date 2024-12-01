package com.carvea.service;

import com.carvea.dto.RentalDto;
import com.carvea.mapper.RentalMapper;
import com.carvea.model.Rental;
import com.carvea.repository.RentalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RentalService {
    @Autowired
    private RentalRepository rentalRepository;

    public RentalDto addRental(RentalDto rentalDto) {
        Rental rental = RentalMapper.toRentalEntity(rentalDto);
        Rental savedRental = rentalRepository.save(rental);
        return RentalMapper.toRentalDto(savedRental);
    }

    public RentalDto getRentalById(Long id) {
        Rental rental = rentalRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Rental not found"));
        return RentalMapper.toRentalDto(rental);
    }

    public List<RentalDto> getAllRentals() {
        List<Rental> rentals = rentalRepository.findAll();
        return rentals.stream()
                .map(RentalMapper::toRentalDto)
                .collect(Collectors.toList());
    }

    public RentalDto updateRental(Long id, RentalDto rentalDto) {
        Rental existingRental = rentalRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Rental not found"));
        Rental updatedRental = RentalMapper.toRentalEntity(rentalDto);
        updatedRental.setId(existingRental.getId());
        rentalRepository.save(updatedRental);
        return RentalMapper.toRentalDto(updatedRental);
    }

    public void deleteRental(Long id) {
        Rental rental = rentalRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Rental not found"));
        rentalRepository.delete(rental);
    }
}
