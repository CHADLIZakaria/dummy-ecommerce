package com.zchadli.ecommerce_back.service;

import com.zchadli.ecommerce_back.request.CategorySaveRequest;
import com.zchadli.ecommerce_back.request.CategorySearchRequest;
import com.zchadli.ecommerce_back.response.CategoryResponse;
import com.zchadli.ecommerce_back.response.PageResponse;
import org.springframework.web.multipart.MultipartFile;

public interface CategoryService {
    CategoryResponse save(CategorySaveRequest categorySaveRequest, MultipartFile file);
    CategoryResponse findById(Long id);
    PageResponse<CategoryResponse> findAll(CategorySearchRequest categorySearchRequest);
    void deleteById(Long id);
}
