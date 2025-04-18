package com.zchadli.ecommerce_back.service.impl;

import com.zchadli.ecommerce_back.dto.CategoryDto;
import com.zchadli.ecommerce_back.exception.category.CategoryAlreadyExistsException;
import com.zchadli.ecommerce_back.exception.category.CategoryNotFoundException;
import com.zchadli.ecommerce_back.mapper.EcommerceMapper;
import com.zchadli.ecommerce_back.model.Category;
import com.zchadli.ecommerce_back.repository.CategoryDao;
import com.zchadli.ecommerce_back.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {
    private final CategoryDao categoryDao;
    private final EcommerceMapper ecommerceMapper;
    @Override
    public CategoryDto save(CategoryDto category) {
        if(categoryDao.existsByTitle(category.title())) {
            throw new CategoryAlreadyExistsException(category.title());
        }
        Category categorySaved =  categoryDao.save(ecommerceMapper.toCategory(category));
        return ecommerceMapper.toCategoryDto(categorySaved);
    }
    @Override
    public CategoryDto findById(Long id) {
        Category category = categoryDao.findById(id).orElseThrow(() -> new CategoryNotFoundException(id));
        return ecommerceMapper.toCategoryDto(category);
    }
    @Override
    public List<CategoryDto> findAll() {
        return ecommerceMapper.toCategoriesDto(categoryDao.findAll());
    }
}
