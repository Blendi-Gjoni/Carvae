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
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CarServiceImpl implements CarService {

    @Autowired
    private CarRepository carRepository;

    @Autowired
    private ModelRepository modelRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private FeaturesRepository featuresRepository;

    @Autowired
    private CarMapper carMapper;

    public Car addCar(CarDto carDto) {
        Model model = modelRepository.findById(carDto.getModelId())
                .orElseThrow(() -> new CustomException(ModelCustomError.MODEL_NOT_FOUND));

        Category category = categoryRepository.findById(carDto.getCategoryId())
                .orElseThrow(() -> new CustomException(CategoryCustomError.CATEGORY_NOT_FOUND));

        List<Features> features = featuresRepository.findAllById(carDto.getFeatures());

        Car car;

        // Validation for RentalCar
        if ("RENTAL".equalsIgnoreCase(carDto.getCarType())) {
            if (carDto.getPrice() == null) {
                throw new CustomException(CarCustomError.RENTAL_CAR_PRICE_REQUIRED);
            }
            RentalCar rentalCar = new RentalCar();
            rentalCar.setMonthlyPayment(carDto.getPrice());  // Set BigDecimal price
            car = rentalCar;
        }
        // Validation for DealershipCar
        else if ("DEALERSHIP".equalsIgnoreCase(carDto.getCarType())) {
            if (carDto.getPrice() == null) {
                throw new CustomException(CarCustomError.DEALERSHIP_CAR_PRICE_REQUIRED);
            }
            DealershipCar dealershipCar = new DealershipCar();
            dealershipCar.setFullPrice(carDto.getPrice());  // Set BigDecimal price
            car = dealershipCar;
        } else {
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

        return carRepository.save(car);
    }

    public List<Car> getCarsByType(String carType) {
        if ("RENTAL".equalsIgnoreCase(carType)) {
            return carRepository.findCarsByType(RentalCar.class);
        } else if ("DEALERSHIP".equalsIgnoreCase(carType)) {
            return carRepository.findCarsByType(DealershipCar.class);
        } else {
            throw new CustomException(CarCustomError.INVALID_CAR_TYPE);
        }
    }

    public Car updateCar(Long id, CarDto carDto) {
        Car existingCar = carRepository.findById(id)
                .orElseThrow(() -> new CustomException(CarCustomError.CAR_NOT_FOUND));
        carMapper.updateCarFromDto(carDto, existingCar);
        existingCar.setModel(modelRepository.findById(carDto.getModelId())
                .orElseThrow(() -> new CustomException(ModelCustomError.MODEL_NOT_FOUND)));
        existingCar.setCategory(categoryRepository.findById(carDto.getCategoryId())
                .orElseThrow(() -> new CustomException(CategoryCustomError.CATEGORY_NOT_FOUND)));
        existingCar.setFeatures(featuresRepository.findAllById(carDto.getFeatures()));
        return carRepository.save(existingCar);
    }

    public Car getCarById(Long carId){
        return carRepository.findById(carId).orElseThrow(() -> new CustomException(CarCustomError.CAR_NOT_FOUND));
    }

    public List<Car> getAllCars(){
        List<Car> cars = carRepository.findAll();
        return cars;
    }

    public void deleteCar(Long id){
        Car car = carRepository.findById(id).orElseThrow(() -> new CustomException(CarCustomError.CAR_NOT_FOUND));
        carRepository.delete(car);
    }

}
