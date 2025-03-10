package com.carvea.service;

import com.carvea.model.Category;

import java.util.List;

public interface CategoryService {
    public List<Category> getAllCategories();
    public Category addCategory(Category category);
}
