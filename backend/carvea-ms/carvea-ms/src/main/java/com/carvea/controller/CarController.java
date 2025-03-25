package com.carvea.controller;


import com.carvea.dto.CarDto;
import com.carvea.dto.CarRequestDto;
import com.carvea.model.Car;
import com.carvea.service.CarService;
import io.micrometer.common.util.StringUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/car")
public class CarController {
    private final CarService carService;
    public CarController(CarService carService) {
        this.carService = carService;
    }



    @PostMapping("/add")
    public ResponseEntity<Car> addCar(@RequestPart("car") CarRequestDto carRequestDto, @RequestPart("images") List<MultipartFile> images) throws IOException {
        carRequestDto.setImages(images);
        Car car = carService.addCar(carRequestDto);
        return ResponseEntity.ok(car);
    }

    @GetMapping
    public ResponseEntity<List<CarDto>> getAllCars() {
        List<CarDto> carDtos = carService.getAllCars();
        return ResponseEntity.ok(carDtos);
    }

    @GetMapping("/with-pagination")
    public ResponseEntity<Page<CarDto>> getAllCarsWithPagination(
            @RequestParam(value = "offset", required = false) Integer offset,
            @RequestParam(value = "pageSize", required = false) Integer pageSize,
            @RequestParam(value = "sortBy", required = false) String sortBy
    ) {
        if(null == offset) offset = 0;
        if(null == pageSize) pageSize = 10;
        if(StringUtils.isEmpty(sortBy)) sortBy = "id";
        return ResponseEntity.ok(carService.getAllCarsWithPagination(PageRequest.of(offset, pageSize, Sort.by(sortBy))));
    }

    @GetMapping("/{carId}")
    public ResponseEntity<CarDto> getCarById(@PathVariable Long carId){
        CarDto carDto = carService.getCarById(carId);
        return ResponseEntity.ok(carDto);
    }

    @GetMapping("/type")
    public ResponseEntity<List<CarDto>> getCarsByType(@RequestParam String carType){
        List<CarDto> cars = carService.getCarsByType(carType);
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

    @GetMapping("/import-duty/{id}")
    public ResponseEntity<List<BigDecimal>> getImportDuty(@PathVariable Long id) {
        List<BigDecimal> importDuty = carService.calculateImportDuty(id);
        return ResponseEntity.ok(importDuty);
    }
}
