package com.zchadli.ecommerce_back.response;

import java.time.LocalDateTime;

public record ReviewResponse(
        Long id,
        Long idProduct,
        Integer rating,
        String comment,
        String username,
        String userImage,
        LocalDateTime createdAt) {
}
