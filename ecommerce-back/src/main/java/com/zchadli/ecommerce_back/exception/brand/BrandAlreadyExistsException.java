package com.zchadli.ecommerce_back.exception.brand;

import com.zchadli.ecommerce_back.exception.base.AlreadyExistsException;

public class BrandAlreadyExistsException extends AlreadyExistsException {
    public BrandAlreadyExistsException(String name) {
        super("Brand '" + name + "' already exists.");
    }
}
