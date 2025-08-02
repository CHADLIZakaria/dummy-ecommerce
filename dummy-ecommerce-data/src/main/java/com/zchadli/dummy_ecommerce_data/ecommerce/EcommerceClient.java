package com.zchadli.dummy_ecommerce_data.ecommerce;

import com.zchadli.dummy_ecommerce_data.ecommerce.model.*;
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

    @GetMapping(value = "/categories/slug/{slug}")
    EcommerceResponse<Category> getCategoryBySlug(
            @PathVariable(name="slug") String slug);
    @PostMapping("/brands")
    EcommerceResponse<BrandResponse> saveBrand(@RequestBody() BrandRequest brand);
    @GetMapping("/brands/name/{name}")
    EcommerceResponse<BrandResponse> getBrandByName(@PathVariable("name") String name);

    @PostMapping(value = "/products", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    EcommerceResponse<ProductResponse> saveProduct(
            @RequestPart(name="files") MultipartFile[] files,
            @RequestPart(name="coverImage") MultipartFile coverImage,
            @RequestPart(name = "product") Product product);


    @PostMapping(value = "/auth/register", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    void saveUser(
            @RequestPart(name="file") MultipartFile file,
            @RequestPart(name = "user") User user);


    @PostMapping("/reviews")
    void saveReview(@RequestBody() ReviewRequest reviewRequest);
}
