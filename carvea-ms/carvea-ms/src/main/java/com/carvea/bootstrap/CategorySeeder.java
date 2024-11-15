package com.carvea.bootstrap;

import com.carvea.model.Category;
import com.carvea.repository.CategoryRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class CategorySeeder {

    @Bean
    CommandLineRunner seedCategories(CategoryRepository categoryRepository) {
        return args -> {
            if (categoryRepository.count() == 0) {
                List<Category> categories = List.of(
                        new Category("Sedan", "Elegant and efficient, sedans offer a smooth ride, ample legroom, and a secure trunk. Ideal for commuting and long drives, they balance comfort, style, and fuel economy."),
                        new Category("SUV", "Versatile and spacious, SUVs handle city drives and off-road trips. With higher ground clearance and optional all-wheel drive, they’re ideal for families and active lifestyles."),
                        new Category("Hatchback", "Compact and practical, hatchbacks feature foldable rear seats and an upward-opening rear door. Great for city living, they’re fuel-efficient and stylish."),
                        new Category("Coupe", "Sporty and sleek, coupes are stylish two-door cars with a thrilling driving experience. Designed for performance and aesthetics, they’re perfect for enthusiasts."),
                        new Category("Convertible", "Open-air luxury, convertibles feature a retractable roof for a unique driving experience. Perfect for sunny days and scenic drives.")
                );

                categoryRepository.saveAll(categories);
            }
        };
    }
}
