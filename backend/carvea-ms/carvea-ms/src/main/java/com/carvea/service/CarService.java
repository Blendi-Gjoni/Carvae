package com.carvea.service;

import com.carvea.dto.CarDto;
import com.carvea.model.Car;
import com.carvea.model.Category;
import com.carvea.model.Features;
import com.carvea.model.Model;
import com.carvea.repository.CarRepository;
import com.carvea.repository.CategoryRepository;
import com.carvea.repository.FeaturesRepository;
import com.carvea.repository.ModelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CarService {

    @Autowired
    private CarRepository carRepository;

    @Autowired
    private ModelRepository modelRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private FeaturesRepository featuresRepository;

    public Car addCar(CarDto carDTO) {
        // Fetch related entities by their IDs
        Model model = modelRepository.findById(carDTO.getModelId())
                .orElseThrow(() -> new RuntimeException("Model not found with ID: " + carDTO.getModelId()));
        Category category = categoryRepository.findById(carDTO.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found with ID: " + carDTO.getCategoryId()));
        List<Features> features = featuresRepository.findAllById(carDTO.getFeaturesId());

        // Create the Car entity
        Car car = new Car(
                model,
                carDTO.getYear(),
                carDTO.getPrice(),
                carDTO.getRentPrice(),
                carDTO.getHorsepower(),
                carDTO.getKilometers(),
                carDTO.getDescription(),
                carDTO.getExterior(),
                carDTO.getInterior(),
                carDTO.getFuelType(),
                carDTO.getTransmission(),
                carDTO.getEngine(),
                category,
                features
        );

        // Save to the database
        return carRepository.save(car);
    }
}
