package com.carvea.enums;

import com.carvea.exceptions.CustomError;

public enum RentalCustomError implements CustomError {
    RENTAL_NOT_FOUND("Rental not found!");

    private final String message;

    RentalCustomError(String message) {
        this.message = message;
    }

    @Override
    public String getMessage() {
        return message;
    }
}
