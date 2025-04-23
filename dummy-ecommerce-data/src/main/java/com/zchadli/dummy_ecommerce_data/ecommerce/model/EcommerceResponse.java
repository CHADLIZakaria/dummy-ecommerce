package com.zchadli.dummy_ecommerce_data.ecommerce.model;

public record EcommerceResponse<T>(Integer status, String message, T data) {
}
