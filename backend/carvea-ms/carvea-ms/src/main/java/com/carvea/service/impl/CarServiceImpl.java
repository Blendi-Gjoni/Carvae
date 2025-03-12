package com.carvea.service.impl;

import com.carvea.dto.CarDto;
import com.carvea.enums.CarCustomError;
import com.carvea.enums.CategoryCustomError;
import com.carvea.enums.ModelCustomError;
import com.carvea.exceptions.CustomException;
import com.carvea.mapper.CarMapper;
import com.carvea.model.*;
import com.carvea.repository.CarRepository;
import com.carvea.repository.CategoryRepository;
import com.carvea.repository.FeaturesRepository;
import com.carvea.repository.ModelRepository;
import com.carvea.service.CarService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
public class CarServiceImpl implements CarService {

    private final CarRepository carRepository;

    private final ModelRepository modelRepository;

    private final CategoryRepository categoryRepository;

    private final FeaturesRepository featuresRepository;

    private final CarMapper carMapper;

    public CarServiceImpl(CarRepository carRepository, ModelRepository modelRepository, CategoryRepository categoryRepository, FeaturesRepository featuresRepository, CarMapper carMapper) {
        this.carRepository = carRepository;
        this.modelRepository = modelRepository;
        this.categoryRepository = categoryRepository;
        this.featuresRepository = featuresRepository;
        this.carMapper = carMapper;
    }

    public Car addCar(CarDto carDto) {
        Model model = modelRepository.findById(carDto.getModelId())
                .orElseThrow(() -> {
                    log.error("Model with ID {} not found!", carDto.getModelId());
                    return new CustomException(ModelCustomError.MODEL_NOT_FOUND);
                });

        Category category = categoryRepository.findById(carDto.getCategoryId())
                .orElseThrow(() -> {
                    log.error("Category with ID {} not found!", carDto.getCategoryId());
                    return new CustomException(CategoryCustomError.CATEGORY_NOT_FOUND);
                });

        List<Features> features = featuresRepository.findAllById(carDto.getFeatures());
        if(features.isEmpty()) {
            log.warn("No features found!");
        }

        Car car;

        if ("RENTAL".equalsIgnoreCase(carDto.getCarType())) {
            if (carDto.getPrice() == null) {
                log.error("Rental car price is null!");
                throw new CustomException(CarCustomError.RENTAL_CAR_PRICE_REQUIRED);
            }
            RentalCar rentalCar = new RentalCar();
            rentalCar.setMonthlyPayment(carDto.getPrice());
            car = rentalCar;
        }
        else if ("DEALERSHIP".equalsIgnoreCase(carDto.getCarType())) {
            if (carDto.getPrice() == null) {
                log.error("Dealership car price is null!");
                throw new CustomException(CarCustomError.DEALERSHIP_CAR_PRICE_REQUIRED);
            }
            DealershipCar dealershipCar = new DealershipCar();
            dealershipCar.setFullPrice(carDto.getPrice());
            car = dealershipCar;
        } else {
            log.error("Invalid car type!");
            throw new CustomException(CarCustomError.INVALID_CAR_TYPE);
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

        log.info("Adding car: {}.", car);
        Car createdCar = carRepository.save(car);
        log.info("Successfully added car: {}.", createdCar);
        return createdCar;
    }

    public List<Car> getCarsByType(String carType) {
        if ("RENTAL".equalsIgnoreCase(carType)) {
            log.info("Getting cars by type RENTAL!");
            return carRepository.findCarsByType(RentalCar.class);
        } else if ("DEALERSHIP".equalsIgnoreCase(carType)) {
            log.info("Getting cars by type DEALERSHIP!");
            return carRepository.findCarsByType(DealershipCar.class);
        } else {
            log.error("Invalid car type!");
            throw new CustomException(CarCustomError.INVALID_CAR_TYPE);
        }
    }

    public Car updateCar(Long id, CarDto carDto) {
        Car existingCar = carRepository.findById(id)
                .orElseThrow(() -> {
                    log.error("Car with ID {} not found. Cannot update.", id);
                    return new CustomException(CarCustomError.CAR_NOT_FOUND);
                });
        carMapper.updateCarFromDto(carDto, existingCar);
        existingCar.setModel(modelRepository.findById(carDto.getModelId())
                .orElseThrow(() -> {
                    log.error("Model with ID {} not found. Cannot update.", carDto.getModelId());
                    return new CustomException(ModelCustomError.MODEL_NOT_FOUND);
                }));
        existingCar.setCategory(categoryRepository.findById(carDto.getCategoryId())
                .orElseThrow(() -> {
                    log.error("Category with ID {} not found. Cannot update.", carDto.getCategoryId());
                    return new CustomException(CategoryCustomError.CATEGORY_NOT_FOUND);
                }));
        existingCar.setFeatures(featuresRepository.findAllById(carDto.getFeatures()));
        log.info("Updating car with ID: {}.", id);
        Car updatedCar = carRepository.save(existingCar);
        log.info("Successfully updated car with ID: {}.", id);
        return updatedCar;
    }

    public Car getCarById(Long carId){
        log.info("Getting car by ID {}.", carId);
        return carRepository.findById(carId).orElseThrow(() -> {
            log.error("Car with ID {} not found. Cannot get.", carId);
            return new CustomException(CarCustomError.CAR_NOT_FOUND);
        });
    }

    public List<Car> getAllCars(){
        List<Car> cars = carRepository.findAll();
        if(cars.isEmpty()){
            log.warn("No cars found!");
        }
        log.info("Fetched {} cars from the database.", cars.size());
        return cars;
    }

    public void deleteCar(Long id){
        Car car = carRepository.findById(id).orElseThrow(() -> {
            log.error("Car with ID {} not found. Cannot delete", id);
            return new CustomException(CarCustomError.CAR_NOT_FOUND);
        });
        log.info("Deleting car with ID: {}.", id);
        carRepository.delete(car);
        log.info("Successfully deleted car with ID: {}.", id);
    }

}
