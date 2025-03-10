package com.carvea.service.impl;

import com.carvea.dto.RentalDto;
import com.carvea.mapper.RentalMapper;
import com.carvea.model.Rental;
import com.carvea.repository.RentalRepository;
import com.carvea.service.RentalService;
import com.carvea.specification.RentalSpecification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RentalServiceImpl implements RentalService {
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

    public List<RentalDto> searchRentalsByName(String name) {
        final Specification<Rental> specification = RentalSpecification.filterRentalByName(name);
        final List<Rental> rentals = rentalRepository.findAll(specification);
        return rentals.stream()
                .map(RentalMapper::toRentalDto)
                .collect(Collectors.toList());
    }

    public List<String> getRentalCities(){
        return rentalRepository.findRentalCities();
    }

    public List<Object[]> getNumberOfRentalsByCity(){
        return rentalRepository.findNumberOfRentalsByCity();
    }

    public List<RentalDto> searchRentalsByCity(String city) {
        final Specification<Rental> specification = RentalSpecification.filterRentalByCity(city);
        final List<Rental> rentals = rentalRepository.findAll(specification);
        return rentals.stream()
                .map(RentalMapper::toRentalDto)
                .collect(Collectors.toList());
    }

}
