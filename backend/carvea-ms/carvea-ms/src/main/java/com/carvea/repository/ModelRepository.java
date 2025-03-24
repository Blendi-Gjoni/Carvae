package com.carvea.repository;

import com.carvea.model.Model;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ModelRepository extends JpaRepository<Model, Long> {
    Model findByName(String name);
    List<Model> findByBrandId(Long brandId);
    Optional<Model> findByNameAndBrandId(String modelName, Long brandId);
    boolean existsByNameAndBrandId(String name,Long brandId);
}
