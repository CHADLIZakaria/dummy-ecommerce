package com.zchadli.ecommerce_back.exception.base;

public class AlreadyExistsException extends EcommerceException {
    public AlreadyExistsException(String message) {
        super(message);
    }
    @Override
    public int getStatusCode() {
        return 409;
    }
}
