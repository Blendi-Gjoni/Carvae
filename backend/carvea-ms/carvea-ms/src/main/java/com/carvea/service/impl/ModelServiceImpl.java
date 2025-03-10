package com.carvea.service.impl;

import com.carvea.dto.ModelDto;
import com.carvea.model.Model;
import com.carvea.repository.ModelRepository;
import com.carvea.service.ModelService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ModelServiceImpl implements ModelService {
    private final ModelRepository modelRepository;

    public ModelServiceImpl(ModelRepository modelRepository) {
        this.modelRepository = modelRepository;
    }

    public Model addModel(Model model) {
        return modelRepository.save(model);
    }

    public List<Model> getAllModels() {
        return modelRepository.findAll();
    }

    public List<ModelDto> getModelsByBrandId(Long brandId) {
        List<Model> models = modelRepository.findByBrandId(brandId);
        return models.stream()
                .map(model -> new ModelDto(model.getId(), model.getName()))
                .toList(); // Convert Model entities to DTOs
    }
}
