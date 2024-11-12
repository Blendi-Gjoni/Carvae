package com.carvea.repository;

import com.carvea.model.Brand;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BrandRepository extends JpaRepository<Brand, Long> {
    List<Brand> findByName(String name);
    List<Brand> findByCountry(String country);
}
