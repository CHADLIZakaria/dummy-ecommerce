package com.zchadli.ecommerce_back.response;

public record CartItemResponse(Long id, Long productId, String productName, int quantity, double price) {
}
