package com.carvea.enums;

import com.carvea.exceptions.CustomError;

public enum DealershipCustomError implements CustomError {
    DEALERSHIP_NOT_FOUND("Dealership not found!");

    private final String message;

    DealershipCustomError(String message) {
        this.message = message;
    }

    @Override
    public String getMessage() {
        return message;
    }
}
