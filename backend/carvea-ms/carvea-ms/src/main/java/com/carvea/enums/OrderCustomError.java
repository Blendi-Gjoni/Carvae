package com.carvea.enums;

import com.carvea.exceptions.CustomError;

public enum OrderCustomError implements CustomError {
    ORDER_NOT_FOUND("Order not found!");

    private String message;

    OrderCustomError(String message) {
        this.message = message;
    }

    @Override
    public String getMessage() {
        return message;
    }
}
