package com.zchadli.ecommerce_back.controller;

import com.zchadli.ecommerce_back.response.ProductCompareResponse;
import com.zchadli.ecommerce_back.response.ProductResponse;
import com.zchadli.ecommerce_back.service.CompareService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/compare")
@RequiredArgsConstructor
public class CompareController {

    private final CompareService compareService;

    @PostMapping("/{username}/add/{productSlug}")
    public ResponseEntity<String> addProductToCompare(
        @PathVariable String username,
        @PathVariable String productSlug) {
        compareService.addProductToCompare(username, productSlug);
        return ResponseEntity.ok("Product added to comparison list.");
    }

    @GetMapping("/{username}")
    public ResponseEntity<List<ProductCompareResponse>> getCompareProducts(@PathVariable String username) {
        return ResponseEntity.ok(compareService.getCompareProducts(username));
    }

    @DeleteMapping("/{username}/remove/{productSlug}")
    public ResponseEntity<String> removeProductFromCompare(
            @PathVariable String username,
            @PathVariable String productSlug) {
        compareService.removeProductFromCompare(username, productSlug);
        return ResponseEntity.ok("Product removed from comparison list.");
    }
}
