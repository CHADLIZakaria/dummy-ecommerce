package com.zchadli.ecommerce_back.exception.brand.category;

import com.zchadli.ecommerce_back.exception.base.NotFoundException;

public class BrandNotFoundException extends NotFoundException {
    public BrandNotFoundException(Long id) {
        super("Brand with ID " + id + " not found.");
    }
    public BrandNotFoundException(String name) {
        super("Brand with Name " + name + " not found.");
    }
}
