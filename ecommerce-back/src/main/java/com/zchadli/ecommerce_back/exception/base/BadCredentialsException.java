package com.zchadli.ecommerce_back.exception.base;

public class BadCredentialsException extends EcommerceException{
    public BadCredentialsException(String message) {
        super(message);
    }

    @Override
    public int getStatusCode() {
        return 403;
    }
}
