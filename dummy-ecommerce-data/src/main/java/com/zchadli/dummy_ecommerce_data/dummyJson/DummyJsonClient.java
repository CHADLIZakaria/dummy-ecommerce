package com.zchadli.dummy_ecommerce_data.dummyJson;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@FeignClient(value = "dummyJson", url="https://dummyjson.com/")
public interface DummyJsonClient {
    @GetMapping(value = "/products/category-list")
    List<String> getCategories();

    @GetMapping(value = "/products")
    DummyResponseProduct getProducts();
}
