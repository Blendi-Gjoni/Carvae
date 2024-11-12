package com.carvea.controller;

import com.carvea.model.Brand;
import com.carvea.repository.BrandRepository;
import com.carvea.service.BrandService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/brands")
@RestController
public class BrandController {

    private final BrandService brandService;

    public BrandController(BrandService brandService) {
        this.brandService = brandService;
    }

    @PostMapping("/add")
    public ResponseEntity<Brand> addBrand(@RequestBody Brand brand) {
        System.out.println("Received request to add brand");
        return ResponseEntity.ok(brandService.addBrand(brand));
    }

    @GetMapping("/")
    public ResponseEntity<List<Brand>> getAllBrands() {
        List<Brand> brands = brandService.getAllBrands();
        return ResponseEntity.ok(brands);
    }
}
