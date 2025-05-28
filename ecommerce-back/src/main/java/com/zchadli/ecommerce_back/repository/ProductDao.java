package com.zchadli.ecommerce_back.repository;

import com.zchadli.ecommerce_back.model.Product;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;
import java.util.Optional;
import java.util.Set;

public interface ProductDao extends JpaRepository<Product, Long>, JpaSpecificationExecutor<Product> {
   boolean existsByName(String name);
    Optional<Product> findBySlug(String slug);
    List<Product> findByIdIn(Set<Long> ids, Sort sort);
}
