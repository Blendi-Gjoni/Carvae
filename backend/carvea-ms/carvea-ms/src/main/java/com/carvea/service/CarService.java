package com.carvea.service;

import com.carvea.dto.CarDto;
import com.carvea.model.*;
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

    public Car addCar(CarDto carDto) {
        Model model = modelRepository.findById(carDto.getModelId())
                .orElseThrow(() -> new RuntimeException("Model not found"));

        Category category = categoryRepository.findById(carDto.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));

        List<Features> features = featuresRepository.findAllById(carDto.getFeatures());

        Car car;

        // Validation for RentalCar
        if ("RENTAL".equalsIgnoreCase(carDto.getCarType())) {
            if (carDto.getPrice() == null) {
                throw new IllegalArgumentException("Monthly payment is required for RentalCar");
            }
            RentalCar rentalCar = new RentalCar();
            rentalCar.setMonthlyPayment(carDto.getPrice());  // Set BigDecimal price
            car = rentalCar;
        }
        // Validation for DealershipCar
        else if ("DEALERSHIP".equalsIgnoreCase(carDto.getCarType())) {
            if (carDto.getPrice() == null) {
                throw new IllegalArgumentException("Full price is required for DealershipCar");
            }
            DealershipCar dealershipCar = new DealershipCar();
            dealershipCar.setFullPrice(carDto.getPrice());  // Set BigDecimal price
            car = dealershipCar;
        } else {
            throw new IllegalArgumentException("Invalid car type: " + carDto.getCarType());
        }

        car.setModel(model);
        car.setYear(carDto.getYear());
        car.setHorsepower(carDto.getHorsepower());
        car.setKilometers(carDto.getKilometers());
        car.setDescription(carDto.getDescription());
        car.setExterior(carDto.getExterior());
        car.setInterior(carDto.getInterior());
        car.setFuelType(carDto.getFuelType());
        car.setTransmission(carDto.getTransmission());
        car.setCategory(category);
        car.setFeatures(features);

        return carRepository.save(car);
    }

    public List<Car> getCarsByType(String carType) {
        if ("RENTAL".equalsIgnoreCase(carType)) {
            return carRepository.findCarsByType(RentalCar.class);
        } else if ("DEALERSHIP".equalsIgnoreCase(carType)) {
            return carRepository.findCarsByType(DealershipCar.class);
        } else {
            throw new IllegalArgumentException("Invalid car type: " + carType);
        }
    }

    public Car getCarById(Long carId){
        return carRepository.findById(carId).orElseThrow(() -> new RuntimeException("Car not found"));
    }

}
