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
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CartServiceImpl implements CartService {
    private final CartItemDao cartItemRepository;
    private final UserDao userRepository;
    private final EcommerceMapper ecommerceMapper;

    public List<CartItemResponse> getCartItems(User user) {
        return ecommerceMapper.toCartItemsResponse(cartItemRepository.findByUser(user));
    }

    public CartItemResponse addItemToCart(User user, CartItemRequest cartItemRequest) {
        Optional<CartItem> existingItem = cartItemRepository.findByUserAndProductName(user, cartItemRequest.productName());
        if (existingItem.isPresent()) {
            CartItem currentItem = existingItem.get();
            currentItem.setQuantity(currentItem.getQuantity() + cartItemRequest.quantity());
            return ecommerceMapper.toCartItemResponse(cartItemRepository.save(currentItem));
        }
        else {
            CartItem newCartItem = ecommerceMapper.toCartItem(cartItemRequest, user.getId());
            return ecommerceMapper.toCartItemResponse(cartItemRepository.save(newCartItem));
        }
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

