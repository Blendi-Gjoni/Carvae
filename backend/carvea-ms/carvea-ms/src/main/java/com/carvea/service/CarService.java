package com.carvea.service;

import com.carvea.dto.CarDto;
import com.carvea.dto.CarRequestDto;
import com.carvea.model.Car;

import java.io.IOException;
import java.util.List;

public interface CarService {
    public Car addCar(CarRequestDto carRequestDto) throws IOException;
    public List<Car> getCarsByType(String carType);
    public Car updateCar(Long id, CarDto carDto);
    public CarDto getCarById(Long carId);
    public List<CarDto> getAllCars();
    public void deleteCar(Long id);
}
