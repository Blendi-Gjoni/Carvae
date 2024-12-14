package com.carvea.repository;

import com.carvea.model.Model;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ModelRepository extends JpaRepository<Model, Long> {
    Model findByName(String name);
    List<Model> findByBrandId(Long brandId);
}
