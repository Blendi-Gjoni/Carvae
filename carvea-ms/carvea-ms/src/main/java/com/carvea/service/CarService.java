package com.carvea.service;

import com.carvea.model.Car;
import com.carvea.model.Feature;
import com.carvea.repository.CarRepository;
import com.carvea.repository.FeatureRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

@Service
public class CarService {
    private final CarRepository carRepository;
    private final FeatureRepository featureRepository;

    public CarService(CarRepository carRepository, FeatureRepository featureRepository) {
        this.carRepository = carRepository;
        this.featureRepository = featureRepository;
    }

    public List<Car> getAllCars() {
        List<Car> cars = new ArrayList<>();
        carRepository.findAll().forEach(cars::add);
        return cars;
    }

    public Car addFeatureToCar(Long carId, Long featureId) {
        Car car = carRepository.findById(carId)
                .orElseThrow(() -> new NoSuchElementException("Car with ID " + carId + " not found"));
        Feature feature = featureRepository.findById(featureId)
                .orElseThrow(() -> new NoSuchElementException("Feature with ID " + featureId + " not found"));

        car.getFeatures().add(feature);
        return carRepository.save(car);
    }

    public Car removeFeatureFromCar(Long carId, Long featureId) {
        Car car = carRepository.findById(carId)
                .orElseThrow(() -> new NoSuchElementException("Car with ID " + carId + " not found"));
        Feature feature = featureRepository.findById(featureId)
                .orElseThrow(() -> new NoSuchElementException("Feature with ID " + featureId + " not found"));

        car.getFeatures().remove(feature);
        return carRepository.save(car);
    }
}
