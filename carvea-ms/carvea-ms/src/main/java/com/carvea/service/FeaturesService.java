package com.carvea.service;

import com.carvea.model.Features;
import com.carvea.repository.FeaturesRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FeaturesService {
    private final FeaturesRepository featuresRepository;
    public FeaturesService(FeaturesRepository featuresRepository) {
        this.featuresRepository = featuresRepository;
    }

    public List<Features> getAllFeatures() {
        return featuresRepository.findAll();
    }
}
