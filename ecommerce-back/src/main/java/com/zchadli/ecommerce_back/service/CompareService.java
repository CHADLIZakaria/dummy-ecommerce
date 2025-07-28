package com.zchadli.ecommerce_back.service;

import com.zchadli.ecommerce_back.response.ProductCompareResponse;
import com.zchadli.ecommerce_back.response.ProductResponse;

import java.util.List;

public interface CompareService {
    void addProductToCompare(String username, String slugProduct);
    List<ProductCompareResponse> getCompareProducts(String username);
    void removeProductFromCompare(String username, String slugProduct);
}
