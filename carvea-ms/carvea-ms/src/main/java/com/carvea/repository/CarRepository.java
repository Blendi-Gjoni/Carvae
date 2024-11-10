package com.carvea.repository;

import com.carvea.model.Brand;
import com.carvea.model.Car;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CarRepository extends CrudRepository<Car, Long> {
    List<Car> findByModel(String model);
    List<Car> findByBrand(Brand brand);
    List<Car> findByYear(int year);
    List<Car> findByYearAndBrand(int year, Brand brand);
}
