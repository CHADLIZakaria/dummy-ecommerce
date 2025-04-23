package com.zchadli.ecommerce_back.exception.product;

import com.zchadli.ecommerce_back.exception.base.AlreadyExistsException;

public class ProductAlreadyExistsException extends AlreadyExistsException {
    public  ProductAlreadyExistsException(String name) {
        super("Product '" + name + "' already exists.");
    }
}
