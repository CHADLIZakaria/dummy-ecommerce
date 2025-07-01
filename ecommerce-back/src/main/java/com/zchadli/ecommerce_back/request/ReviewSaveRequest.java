package com.zchadli.ecommerce_back.request;

import java.time.LocalDateTime;

public record ReviewSaveRequest(
        Long idProduct,
        Integer rating,
        String comment,
        Long idUser,
        LocalDateTime createdAt) {
}