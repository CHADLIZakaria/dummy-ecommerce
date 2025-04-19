package com.zchadli.ecommerce_back.repository;

import com.zchadli.ecommerce_back.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.Optional;

public interface CategoryDao extends JpaRepository<Category, Long>, JpaSpecificationExecutor<Category> {
   boolean existsByTitle(String title);
}
