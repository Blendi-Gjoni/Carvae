package com.carvea.enums;

import com.carvea.exceptions.CustomError;

public enum CarCustomError implements CustomError {
    CAR_ID_REQUIRED("Car id required!"),
    CAR_NOT_FOUND("Car not found!"),
    INVALID_CAR_TYPE("Car type is invalid!"),
    RENTAL_CAR_PRICE_REQUIRED("Daily rent rice is required for RentalCar"),
    DEALERSHIP_CAR_PRICE_REQUIRED("Full price is required for DealershipCar");

    private final String message;

    CarCustomError(String message) {
        this.message = message;
    }

    @Override
    public String getMessage() {
        return message;
    }
}
