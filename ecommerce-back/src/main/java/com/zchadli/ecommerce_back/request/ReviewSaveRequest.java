package com.zchadli.ecommerce_back.request;

import java.time.LocalDateTime;

public record ReviewSaveRequest(
        String slugProduct,
        Integer rating,
        String comment,
        String username,
        LocalDateTime createdAt) {
}