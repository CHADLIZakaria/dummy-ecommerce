package com.zchadli.ecommerce_back.controller;

import com.zchadli.ecommerce_back.request.BrandSaveRequest;
import com.zchadli.ecommerce_back.request.BrandSearchRequest;
import com.zchadli.ecommerce_back.request.CategorySaveRequest;
import com.zchadli.ecommerce_back.request.CategorySearchRequest;
import com.zchadli.ecommerce_back.response.*;
import com.zchadli.ecommerce_back.service.BrandService;
import com.zchadli.ecommerce_back.service.CategoryService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@Tag(name = "Brands", description = "Brands management APIs")
@RestController
@RequestMapping("/brands")
@RequiredArgsConstructor
public class BrandController {
    private final BrandService brandService;
    @Operation(summary = "Create a new category")
    @PostMapping()
    public ResponseEntity<EcommerceResponse<BrandResponse>> save(
            @Parameter(description = "Brand JSON body")
            @RequestBody() @Valid
            BrandSaveRequest brandSaveRequest) {
        return ResponseEntity.status(HttpStatus.CREATED).body(new EcommerceResponse<>(201, "Brand saved successfully", brandService.save(brandSaveRequest)));
    }
    @GetMapping("/name/{name}")
    public EcommerceResponse<BrandResponse> findByName(
            @PathVariable("name") String name) {
        return new EcommerceResponse<>(200, "Brand retrieved successfully", brandService.findByName(name));
    }
    @Operation(summary = "Search all brands with optional filters")
    @GetMapping("/search-with-products")
    public EcommerceResponse<PageResponse<BrandFilterResponse>> find(BrandSearchRequest brandSearchRequest) {
        return new EcommerceResponse<>(200, "Brands retrieved successfully", brandService.findAllWithNumberProducts(brandSearchRequest));
    }
}
