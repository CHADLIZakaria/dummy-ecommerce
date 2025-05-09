package com.zchadli.ecommerce_back.repository;

import com.zchadli.ecommerce_back.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface ReviewDao extends JpaRepository<Review, Long>, JpaSpecificationExecutor<Review> {
}
