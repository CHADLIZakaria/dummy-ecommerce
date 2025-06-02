package com.zchadli.ecommerce_back.repository;

import com.zchadli.ecommerce_back.model.CartItem;
import com.zchadli.ecommerce_back.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CartItemDao extends JpaRepository<CartItem, Long> {
    List<CartItem> findByUser(User user);
    Optional<CartItem> findByUserAndProductName(User user, String productName);
}
