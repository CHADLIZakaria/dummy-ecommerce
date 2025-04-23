package com.zchadli.ecommerce_back.exception.base;

public class BadRequestException extends EcommerceException {
    public BadRequestException(String message) {
        super(message);
    }

    @Override
    public int getStatusCode() {
        return 400;
    }
}
