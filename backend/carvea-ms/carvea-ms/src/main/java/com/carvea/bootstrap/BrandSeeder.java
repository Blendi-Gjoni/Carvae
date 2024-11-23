package com.carvea.bootstrap;

import com.carvea.model.Brand;
import com.carvea.repository.BrandRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class BrandSeeder {

    @Bean
    CommandLineRunner seedBrands(BrandRepository brandRepository) {
        return args -> {
            if (brandRepository.count() == 0) {
                List<Brand> brands = List.of(
                        new Brand("Toyota"),
                        new Brand("Ford"),
                        new Brand("Honda"),
                        new Brand("BMW"),
                        new Brand("Mercedes-Benz"),
                        new Brand("Volkswagen"),
                        new Brand("Audi"),
                        new Brand("Porsche"),
                        new Brand("Opel"),
                        new Brand("Hyundai"),
                        new Brand("Peugeot"),
                        new Brand("Renault")
                );

                brandRepository.saveAll(brands);
                System.out.println("Brands have been seeded.");
            }
        };
    }
}
