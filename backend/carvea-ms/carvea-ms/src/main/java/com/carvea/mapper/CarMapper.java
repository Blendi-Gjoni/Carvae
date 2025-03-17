package com.carvea.mapper;

import com.carvea.dto.CarDto;
import com.carvea.model.Car;
import com.carvea.model.DealershipCar;
import com.carvea.model.RentalCar;
import org.springframework.stereotype.Component;

@Component
public class CarMapper {
    public static void updateCarFromDto(CarDto carDto, Car car) {
        if (car instanceof DealershipCar) {
            ((DealershipCar) car).setFullPrice(carDto.getPrice());
        } else if (car instanceof RentalCar) {
            ((RentalCar) car).setMonthlyPayment(carDto.getPrice());
        } else {
            throw new IllegalArgumentException("Invalid car type: " + carDto.getCarType());
        }

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

        carDto.setModelId(car.getModel().getId());
        carDto.setYear(car.getYear());
        carDto.setHorsepower(car.getHorsepower());
        carDto.setKilometers(car.getKilometers());
        carDto.setDescription(car.getDescription());
        carDto.setExterior(car.getExterior());
        carDto.setInterior(car.getInterior());
        carDto.setFuelType(car.getFuelType());
        carDto.setTransmission(car.getTransmission());
        carDto.setCategoryId(car.getCategory().getId());
        carDto.setImagePaths(car.getImagePaths());

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
