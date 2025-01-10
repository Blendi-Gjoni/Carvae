package com.carvea.controller;


import com.carvea.dto.CarDto;
import com.carvea.model.Car;
import com.carvea.service.CarService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/car")
public class CarController {
    private final CarService carService;
    public CarController(CarService carService) {
        this.carService = carService;
    }

//    @GetMapping("/")
//    public ResponseEntity<List<Car>> getAllCars() {
//        List<Car> cars = carService.getAllCars();
//        return ResponseEntity.ok(cars);
//    }

    @PostMapping("/add")
    public ResponseEntity<CarDto> addCar(@RequestBody CarDto carDto) {
        if (carDto.getModelId() == null || carDto.getCategoryId() == null || carDto.getFeatures() == null) {
            return ResponseEntity.badRequest().body(carDto); // Return 400 Bad Request
        }
        carService.addCar(carDto);
        return ResponseEntity.ok(carDto);
    }
}
