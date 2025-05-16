package com.zchadli.ecommerce_back.service;

import com.zchadli.ecommerce_back.request.BrandSaveRequest;
import com.zchadli.ecommerce_back.response.BrandFilterResponse;
import com.zchadli.ecommerce_back.response.BrandResponse;
import com.zchadli.ecommerce_back.response.PageResponse;

import java.util.Map;

public interface BrandService {
    BrandResponse save(BrandSaveRequest brandSaveRequest);
    BrandResponse findByName(String name);
    PageResponse<BrandFilterResponse> findAllWithNumberProducts(Map<String, String[]> brandSearchRequest);
}
