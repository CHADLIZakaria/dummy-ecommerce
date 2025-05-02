package com.zchadli.ecommerce_back.request;

import jakarta.validation.constraints.NotBlank;

public record BrandSaveRequest(
    @NotBlank(message = "Must not be blank")
    String name) {
}
