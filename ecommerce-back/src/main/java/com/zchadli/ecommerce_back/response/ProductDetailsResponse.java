package com.zchadli.ecommerce_back.response;

import java.util.List;

public record ProductDetailsResponse(
        Long id,
        String name,
        String slug,
        String description,
        Double price,
        String category,
        String brand,
        String sku,
        List<String> images,
        String coverImage,
        boolean isFavorite) {
}
