package com.zchadli.dummy_ecommerce_data.ecommerce.model;

public record ReviewRequest(
        Long idProduct,
        Integer rating,
        String comment) {
}