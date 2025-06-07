package com.zchadli.ecommerce_back.controller;

import com.zchadli.ecommerce_back.model.CartItem;
import com.zchadli.ecommerce_back.model.User;
import com.zchadli.ecommerce_back.request.CartItemRequest;
import com.zchadli.ecommerce_back.response.CartItemResponse;
import com.zchadli.ecommerce_back.response.EcommerceResponse;
import com.zchadli.ecommerce_back.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/cart")
@RequiredArgsConstructor
public class CartController {
    private final CartService cartService;

    @GetMapping
    public List<CartItemResponse> getCart(@AuthenticationPrincipal User user) {
        return cartService.getCartItems(user);
    }

    @PostMapping("/add")
    public EcommerceResponse<CartItemResponse> addToCart(@RequestBody CartItemRequest cartItemRequest, @AuthenticationPrincipal User user) {
        return new EcommerceResponse<>(200, cartItemRequest.productName()+" just been added to cart", cartService.addItemToCart(user, cartItemRequest));
    }

    @PutMapping("/item/{id}/{quantity}")
    public EcommerceResponse<CartItemResponse> updateQuantity(
            @PathVariable Long id,
            @PathVariable Integer quantity,
            @AuthenticationPrincipal User user) {
        CartItemResponse response = cartService.updateQuantity(user, id, quantity);
        return new EcommerceResponse<>(200, "Quantity updated", response);

    }

    @DeleteMapping("/remove/{itemId}")
    public ResponseEntity<?> removeItem(@PathVariable Long itemId, @AuthenticationPrincipal User user) {
        cartService.removeItem(itemId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/clear")
    public ResponseEntity<?> clearCart(@AuthenticationPrincipal User user) {
        cartService.clearCart(user);
        return ResponseEntity.ok().build();
    }
}
