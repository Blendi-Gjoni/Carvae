package com.carvea.bootstrap;

import com.carvea.model.Brand;
import com.carvea.model.Model;
import com.carvea.repository.BrandRepository;
import com.carvea.repository.ModelRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ModelSeeder {

    @Bean
    CommandLineRunner seedModels(BrandRepository brandRepository, ModelRepository modelRepository) {
        return args -> {
            // Check if models table is empty
            if (modelRepository.count() == 0) {
                // Seed brands first if not already present
                Brand toyota = brandRepository.findByName("Toyota")
                        .orElseGet(() -> brandRepository.save(new Brand("Toyota")));

                Brand ford = brandRepository.findByName("Ford")
                        .orElseGet(() -> brandRepository.save(new Brand("Ford")));

                Brand bmw = brandRepository.findByName("BMW")
                        .orElseGet(() -> brandRepository.save(new Brand("BMW")));

                List<Model> models = List.of(
                        new Model("Corolla", toyota),
                        new Model("Camry", toyota),
                        new Model("RAV4", toyota),

                        new Model("Mustang", ford),
                        new Model("F-150", ford),
                        new Model("Explorer", ford),

                        new Model("X5", bmw),
                        new Model("X3", bmw),
                        new Model("3 Series", bmw)
                );

                modelRepository.saveAll(models);
            }
        };
    }
}
