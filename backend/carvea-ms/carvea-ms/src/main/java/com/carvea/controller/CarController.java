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



    @PostMapping("/add")
    public ResponseEntity<Car> addCar(@RequestBody CarDto carDto) {
        Car car = carService.addCar(carDto);
        return ResponseEntity.ok(car);
    }

    @GetMapping("/allCars")
    public ResponseEntity<List<Car>> getAllCars() {
        List<Car> cars = carService.getAllCars();
        return ResponseEntity.ok(cars);
    }

    @GetMapping("/{carId}")
    public ResponseEntity<Car> getCarById(@PathVariable Long carId){
        Car car = carService.getCarById(carId);
        return ResponseEntity.ok(car);
    }

    @GetMapping("/type")
    public ResponseEntity<List<Car>> getCarsByType(@RequestParam String carType){
        List<Car> cars = carService.getCarsByType(carType);
        return ResponseEntity.ok(cars);
    }


    @PutMapping("/{id}")
    public ResponseEntity<Car> updateCar(@PathVariable("id") Long id, @RequestBody CarDto carDto){
        Car updatedCar = carService.updateCar(id, carDto);
        return ResponseEntity.ok(updatedCar);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Car> deleteCar(@PathVariable("id") Long id){
        carService.deleteCar(id);
        return ResponseEntity.noContent().build();
    }
}
