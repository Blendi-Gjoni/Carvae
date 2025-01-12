package com.carvea.controller;

import com.carvea.dto.DealershipDto;
import com.carvea.service.DealershipService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/dealerships")
@AllArgsConstructor
public class DealershipController {
    private final DealershipService dealershipService;

    @PostMapping
    public ResponseEntity<DealershipDto> addDealership(@RequestBody DealershipDto dealershipDto) {
        DealershipDto savedDealership = dealershipService.addDealership(dealershipDto);
        return new ResponseEntity<>(savedDealership, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<DealershipDto> getDealershipById(@PathVariable Long id) {
        DealershipDto rentalDto = dealershipService.getDealershipById(id);
        return ResponseEntity.ok(rentalDto);
    }

    @GetMapping
    public ResponseEntity<List<DealershipDto>> getAllDealerships() {
        List<DealershipDto> rentals = dealershipService.getAllDealerships();
        return ResponseEntity.ok(rentals);
    }

    @PutMapping("/{id}")
    public ResponseEntity<DealershipDto> updateRental(@PathVariable Long id, @RequestBody DealershipDto dealershipDto) {
        DealershipDto updatedDealership = dealershipService.updateDealership(id, dealershipDto);
        return ResponseEntity.ok(updatedDealership);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDealership(@PathVariable Long id){
        dealershipService.deleteDealership(id);
        return ResponseEntity.noContent().build();
    }
}
