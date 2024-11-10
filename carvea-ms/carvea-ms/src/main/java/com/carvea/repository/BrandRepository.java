package com.carvea.repository;

import com.carvea.model.Brand;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BrandRepository extends CrudRepository<Brand, Long> {
    List<Brand> findByName(String name);
    List<Brand> findByCountry(String country);
}
