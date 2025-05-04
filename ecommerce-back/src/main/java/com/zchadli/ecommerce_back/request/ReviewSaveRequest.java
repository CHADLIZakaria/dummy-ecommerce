package com.zchadli.ecommerce_back.request;

public record ReviewSaveRequest(
    Long idProduct,
    Integer rating,
    String comment) {
}