package com.carvea.enums;

import com.carvea.exceptions.CustomError;

public enum UserCustomError implements CustomError {
    USER_NOT_FOUND("User not found!"),
    USER_ID_REQUIRED("User id is required!"),
    USER_NOT_VERIFIED("User account is not verified. Please verify your account!"),
    USER_VERIFICATION_CODE_EXPIRED("User verification code is expired!"),
    USER_VERIFICATION_CODE_INVALID("User verification code is invalid!"),
    USER_ACCOUNT_ALREADY_VERIFIED("User account is already verified!"),;

    private final String message;

    UserCustomError(String message) {
        this.message = message;
    }

    @Override
    public String getMessage() {
        return message;
    }
}
