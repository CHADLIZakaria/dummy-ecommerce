package com.zchadli.ecommerce_back.response;

import java.util.List;

public record ProductResponse(
        Long id,
        String name,
        String slug,
        String description,
        Double price,
        String category,
        List<String> images,
        String coverImage) {
}
