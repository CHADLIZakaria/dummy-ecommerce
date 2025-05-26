package com.zchadli.ecommerce_back.service;

import com.zchadli.ecommerce_back.model.User;
import com.zchadli.ecommerce_back.request.ProductSaveRequest;
import com.zchadli.ecommerce_back.response.PageResponse;
import com.zchadli.ecommerce_back.response.ProductDetailsResponse;
import com.zchadli.ecommerce_back.response.ProductResponse;
import com.zchadli.ecommerce_back.response.RangePriceResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

public interface ProductService {
    ProductResponse save(ProductSaveRequest productSaveRequest, MultipartFile[] files, MultipartFile coverImage);
    PageResponse<ProductResponse> findAll(User user, Map<String, String[]> productSearchRequest);
    ProductDetailsResponse findBySlug(String slug);
    RangePriceResponse findRangePrice(Map<String, String[]> productSearchRequest);
}
