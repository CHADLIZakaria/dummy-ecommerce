package com.zchadli.ecommerce_back.repository;

import com.zchadli.ecommerce_back.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

public interface ProductDaoCustom {
    Page<Product> findAllSortedByAvgReview(Specification<Product> spec, Pageable pageable);
}
