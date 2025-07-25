package com.zchadli.ecommerce_back.controller;

import com.zchadli.ecommerce_back.model.User;
import com.zchadli.ecommerce_back.request.ProductSaveRequest;
import com.zchadli.ecommerce_back.response.*;
import com.zchadli.ecommerce_back.service.FavoriteService;
import com.zchadli.ecommerce_back.service.ProductService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Tag(name = "Products", description = "Product management APIs")
@RestController
@RequestMapping("/products")
@RequiredArgsConstructor
public class ProductController {
    private final ProductService productService;
    private final FavoriteService favoriteService;
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
    public EcommerceResponse<PageResponse<ProductResponse>> find(@AuthenticationPrincipal User user, HttpServletRequest productSearchRequest) {
        return new EcommerceResponse<>(200, "Products retrieved successfully", productService.findAll(user, productSearchRequest.getParameterMap()));
    }
    @Operation(summary = "find by slug")
    @GetMapping("/{slug}")
    public EcommerceResponse<ProductDetailsResponse> findBySlug(@AuthenticationPrincipal User user, @PathVariable("slug") String slug) {
        return new EcommerceResponse<>(200, "Product retrieved successfully", productService.findBySlug(user, slug));
    }
    @GetMapping("/getRangePrice")
    public EcommerceResponse<RangePriceResponse> findRangePrice(@AuthenticationPrincipal User user, HttpServletRequest productSearchRequest) {
        return new EcommerceResponse<>(200, "Range Price retrieved successfully", productService.findRangePrice(user, productSearchRequest.getParameterMap()));
    }
    @PostMapping("/toggle/favorites/{productId}")
    public EcommerceResponse<FavoriteResponse> toggleFavorite(@PathVariable Long productId, @AuthenticationPrincipal User user) {
       return new EcommerceResponse<>(200, "Favorite toggled", favoriteService.toggleFavorite(user, productId));
    }

    @GetMapping("/{slug}/similar")
    public EcommerceResponse<List<ProductResponse>> getSimilarProducts(@PathVariable String slug) {
        return new EcommerceResponse<>(200, "Products retrieved successfully", productService.getSimilarProducts(slug));
    }
}
