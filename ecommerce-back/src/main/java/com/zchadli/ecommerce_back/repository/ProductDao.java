package com.zchadli.ecommerce_back.repository;

import com.zchadli.ecommerce_back.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.Optional;

public interface ProductDao extends JpaRepository<Product, Long>, JpaSpecificationExecutor<Product> {
   boolean existsByName(String name);

    Optional<Product> findBySlug(String slug);
}
