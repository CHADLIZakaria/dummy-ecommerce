package com.zchadli.ecommerce_back.service;

import com.zchadli.ecommerce_back.dto.CategoryDto;
import com.zchadli.ecommerce_back.model.Category;

import java.util.List;

public interface CategoryService {
    CategoryDto save(CategoryDto category);
    CategoryDto findById(Long id);
    List<CategoryDto> findAll();
}
