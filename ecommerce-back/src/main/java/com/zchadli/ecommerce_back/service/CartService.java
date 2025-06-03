package com.zchadli.ecommerce_back.service;

import com.zchadli.ecommerce_back.model.User;
import com.zchadli.ecommerce_back.request.CartItemRequest;
import com.zchadli.ecommerce_back.response.CartItemResponse;

import java.util.List;

public interface CartService {
    List<CartItemResponse> getCartItems(User user);
    CartItemResponse addItemToCart(User user, CartItemRequest cartItemRequest);
    CartItemResponse updateQuantity(User user, Long idCart, Integer newQuantity);
    void removeItem(Long itemId);
    void clearCart(User user);
}
