package com.zchadli.ecommerce_back.controller;

import com.zchadli.ecommerce_back.request.ProductSaveRequest;
import com.zchadli.ecommerce_back.request.ProductSearchRequest;
import com.zchadli.ecommerce_back.response.EcommerceResponse;
import com.zchadli.ecommerce_back.response.PageResponse;
import com.zchadli.ecommerce_back.response.ProductResponse;
import com.zchadli.ecommerce_back.service.ProductService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@Tag(name = "Products", description = "Product management APIs")
@RestController
@RequestMapping("/products")
@RequiredArgsConstructor
public class ProductController {
    private final ProductService productService;
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<EcommerceResponse<ProductResponse>> save(
            @RequestPart("product") @Valid @NotNull
            ProductSaveRequest product,
            @RequestPart("files") @NotNull
            MultipartFile[] files,
            @RequestPart("coverImage") @NotNull
            MultipartFile coverImage) {
        return ResponseEntity.status(HttpStatus.CREATED).body(new EcommerceResponse<>(201, "Product saved successfully", productService.save(product, files, coverImage)));
    }
    @Operation(summary = "Search all products with optional filters")
    @GetMapping()
    public EcommerceResponse<PageResponse<ProductResponse>> find(ProductSearchRequest productSearchRequest) {
        return new EcommerceResponse<>(200, "Products retrieved successfully", productService.findAll(productSearchRequest));
    }
}
