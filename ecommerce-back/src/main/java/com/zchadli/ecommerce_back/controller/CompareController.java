package com.zchadli.ecommerce_back.controller;

import com.zchadli.ecommerce_back.response.EcommerceResponse;
import com.zchadli.ecommerce_back.response.ProductCompareResponse;
import com.zchadli.ecommerce_back.service.CompareService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/compare")
@RequiredArgsConstructor
public class CompareController {
    private final CompareService compareService;

    @PostMapping("/{username}/add/{productSlug}")
    public EcommerceResponse<ProductCompareResponse> addProductToCompare(
        @PathVariable String username,
        @PathVariable String productSlug) {
        return new EcommerceResponse<>(
            201,
            "Product added to comparison list.",
            compareService.addProductToCompare(username, productSlug)
        );
    }

    @GetMapping("/{username}")
    public EcommerceResponse<List<ProductCompareResponse>> getCompareProducts(@PathVariable String username) {
        return new EcommerceResponse<>(
            200,
            "Compare Products retrieved successfully",
            compareService.getCompareProducts(username)
        );
    }

    @DeleteMapping("/{username}/remove/{productSlug}")
    public EcommerceResponse<String> removeProductFromCompare(
            @PathVariable String username,
            @PathVariable String productSlug) {
        compareService.removeProductFromCompare(username, productSlug);
        return new EcommerceResponse<>(
            200,
            "Product removed from comparison list.",
            null
        );
    }
}
