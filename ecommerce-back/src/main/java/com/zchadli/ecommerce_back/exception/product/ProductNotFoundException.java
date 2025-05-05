package com.zchadli.ecommerce_back.exception.product;

import com.zchadli.ecommerce_back.exception.base.NotFoundException;

public class ProductNotFoundException extends NotFoundException {
    public ProductNotFoundException(Long id) {
        super("Product with ID " + id + " not found.");
    }
    public ProductNotFoundException(String slug) {
        super("Product with slug " + slug + " not found.");
    }
}
