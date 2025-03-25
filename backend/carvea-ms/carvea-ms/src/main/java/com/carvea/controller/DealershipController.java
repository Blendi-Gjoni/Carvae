package com.carvea.controller;

import com.carvea.dto.DealershipDto;
import com.carvea.dto.DealershipRequestDto;
import com.carvea.service.DealershipService;
import io.micrometer.common.util.StringUtils;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/dealerships")
@AllArgsConstructor
public class DealershipController {
    private final DealershipService dealershipService;

    @PostMapping
    public ResponseEntity<DealershipDto> addDealership(@RequestPart("dealership") DealershipRequestDto dealershipRequestDto,@RequestPart("image") MultipartFile image) throws IOException {
        dealershipRequestDto.setImage(image);
        DealershipDto savedDealership = dealershipService.addDealership(dealershipRequestDto);
        return new ResponseEntity<>(savedDealership, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<DealershipDto> getDealershipById(@PathVariable Long id) {
        DealershipDto dealershipDto = dealershipService.getDealershipById(id);
        return ResponseEntity.ok(dealershipDto);
    }

    @GetMapping
    public ResponseEntity<List<DealershipDto>> getAllDealerships() {
        List<DealershipDto> dealershipDtos = dealershipService.getAllDealerships();
        return ResponseEntity.ok(dealershipDtos);
    }

    @GetMapping("/with-pagination")
    public ResponseEntity<Page<DealershipDto>> getAllDealershipsWithPagination(
            @RequestParam(value = "offset", required = false) Integer offset,
            @RequestParam(value = "pageSize", required = false) Integer pageSize,
            @RequestParam(value = "sortBy", required = false) String sortBy
    ) {
        if(null == offset) offset = 0;
        if(null == pageSize) pageSize = 10;
        if(StringUtils.isEmpty(sortBy)) sortBy = "id";
        return ResponseEntity.ok(dealershipService.getAllDealershipsWithPagination(PageRequest.of(offset, pageSize, Sort.by(sortBy))));
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

    @GetMapping("/number-of-dealerships-by-state")
    public ResponseEntity<List<Object[]>> getNumberOfDealershipsByState(){
        List<Object[]> results = dealershipService.getNumberOfDealershipsByState();
        return ResponseEntity.ok(results);
    }
}
