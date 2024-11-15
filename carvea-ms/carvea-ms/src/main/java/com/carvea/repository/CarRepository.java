package com.carvea.repository;

import com.carvea.model.Brand;
import com.carvea.model.Car;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CarRepository extends JpaRepository<Car, Long> {
    Car findByBrand(Brand brand);
}
