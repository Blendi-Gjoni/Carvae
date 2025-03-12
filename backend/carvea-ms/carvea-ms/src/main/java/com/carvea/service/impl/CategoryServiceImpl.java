package com.carvea.service.impl;

import com.carvea.model.Category;
import com.carvea.repository.CategoryRepository;
import com.carvea.service.CategoryService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
public class CategoryServiceImpl implements CategoryService {
    private final CategoryRepository categoryRepository;

    public CategoryServiceImpl(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public List<Category> getAllCategories() {
        log.info("Fetched all categories from the database.");
        return categoryRepository.findAll();
    }

    public Category addCategory(Category category) {
        log.info("Adding category: {}.", category);
        Category createdCategory = categoryRepository.save(category);
        log.info("Successfully added category: {}.", createdCategory);
        return createdCategory;
    }
}
