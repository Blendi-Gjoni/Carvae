package com.carvea.service;

import com.carvea.model.Feature;
import com.carvea.repository.FeatureRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class FeatureService {
    private final FeatureRepository featureRepository;
    public FeatureService(FeatureRepository featureRepository) {
        this.featureRepository = featureRepository;
    }

    public List<Feature> getAllFeatures() {
        List<Feature> features = new ArrayList<>();
        featureRepository.findAll().forEach(feature -> features.add(feature));
        return features;
    }
}
