package com.carvea.service;

import com.carvea.dto.RentalDto;

import java.util.List;

public interface RentalService {
    public RentalDto addRental(RentalDto rentalDto);
    public RentalDto getRentalById(Long id);
    public List<RentalDto> getAllRentals();
    public RentalDto updateRental(Long id, RentalDto rentalDto);
    public void deleteRental(Long id);
    public List<RentalDto> searchRentalsByName(String name);
    public List<String> getRentalCities();
    public List<Object[]> getNumberOfRentalsByCity();
    public List<RentalDto> searchRentalsByCity(String city);
}
