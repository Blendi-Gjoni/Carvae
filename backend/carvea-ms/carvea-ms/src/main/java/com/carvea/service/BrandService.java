package com.carvea.service;

import com.carvea.model.Brand;

import java.util.List;

public interface BrandService {
    public List<Brand> getAllBrands();
    public Brand addBrand(Brand brand);
}
