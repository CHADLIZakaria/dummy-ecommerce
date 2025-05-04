package com.zchadli.ecommerce_back.response;

public record ReviewResponse(
    Long id,
    Long idProduct,
    Integer rating,
    String comment) {
}
