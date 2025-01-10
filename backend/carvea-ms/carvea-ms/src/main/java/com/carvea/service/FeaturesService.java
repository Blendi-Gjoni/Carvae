package com.carvea.service;

import com.carvea.dto.FeaturesDto;
import com.carvea.model.Features;
import com.carvea.repository.FeaturesRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class FeaturesService {
    private final FeaturesRepository featuresRepository;
    public FeaturesService(FeaturesRepository featuresRepository) {
        this.featuresRepository = featuresRepository;
    }

    public List<FeaturesDto> getAllFeatures() {
        List<Features> features = featuresRepository.findAll();
        return features.stream()
                .map(feature -> new FeaturesDto(feature.getId(), feature.getName(), feature.getDescription()))
                .collect(Collectors.toList());
    }
}
