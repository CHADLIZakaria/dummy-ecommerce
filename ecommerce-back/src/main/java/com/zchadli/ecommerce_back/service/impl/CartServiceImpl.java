package com.zchadli.ecommerce_back.service.impl;

import com.zchadli.ecommerce_back.exception.cart.CartBadRequestException;
import com.zchadli.ecommerce_back.exception.product.ProductNotFoundException;
import com.zchadli.ecommerce_back.mapper.CartMapper;
import com.zchadli.ecommerce_back.model.CartItem;
import com.zchadli.ecommerce_back.model.Product;
import com.zchadli.ecommerce_back.model.User;
import com.zchadli.ecommerce_back.repository.CartItemDao;
import com.zchadli.ecommerce_back.repository.ProductDao;
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
    private final CartMapper cartMapper;
    private final ProductDao productDao;
    private static final String PRODUCT_FOLDER_IMAGES = "product";

    public List<CartItemResponse> getCartItems(User user) {
        return cartMapper.toCartItemsResponse(cartItemRepository.findByUser(user), PRODUCT_FOLDER_IMAGES);
    }

    public CartItemResponse addItemToCart(User user, CartItemRequest cartItemRequest) {
        Optional<CartItem> existingItem = cartItemRepository.findByUserAndProductName(user, cartItemRequest.productName());
        if (existingItem.isPresent()) {
            CartItem currentItem = existingItem.get();
            currentItem.setQuantity(currentItem.getQuantity() + cartItemRequest.quantity());
            return cartMapper.toCartItemResponse(cartItemRepository.save(currentItem), PRODUCT_FOLDER_IMAGES);
        }
        else {
            CartItem newCartItem = cartMapper.toCartItem(cartItemRequest, user.getId());
            return cartMapper.toCartItemResponse(cartItemRepository.save(newCartItem), PRODUCT_FOLDER_IMAGES);
        }
    }

    @Override
    public CartItemResponse updateQuantity(User user, Long idCart, Integer newQuantity) {
        CartItem cartItem = cartItemRepository.findById(idCart).orElseThrow(() -> new RuntimeException("Cart item not found"));
        if (!cartItem.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized access to cart item");
        }
        if (newQuantity <= 0) {
            throw new CartBadRequestException();
        }
        Product product = productDao.findByName(cartItem.getProductName()).orElseThrow(() -> new ProductNotFoundException(cartItem.getProductName()));
        int difference = newQuantity - cartItem.getQuantity();
        if (difference > 0 && product.getQuantity() < difference) {
            throw new CartBadRequestException();
        }
        product.setQuantity(product.getQuantity() - difference);
        productDao.save(product);
        cartItem.setQuantity(newQuantity);
        CartItem saved = cartItemRepository.save(cartItem);
        return cartMapper.toCartItemResponse(saved, PRODUCT_FOLDER_IMAGES);
    }

    public void removeItem(Long itemId) {
        CartItem item = cartItemRepository.findById(itemId).orElseThrow(() ->  new RuntimeException("Item not found"));
        cartItemRepository.delete(item);
    }

    public void clearCart(User user) {
        List<CartItem> items = cartItemRepository.findByUser(user);
        cartItemRepository.deleteAll(items);
    }
}

