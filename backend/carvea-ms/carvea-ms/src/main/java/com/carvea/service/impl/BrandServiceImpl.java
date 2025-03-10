package com.carvea.service.impl;

import com.carvea.model.Brand;
import com.carvea.repository.BrandRepository;
import com.carvea.service.BrandService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class BrandServiceImpl implements BrandService {
    private final BrandRepository brandRepository;

    public BrandServiceImpl(BrandRepository brandRepository) {
        this.brandRepository = brandRepository;
    }

    public List<Brand> getAllBrands() {
        List<Brand> brands = new ArrayList<>();
        brandRepository.findAll().forEach(brands::add);
        return brands;
    }

    public Brand addBrand(Brand brand) {
        return brandRepository.save(brand);
    }
}
