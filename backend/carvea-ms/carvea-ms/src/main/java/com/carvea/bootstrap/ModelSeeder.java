package com.carvea.bootstrap;

import com.carvea.service.impl.ModelServiceImpl;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;


@Component
public class ModelSeeder {

    @Bean
    CommandLineRunner seedModelsAndBrands(ModelServiceImpl modelService) {
        return args -> { modelService.loadBrandsAndModels(); };
    }
}
