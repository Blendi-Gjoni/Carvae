package com.carvea.service.impl;

import com.carvea.dto.CarDto;
import com.carvea.dto.CarRequestDto;
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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

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

    public Car addCar(CarRequestDto carRequestDto) throws IOException {
        Model model = modelRepository.findById(carRequestDto.getModelId())
                .orElseThrow(() -> {
                    log.error("Model with ID {} not found!", carRequestDto.getModelId());
                    return new CustomException(ModelCustomError.MODEL_NOT_FOUND);
                });

        Category category = categoryRepository.findById(carRequestDto.getCategoryId())
                .orElseThrow(() -> {
                    log.error("Category with ID {} not found!", carRequestDto.getCategoryId());
                    return new CustomException(CategoryCustomError.CATEGORY_NOT_FOUND);
                });

        List<Features> features = featuresRepository.findAllById(carRequestDto.getFeatures());
        if (features.isEmpty()) {
            log.warn("No features found!");
        }

        Car car;

        if ("RENTAL".equalsIgnoreCase(carRequestDto.getCarType())) {
            if (carRequestDto.getPrice() == null) {
                log.error("Rental car price is null!");
                throw new CustomException(CarCustomError.RENTAL_CAR_PRICE_REQUIRED);
            }
            RentalCar rentalCar = new RentalCar();
            rentalCar.setDailyRent(carRequestDto.getPrice());
            car = rentalCar;
        } else if ("DEALERSHIP".equalsIgnoreCase(carRequestDto.getCarType())) {
            if (carRequestDto.getPrice() == null) {
                log.error("Dealership car price is null!");
                throw new CustomException(CarCustomError.DEALERSHIP_CAR_PRICE_REQUIRED);
            }
            DealershipCar dealershipCar = new DealershipCar();
            dealershipCar.setFullPrice(carRequestDto.getPrice());
            car = dealershipCar;
        } else {
            log.error("Invalid car type!");
            throw new CustomException(CarCustomError.INVALID_CAR_TYPE);
        }

        car.setModel(model);
        car.setYear(carRequestDto.getYear());
        car.setHorsepower(carRequestDto.getHorsepower());
        car.setKilometers(carRequestDto.getKilometers());
        car.setDescription(carRequestDto.getDescription());
        car.setExterior(carRequestDto.getExterior());
        car.setInterior(carRequestDto.getInterior());
        car.setFuelType(carRequestDto.getFuelType());
        car.setTransmission(carRequestDto.getTransmission());
        car.setCategory(category);
        car.setFeatures(features);

        if (carRequestDto.getImages() != null && !carRequestDto.getImages().isEmpty()) {
            List<String> imagePaths = saveImages(carRequestDto.getImages(), "cars");
            car.setImagePaths(imagePaths);
        }

        log.info("Adding car: {}.", car);
        Car createdCar = carRepository.save(car);
        log.info("Successfully added car: {}.", createdCar);
        return createdCar;
    }


    public List<CarDto> getCarsByType(String carType) {
        List<Car> cars;
        if ("RENTAL".equalsIgnoreCase(carType)) {
            log.info("Getting cars by type RENTAL!");
            cars = carRepository.findCarsByType(RentalCar.class);
        } else if ("DEALERSHIP".equalsIgnoreCase(carType)) {
            log.info("Getting cars by type DEALERSHIP!");
            cars = carRepository.findCarsByType(DealershipCar.class);
        } else {
            log.error("Invalid car type!");
            throw new CustomException(CarCustomError.INVALID_CAR_TYPE);
        }
        return cars.stream().map(CarMapper::toCarDto).toList();
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

    public CarDto getCarById(Long carId){
        Car car = carRepository.findById(carId)
                .orElseThrow(() -> {
                    log.error("Car with ID {} not found. Cannot get.", carId);
                    return new CustomException(CarCustomError.CAR_NOT_FOUND);
                });
        log.info("Getting car by ID {}.", carId);
        return CarMapper.toCarDto(car);
    }

    public List<CarDto> getAllCars(){
        List<Car> cars = carRepository.findAll();
        if(cars.isEmpty()) {
            log.warn("No cars found.");
        }
        log.info("Fetched {} cars from the database.", cars.size());
        return cars.stream().map(CarMapper::toCarDto).toList();
    }

    public Page<CarDto> getAllCarsWithPagination(PageRequest pageRequest) {
        Page<Car> cars = carRepository.findAll(pageRequest);
        if(cars.isEmpty()){
            log.warn("No cars found!");
        }
        List<CarDto> carDtos = cars.stream()
                .map(CarMapper::toCarDto)
                .collect(Collectors.toList());
        log.info("Fetched {} cars from the database( page {} of {}).",
                carDtos.size(),
                pageRequest.getPageNumber(),
                cars.getTotalPages()
        );
        return new PageImpl<>(carDtos, pageRequest, cars.getTotalElements());
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

    public List<BigDecimal> calculateImportDuty(Long id) {
        Car car = carRepository.findById(id).orElseThrow(() -> {
            log.error("Car with ID {} not found. Cannot calculate import duty", id);
            return new CustomException(CarCustomError.CAR_NOT_FOUND);
        });

        BigDecimal carPrice = car.getPrice();
        int carYear = car.getYear();

        BigDecimal baseAkciza = new BigDecimal("0.05");
        int currentYear = java.time.Year.now().getValue();
        BigDecimal depreciationFactor = new BigDecimal("0.02").multiply(new BigDecimal(currentYear - carYear));
        BigDecimal akcizaRate = baseAkciza.subtract(depreciationFactor).max(BigDecimal.ZERO);

        BigDecimal taksaDoganores = carPrice.multiply(new BigDecimal("0.10")).setScale(2, RoundingMode.HALF_UP);
        BigDecimal akciza = carPrice.multiply(akcizaRate).setScale(2, RoundingMode.HALF_UP);
        BigDecimal tvsh = (carPrice.add(taksaDoganores).add(akciza)).multiply(new BigDecimal("0.18")).setScale(2, RoundingMode.HALF_UP);

        BigDecimal totali = carPrice.add(taksaDoganores).add(akciza).add(tvsh).setScale(2, RoundingMode.HALF_UP);

        return Arrays.asList(taksaDoganores, akciza, tvsh, totali);
    }


    private List<String> saveImages(List<MultipartFile> images, String folder) throws IOException {
        File uploadDir = new File("uploads/" + folder);
        if (!uploadDir.exists()) {
            uploadDir.mkdirs();
        }

        List<String> imagePaths = new ArrayList<>();
        for (MultipartFile image : images) {
            String fileName = System.currentTimeMillis() + "_" + image.getOriginalFilename();
            Path filePath = Path.of(uploadDir + "/" + fileName);

            Files.copy(image.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
            imagePaths.add(filePath.toString()); // Save file path, not file content
        }

        return imagePaths;
    }

}
