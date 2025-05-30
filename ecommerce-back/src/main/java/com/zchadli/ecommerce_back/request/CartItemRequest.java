package com.zchadli.ecommerce_back.request;

public record CartItemRequest(String productImage, String productName, int quantity, double price) {
}