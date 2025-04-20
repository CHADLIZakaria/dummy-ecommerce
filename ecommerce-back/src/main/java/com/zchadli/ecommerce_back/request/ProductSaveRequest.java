package com.zchadli.ecommerce_back.request;

import jakarta.validation.constraints.NotBlank;

public record ProductSaveRequest(
        @NotBlank(message = "Must not be blank")
        String name,
        String description,
        Double price,
        Long idCategory) {
}
