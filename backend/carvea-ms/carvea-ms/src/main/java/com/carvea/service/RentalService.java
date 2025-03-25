package com.carvea.service;

import com.carvea.dto.RentalDto;
import com.carvea.dto.RentalRequestDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import java.io.IOException;
import java.util.List;

public interface RentalService {
    public RentalDto addRental(RentalRequestDto rentalRequestDto) throws IOException;
    public RentalDto getRentalById(Long id);
    public List<RentalDto> getAllRentals();
    public Page<RentalDto> getAllRentalsWithPagination(PageRequest pageRequest);
    public RentalDto updateRental(Long id, RentalDto rentalDto);
    public void deleteRental(Long id);
    public List<RentalDto> searchRentalsByName(String name);
    public List<String> getRentalCities();
    public List<Object[]> getNumberOfRentalsByCity();
    public List<RentalDto> searchRentalsByCity(String city);
}
