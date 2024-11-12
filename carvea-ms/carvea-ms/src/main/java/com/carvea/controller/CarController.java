package com.carvea.controller;

import com.carvea.model.Car;
import com.carvea.repository.CarRepository;
import com.carvea.service.CarService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/cars")
@RestController
public class CarController {
    private final CarService carService;

    public CarController(CarService carService) {
        this.carService = carService;
    }

    @GetMapping("/")
    public ResponseEntity<List<Car>> getCars() {
        List<Car> cars = carService.getAllCars();
        return ResponseEntity.ok(cars);
    }


    @PostMapping("/{carId}/features/{featureId}")
    public ResponseEntity<Car> addFeatureToCar(@PathVariable Long carId, @PathVariable Long featureId) {
        Car updatedCar = carService.addFeatureToCar(carId, featureId);
        return ResponseEntity.ok(updatedCar);
    }

    @DeleteMapping("/{carId}/features/{featureId}")
    public ResponseEntity<Car> removeFeatureFromCar(@PathVariable Long carId, @PathVariable Long featureId) {
        Car updatedCar = carService.removeFeatureFromCar(carId, featureId);
        return ResponseEntity.ok(updatedCar);
    }
}
