package com.zchadli.dummy_ecommerce_data.ecommerce.model;

import java.util.List;

public record ProductResponse(
        Long id,
        String name,
        String description,
        Double price,
        String category,
        List<String> images,
        String coverImage) {
}
