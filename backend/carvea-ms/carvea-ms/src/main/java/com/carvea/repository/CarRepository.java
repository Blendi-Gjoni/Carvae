package com.carvea.repository;

import com.carvea.model.Car;
import com.carvea.model.Model;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CarRepository extends JpaRepository<Car, Long> {
    Car findByModel(Model model);

    @Query("SELECT c FROM Car c WHERE TYPE(c) = :carType")
    List<Car> findCarsByType(@Param("carType") Class<? extends Car> carType);
}
