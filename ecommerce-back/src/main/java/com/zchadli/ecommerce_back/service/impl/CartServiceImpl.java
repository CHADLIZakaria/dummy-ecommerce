package com.zchadli.ecommerce_back.service.impl;

import com.zchadli.ecommerce_back.mapper.EcommerceMapper;
import com.zchadli.ecommerce_back.model.CartItem;
import com.zchadli.ecommerce_back.model.User;
import com.zchadli.ecommerce_back.repository.CartItemDao;
import com.zchadli.ecommerce_back.repository.UserDao;
import com.zchadli.ecommerce_back.request.CartItemRequest;
import com.zchadli.ecommerce_back.response.CartItemResponse;
import com.zchadli.ecommerce_back.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CartServiceImpl implements CartService {
    private final CartItemDao cartItemRepository;
    private final UserDao userRepository;
    private final EcommerceMapper ecommerceMapper;

    public List<CartItem> getCartItems(User user) {
        return cartItemRepository.findByUser(user);
    }

    public CartItemResponse addItemToCart(User user, CartItemRequest cartItemRequest) {
        CartItem cartItem = ecommerceMapper.toCartItem(cartItemRequest, user);
        cartItem.setUser(user);
        return ecommerceMapper.toCartItemResponse(cartItemRepository.save(cartItem));
    }

    public void removeItem(Long itemId) {
        CartItem item = cartItemRepository.findById(itemId)
                .orElseThrow(() -> new RuntimeException("Item not found"));
        cartItemRepository.delete(item);
    }

    public void clearCart(User user) {
        List<CartItem> items = cartItemRepository.findByUser(user);
        cartItemRepository.deleteAll(items);
    }
}

