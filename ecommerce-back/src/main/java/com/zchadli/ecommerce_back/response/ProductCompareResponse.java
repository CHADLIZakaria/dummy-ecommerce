package com.zchadli.ecommerce_back.response;

public record ProductCompareResponse(
    Long id,
    String name,
    String slug,
    Double price,
    String category,
    String brand,
    String sku,
    String coverImage,
    Double avgReview,
    Double reviewsCounts,
    int quantity) {
}
