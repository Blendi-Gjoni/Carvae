package com.carvea.service.impl;

import com.carvea.dto.CarApiResponseWrapperDto;
import com.carvea.dto.ModelDto;
import com.carvea.enums.ModelCustomError;
import com.carvea.exceptions.CustomException;
import com.carvea.model.Brand;
import com.carvea.model.Model;
import com.carvea.repository.BrandRepository;
import com.carvea.repository.ModelRepository;
import com.carvea.service.ModelService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@Service
public class ModelServiceImpl implements ModelService {
    private final ModelRepository modelRepository;
    private final BrandRepository brandRepository;
    private final RestTemplate restTemplate;

    public ModelServiceImpl(ModelRepository modelRepository, BrandRepository brandRepository, RestTemplate restTemplate) {
        this.modelRepository = modelRepository;
        this.brandRepository = brandRepository;
        this.restTemplate = restTemplate;
    }

    public Model addModel(Model model) {
        log.info("Adding model: {}.", model);
        Model createdModel = modelRepository.save(model);
        log.info("Successfully added model: {}.", createdModel);
        return createdModel;
    }

    public List<Model> getAllModels() {
        List<Model> models = new ArrayList<>();
        models = modelRepository.findAll();
        log.info("Fetched all models from the database!");
        return models;
    }

    public List<ModelDto> getModelsByBrandId(Long brandId) {
        List<Model> models = modelRepository.findByBrandId(brandId);
        if (models.isEmpty()) {
            log.error("No models found for brandId: {}", brandId);
            throw new CustomException(ModelCustomError.NO_MODEL_FOUND); // No models found
        }
        log.info("Fetched {} models for brandId: {}.", models.size(), brandId);
        return models.stream()
                .map(model -> new ModelDto(model.getId(), model.getName()))
                .toList(); // Convert Model entities to DTOs
    }

    public void loadBrandsAndModels() {
        List<String> makes = List.of("bmw", "mercedes-benz", "audi", "porsche", "volkswagen", "ferrari", "lamborghini", "mclaren", "rolls");


        try {
            for(String make : makes) {
                String apiUrl = "https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformake/" + make + "?format=json";

                CarApiResponseWrapperDto response = restTemplate.getForObject(apiUrl, CarApiResponseWrapperDto.class);

                if(response != null && response.getResults() != null) {
                    List<Model> modelsToSave = response.getResults().stream()
                            .map(dto -> {
                                Brand brand = brandRepository.findByName(dto.getMakeName())
                                        .orElseGet(() -> brandRepository.save(new Brand(dto.getMakeName())));
                                return new Model(dto.getModelName(), brand);
                            })
                            .filter(model -> !modelRepository.existsByNameAndBrandId(model.getName(), model.getBrand().getId()))
                            .collect(Collectors.toList());

                    if (!modelsToSave.isEmpty()) {
                        modelRepository.saveAll(modelsToSave);
                    }
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
