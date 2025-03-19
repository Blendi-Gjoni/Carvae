package com.carvea.mapper;

import com.carvea.dto.CarDto;
import com.carvea.model.Car;
import com.carvea.model.DealershipCar;
import com.carvea.model.RentalCar;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class CarMapper {
    public static void updateCarFromDto(CarDto carDto, Car car) {
        if (car instanceof DealershipCar) {
            ((DealershipCar) car).setFullPrice(carDto.getPrice());
        } else if (car instanceof RentalCar) {
            ((RentalCar) car).setDailyRent(carDto.getPrice());
        } else {
            throw new IllegalArgumentException("Invalid car type: " + carDto.getCarType());
        }

        car.setId(carDto.getId());
        car.setYear(carDto.getYear());
        car.setHorsepower(carDto.getHorsepower());
        car.setKilometers(carDto.getKilometers());
        car.setDescription(carDto.getDescription());
        car.setExterior(carDto.getExterior());
        car.setInterior(carDto.getInterior());
        car.setFuelType(carDto.getFuelType());
        car.setTransmission(carDto.getTransmission());
        car.setImagePaths(carDto.getImagePaths());
    }

    public static CarDto toCarDto(Car car) {
        CarDto carDto = new CarDto();

        carDto.setId(car.getId());
        carDto.setModelId(car.getModel().getId());
        carDto.setBrandName(car.getModel().getBrand().getName());
        carDto.setModelName(car.getModel().getName());
        carDto.setYear(car.getYear());
        carDto.setHorsepower(car.getHorsepower());
        carDto.setKilometers(car.getKilometers());
        carDto.setDescription(car.getDescription());
        carDto.setExterior(car.getExterior());
        carDto.setInterior(car.getInterior());
        carDto.setFuelType(car.getFuelType());
        carDto.setTransmission(car.getTransmission());
        carDto.setCategoryId(car.getCategory().getId());
        carDto.setCategoryName(car.getCategory().getName());
        if (car.getImagePaths() != null) {
            List<String> correctedPaths = car.getImagePaths().stream()
                    .map(path -> "http://localhost:8080/" + path.replace("\\", "/"))
                    .collect(Collectors.toList());
            carDto.setImagePaths(correctedPaths);
        } else {
            carDto.setImagePaths(null);
        }
        if (car instanceof DealershipCar) {
            carDto.setCarType("DEALERSHIP");
            carDto.setPrice(((DealershipCar) car).getPrice());
        } else if (car instanceof RentalCar) {
            carDto.setCarType("RENTAL");
            carDto.setPrice(((RentalCar) car).getPrice());
        }

        return carDto;
    }
}
