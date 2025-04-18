package com.zchadli.ecommerce_back.controller;

import com.zchadli.ecommerce_back.dto.CategoryDto;
import com.zchadli.ecommerce_back.response.ApiResponse;
import com.zchadli.ecommerce_back.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categories")
@RequiredArgsConstructor
public class CategoryController {
    private final CategoryService categoryService;
    @PostMapping()
    public ApiResponse<CategoryDto> save(@RequestBody CategoryDto categoryDto) {
        return new ApiResponse<>(200, "Category saved successfully", categoryService.save(categoryDto));
    }
    @GetMapping("/{id}")
    public ApiResponse<CategoryDto> findById(@PathVariable("id") Long id) {
        return new ApiResponse<>(200, "Category retrieved successfully", categoryService.findById(id));
    }
    @GetMapping()
    public ApiResponse<List<CategoryDto>> findAll() {
        return new ApiResponse<>(200, "Categories retrieved successfully", categoryService.findAll());
    }
}
