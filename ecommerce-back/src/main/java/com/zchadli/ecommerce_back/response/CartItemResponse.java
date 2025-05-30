package com.zchadli.ecommerce_back.response;

public record CartItemResponse(Long id, String productImage, String productName, int quantity, double price) {
}
