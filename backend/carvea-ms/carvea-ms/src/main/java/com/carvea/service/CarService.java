package com.carvea.service;

import com.carvea.dto.CarDto;
import com.carvea.model.Car;

import java.util.List;

public interface CarService {
    public Car addCar(CarDto carDto);
    public List<Car> getCarsByType(String carType);
    public Car updateCar(Long id, CarDto carDto);
    public Car getCarById(Long carId);
    public List<Car> getAllCars();
    public void deleteCar(Long id);
}
