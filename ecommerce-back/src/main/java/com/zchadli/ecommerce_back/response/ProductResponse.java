package com.zchadli.ecommerce_back.response;

import java.util.List;

public record ProductResponse(
        Long id,
        String name,
        String description,
        Double price,
        String category,
        List<String> images) {
}
