package com.carvea.service;

import com.carvea.model.Category;
import com.carvea.repository.CategoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {
    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    public Category addCategory(Category input) {
        Category category = new Category(input.getName(), input.getDescription());
        return categoryRepository.save(category);
    }
}
