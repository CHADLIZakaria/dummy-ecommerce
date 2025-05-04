package com.zchadli.ecommerce_back.service.impl;

import com.zchadli.ecommerce_back.exception.product.ProductNotFoundException;
import com.zchadli.ecommerce_back.mapper.EcommerceMapper;
import com.zchadli.ecommerce_back.model.Product;
import com.zchadli.ecommerce_back.model.Review;
import com.zchadli.ecommerce_back.repository.ProductDao;
import com.zchadli.ecommerce_back.repository.ReviewDao;
import com.zchadli.ecommerce_back.request.ReviewSaveRequest;
import com.zchadli.ecommerce_back.response.ReviewResponse;
import com.zchadli.ecommerce_back.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {
    private final ReviewDao reviewDao;
    private final ProductDao productDao;
    private final EcommerceMapper ecommerceMapper;

    @Override
    public ReviewResponse save(ReviewSaveRequest reviewSaveRequest) {
        Product product = productDao.findById(reviewSaveRequest.idProduct()).orElseThrow(() -> new ProductNotFoundException(reviewSaveRequest.idProduct()));
        Review review = ecommerceMapper.toReview(reviewSaveRequest);
        review.setProduct(product);
        return ecommerceMapper.toReviewResponse(reviewDao.save(review));
    }
}
