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
    public ResponseEntity<Car> addCar(@RequestBody CarDto carDto) {
        Car car = carService.addCar(carDto);
        return ResponseEntity.ok(car);
    }
}
