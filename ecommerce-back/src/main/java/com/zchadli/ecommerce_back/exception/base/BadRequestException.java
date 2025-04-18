package com.zchadli.ecommerce_back.exception.base;

import com.zchadli.ecommerce_back.exception.base.EcommerceException;

public class BadRequestException extends EcommerceException {
    public BadRequestException(String message) {
        super(message);
    }

    @Override
    public int getStatusCode() {
        return 400;
    }
}
