package com.carvea.controller;

import com.carvea.dto.RentalDto;
import com.carvea.dto.RentalRequestDto;
import com.carvea.service.RentalService;
import io.micrometer.common.util.StringUtils;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/rentals")
@AllArgsConstructor
public class RentalController {
    private final RentalService rentalService;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<RentalDto> addRental(@RequestPart("rental") RentalRequestDto rentalRequestDto, @RequestPart(value = "image") MultipartFile image) throws IOException {
        rentalRequestDto.setImage(image);
        RentalDto savedRental = rentalService.addRental(rentalRequestDto);
        return new ResponseEntity<>(savedRental, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<RentalDto> getRentalById(@PathVariable Long id) {
        RentalDto rentalDto = rentalService.getRentalById(id);
        return ResponseEntity.ok(rentalDto);
    }

    @GetMapping
    public ResponseEntity<List<RentalDto>> getAllRentals() {
        List<RentalDto> rentalDtos = rentalService.getAllRentals();
        return ResponseEntity.ok(rentalDtos);
    }

    @GetMapping("/with-pagination")
    public ResponseEntity<Page<RentalDto>> getAllRentalsWithPagination(
            @RequestParam(value = "offset", required = false) Integer offset,
            @RequestParam(value = "pageSize", required = false) Integer pageSize,
            @RequestParam(value = "sortBy", required = false) String sortBy
    ) {
        if(null == offset) offset = 0;
        if(null == pageSize) pageSize = 10;
        if(StringUtils.isEmpty(sortBy)) sortBy = "id";
        return ResponseEntity.ok(rentalService.getAllRentalsWithPagination(PageRequest.of(offset, pageSize, Sort.by(sortBy))));
    }

    @PutMapping("/{id}")
    public ResponseEntity<RentalDto> updateRental(@PathVariable Long id, @RequestBody RentalDto rentalDto) {
        RentalDto updatedRental = rentalService.updateRental(id, rentalDto);
        return ResponseEntity.ok(updatedRental);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRental(@PathVariable Long id){
        rentalService.deleteRental(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/by-name")
    public ResponseEntity<List<RentalDto>> getRentalByName(
            @RequestParam(required = false) String name
    ){
        return ResponseEntity.ok(rentalService.searchRentalsByName(name));
    }

    @GetMapping("/rental-cities")
    public ResponseEntity<List<String>> getRentalCities(){
        List<String> cities = rentalService.getRentalCities();
        return ResponseEntity.ok(cities);
    }

    @GetMapping("/number-of-rentals-by-city")
    public ResponseEntity<List<Object[]>> getNumberOfRentalsByCity(){
        List<Object[]> results = rentalService.getNumberOfRentalsByCity();
        return ResponseEntity.ok(results);
    }

    @GetMapping("/by-city")
    public ResponseEntity<List<RentalDto>> getRentalByCity(
            @RequestParam(required = false) String city
    ){
        return ResponseEntity.ok(rentalService.searchRentalsByCity(city));
    }
}
