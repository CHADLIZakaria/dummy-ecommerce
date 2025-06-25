package com.zchadli.ecommerce_back.exception.cart;

import com.zchadli.ecommerce_back.exception.base.BadRequestException;

public class CartBadRequestException extends BadRequestException {
    public CartBadRequestException() {
        super("Quantity must be greater than zero.");
    }
}
