package com.carvea.service;

import com.carvea.dto.ModelDto;
import com.carvea.model.Model;

import java.util.List;

public interface ModelService {
    public Model addModel(Model model);
    public List<Model> getAllModels();
    public List<ModelDto> getModelsByBrandId(Long brandId);
    public void loadBrandsAndModels();
}
