package com.zchadli.ecommerce_back.service;

import com.zchadli.ecommerce_back.request.ProductSaveRequest;
import com.zchadli.ecommerce_back.request.ProductSearchRequest;
import com.zchadli.ecommerce_back.response.PageResponse;
import com.zchadli.ecommerce_back.response.ProductDetailsResponse;
import com.zchadli.ecommerce_back.response.ProductResponse;
import org.springframework.web.multipart.MultipartFile;

public interface ProductService {
    ProductResponse save(ProductSaveRequest productSaveRequest, MultipartFile[] files, MultipartFile coverImage);
    PageResponse<ProductResponse> findAll(ProductSearchRequest productSearchRequest);
    ProductDetailsResponse findBySlug(String slug);
}
