package com.zchadli.ecommerce_back.repository;

import com.zchadli.ecommerce_back.model.Favorite;
import com.zchadli.ecommerce_back.model.Product;
import com.zchadli.ecommerce_back.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FavoriteDao extends JpaRepository<Favorite, Long> {
    List<Favorite> findByUser(User user);
    Optional<Favorite> findByUserAndProduct(User user, Product product);
    void deleteByUserAndProduct(User user, Product product);
}
