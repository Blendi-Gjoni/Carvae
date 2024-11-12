package com.carvea.repository;

import com.carvea.model.Category;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CategoryRepository {
    Optional<Category> findById(String id);
    List<Category> findAll();
    Optional<Category> findByName(String name);
}
