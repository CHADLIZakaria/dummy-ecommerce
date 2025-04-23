package com.zchadli.dummy_ecommerce_data.ecommerce;

import com.zchadli.dummy_ecommerce_data.ecommerce.model.Category;
import com.zchadli.dummy_ecommerce_data.ecommerce.model.EcommerceResponse;
import com.zchadli.dummy_ecommerce_data.ecommerce.model.Product;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@FeignClient(value = "dummy-ecommerce", url="http://localhost:8080/")
public interface EcommerceClient {
    @PostMapping(value = "/categories", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    void saveCategory(
            @RequestPart(name="file") MultipartFile file,
            @RequestPart(name = "category") Category category);

    @GetMapping(value = "/categories/title/{title}")
    EcommerceResponse<Category> getCategoryByTitle(
            @PathVariable(name="title") String title);

    @PostMapping(value = "/products", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    void saveProduct(
            @RequestPart(name="files") MultipartFile[] files,
            @RequestPart(name="coverImage") MultipartFile coverImage,
            @RequestPart(name = "product") Product product);
}
