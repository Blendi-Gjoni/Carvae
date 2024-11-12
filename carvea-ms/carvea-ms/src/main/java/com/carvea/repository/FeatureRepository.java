package com.carvea.repository;

import com.carvea.model.Feature;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FeatureRepository extends CrudRepository<Feature, Long> {
    Optional<Feature> findByName(String name);
}
