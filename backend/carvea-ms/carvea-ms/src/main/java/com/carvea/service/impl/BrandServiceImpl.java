package com.carvea.service.impl;

import com.carvea.model.Brand;
import com.carvea.repository.BrandRepository;
import com.carvea.service.BrandService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
public class BrandServiceImpl implements BrandService {
    private final BrandRepository brandRepository;

    public BrandServiceImpl(BrandRepository brandRepository) {
        this.brandRepository = brandRepository;
    }

    public List<Brand> getAllBrands() {
        List<Brand> brands = new ArrayList<>();
        brandRepository.findAll().forEach(brands::add);
        if(brands.isEmpty()){
            log.info("No brands found");
        }
        log.info("Fetched {} brands from database.", brands.size());
        return brands;
    }

    public Brand addBrand(Brand brand) {
        log.info("Adding brand: {}.", brand);
        Brand createdBrand = brandRepository.save(brand);
        log.info("Successfully added brand: {}.", createdBrand);
        return createdBrand;
    }
}
