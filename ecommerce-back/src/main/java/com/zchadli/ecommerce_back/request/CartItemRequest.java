package com.zchadli.ecommerce_back.request;

public record CartItemRequest(Long id, Long productId, String productName, int quantity, double price) {
}

