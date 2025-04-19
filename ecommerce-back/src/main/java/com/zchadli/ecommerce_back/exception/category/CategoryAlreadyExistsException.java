package com.zchadli.ecommerce_back.exception.category;

import com.zchadli.ecommerce_back.exception.base.AlreadyExistsException;

public class CategoryAlreadyExistsException extends AlreadyExistsException {
    public CategoryAlreadyExistsException(String name) {
        super("Category '" + name + "' already exists.");
    }
}
