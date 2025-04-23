package com.zchadli.ecommerce_back.exception.base;

public abstract class EcommerceException extends RuntimeException {
    protected EcommerceException(String message) {
        super(message);
    }
    public abstract int getStatusCode();
}
