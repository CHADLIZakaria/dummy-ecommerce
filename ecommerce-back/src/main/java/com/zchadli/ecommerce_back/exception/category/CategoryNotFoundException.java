package com.zchadli.ecommerce_back.exception.category;

import com.zchadli.ecommerce_back.exception.base.NotFoundException;

public class CategoryNotFoundException extends NotFoundException {
    public CategoryNotFoundException(Long id) {
        super("Category with ID " + id + " not found.");
    }
    public CategoryNotFoundException(String title) {
        super("Category with Title " + title + " not found.");
    }
}
