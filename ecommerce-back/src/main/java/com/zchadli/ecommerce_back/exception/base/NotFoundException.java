package com.zchadli.ecommerce_back.exception.base;

public class NotFoundException extends EcommerceException {
    public NotFoundException(String message) {
        super(message);
    }
    @Override
    public int getStatusCode() {
        return 404;
    }
}
