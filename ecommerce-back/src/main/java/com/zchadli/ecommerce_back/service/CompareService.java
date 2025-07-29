package com.zchadli.ecommerce_back.service;

import com.zchadli.ecommerce_back.response.ProductCompareResponse;
import java.util.List;

public interface CompareService {
    ProductCompareResponse addProductToCompare(String username, String slugProduct);
    List<ProductCompareResponse> getCompareProducts(String username);
    void removeProductFromCompare(String username, String slugProduct);
}
