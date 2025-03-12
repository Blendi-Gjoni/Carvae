package com.carvea.service.impl;

import com.carvea.dto.ModelDto;
import com.carvea.enums.ModelCustomError;
import com.carvea.exceptions.CustomException;
import com.carvea.model.Model;
import com.carvea.repository.ModelRepository;
import com.carvea.service.ModelService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
public class ModelServiceImpl implements ModelService {
    private final ModelRepository modelRepository;

    public ModelServiceImpl(ModelRepository modelRepository) {
        this.modelRepository = modelRepository;
    }

    public Model addModel(Model model) {
        log.info("Adding model: {}.", model);
        Model createdModel = modelRepository.save(model);
        log.info("Successfully added model: {}.", createdModel);
        return createdModel;
    }

    public List<Model> getAllModels() {
        log.info("Fetched all models from the database!");
        return modelRepository.findAll();
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
}
