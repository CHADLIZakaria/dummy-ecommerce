package com.zchadli.ecommerce_back.service;

import com.zchadli.ecommerce_back.model.Product;
import com.zchadli.ecommerce_back.response.ProductResponse;

import java.util.List;
import java.util.Set;

public interface CompareService {
    void addProductToCompare(String username, String slugProduct);
    List<ProductResponse> getCompareProducts(String username);
    void removeProductFromCompare(String username, String slugProduct);
}
