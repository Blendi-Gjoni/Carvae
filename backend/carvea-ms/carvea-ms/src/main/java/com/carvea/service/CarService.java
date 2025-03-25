package com.carvea.service;

import com.carvea.dto.CarDto;
import com.carvea.dto.CarRequestDto;
import com.carvea.model.Car;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.List;

public interface CarService {
    public Car addCar(CarRequestDto carRequestDto) throws IOException;
    public List<CarDto> getCarsByType(String carType);
    public Car updateCar(Long id, CarDto carDto);
    public CarDto getCarById(Long carId);
    public List<CarDto> getAllCars();
    public Page<CarDto> getAllCarsWithPagination(PageRequest pageRequest);
    public void deleteCar(Long id);
    public List<BigDecimal> calculateImportDuty(Long id);
}
