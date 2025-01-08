package com.carvea.controller;

import com.carvea.model.Features;
import com.carvea.service.FeaturesService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequestMapping("/features")
@RestController
public class FeaturesController {

    private final FeaturesService featuresService;
    public FeaturesController(FeaturesService featuresService) {
        this.featuresService = featuresService;
    }

    @GetMapping
    public ResponseEntity<List<Features>> getAllFeatures() {
        List<Features> features = featuresService.getAllFeatures();
        return ResponseEntity.ok(features);
    }
}
