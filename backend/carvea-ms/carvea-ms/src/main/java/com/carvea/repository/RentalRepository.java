package com.carvea.repository;

import com.carvea.model.Rental;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RentalRepository extends JpaRepository<Rental, Long>, JpaSpecificationExecutor<Rental> {
    List<Rental> findAll(Specification<Rental> specification);

    @Query("SELECT DISTINCT r.city FROM Rental r")
    List<String> findRentalCities();

    @Query("SELECT r.city, COUNT(r) FROM Rental r GROUP BY r.city")
    List<Object[]> findNumberOfRentalsByCity();
}
