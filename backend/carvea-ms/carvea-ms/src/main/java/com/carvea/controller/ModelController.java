package com.carvea.controller;

import com.carvea.model.Model;
import com.carvea.service.ModelService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/models")
@RestController
public class ModelController {
    private final ModelService modelService;
    public ModelController(ModelService modelService) {
        this.modelService = modelService;
    }

    @GetMapping("/")
    public ResponseEntity<List<Model>> getModels() {
        List<Model> models = modelService.getAllModels();
        return ResponseEntity.ok(models);
    }

    @PostMapping("/add")
    public ResponseEntity<Model> addModel(@RequestBody Model model) {
        modelService.addModel(model);
        return ResponseEntity.ok(model);
    }
}
