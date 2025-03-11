package com.carvea.enums;

import com.carvea.exceptions.CustomError;

public enum CategoryCustomError implements CustomError {
    CATEGORY_NOT_FOUND("Category not found!");

    private final String message;

    CategoryCustomError(String message) {
        this.message = message;
    }

    @Override
    public String getMessage() {
        return message;
    }
}
