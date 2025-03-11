package com.carvea.enums;

import com.carvea.exceptions.CustomError;

public enum ModelCustomError implements CustomError {
    MODEL_NOT_FOUND("Model Not Found");

    private final String message;

    ModelCustomError(String message) {
        this.message = message;
    }

    @Override
    public String getMessage() {
        return message;
    }
}
