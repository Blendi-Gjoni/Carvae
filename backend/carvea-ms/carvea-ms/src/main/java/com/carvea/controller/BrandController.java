package com.carvea.controller;

import com.carvea.dto.ModelDto;
import com.carvea.model.Brand;
import com.carvea.service.BrandService;
import com.carvea.service.ModelService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/brands")
@RestController
public class BrandController {
    private final BrandService brandService;
    private final ModelService modelService;

    public BrandController(BrandService brandService, ModelService modelService) {
        this.brandService = brandService;
        this.modelService = modelService;
    }

    @GetMapping("/")
    public ResponseEntity<List<Brand>> getAllBrands() {
        List<Brand> brands = brandService.getAllBrands();
        return ResponseEntity.ok(brands);
    }

    @PostMapping("/add")
    public ResponseEntity<Brand> addBrand(@RequestBody Brand brand) {
        brandService.addBrand(brand);
        return ResponseEntity.ok(brand);
    }

    @GetMapping("/{brandId}/models")
    public ResponseEntity<List<ModelDto>> getModelsByBrandId(@PathVariable Long brandId) {
        List<ModelDto> models = modelService.getModelsByBrandId(brandId);
        if (models.isEmpty()) {
            return ResponseEntity.noContent().build(); // No models found
        }
        return ResponseEntity.ok(models); // Return models
    }
}
