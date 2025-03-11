package com.carvea.enums;

import com.carvea.exceptions.CustomError;

public enum ReservationCustomError implements CustomError {
    RESERVATION_NOT_FOUND("Reservation not found!");

    private String message;

    ReservationCustomError(String message) {
        this.message = message;
    }

    @Override
    public String getMessage() {
        return message;
    }
}
