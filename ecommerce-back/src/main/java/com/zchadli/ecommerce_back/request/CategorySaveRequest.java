package com.zchadli.ecommerce_back.request;

import jakarta.validation.constraints.NotBlank;

public record CategorySaveRequest(
        @NotBlank(message = "Must not be blank")
        String title) {
}
