package com.carvea.service.impl;

import com.carvea.dto.FeaturesDto;
import com.carvea.model.Features;
import com.carvea.repository.FeaturesRepository;
import com.carvea.service.FeaturesService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
public class FeaturesServiceImpl implements FeaturesService {
    private final FeaturesRepository featuresRepository;

    public FeaturesServiceImpl(FeaturesRepository featuresRepository) {
        this.featuresRepository = featuresRepository;
    }

    public List<FeaturesDto> getAllFeatures() {
        List<Features> features = featuresRepository.findAll();
        if(features.isEmpty()) {
            log.warn("No Features found!");
        }
        log.info("Fetched {} features from the database.", features.size());
        return features.stream()
                .map(feature -> new FeaturesDto(feature.getId(), feature.getName(), feature.getDescription()))
                .collect(Collectors.toList());
    }
}
