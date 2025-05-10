package com.zchadli.ecommerce_back.service.impl;

import com.zchadli.ecommerce_back.exception.product.ProductNotFoundException;
import com.zchadli.ecommerce_back.exception.user.UserNotFoundException;
import com.zchadli.ecommerce_back.mapper.EcommerceMapper;
import com.zchadli.ecommerce_back.model.Product;
import com.zchadli.ecommerce_back.model.Review;
import com.zchadli.ecommerce_back.model.User;
import com.zchadli.ecommerce_back.repository.ProductDao;
import com.zchadli.ecommerce_back.repository.ReviewDao;
import com.zchadli.ecommerce_back.repository.UserDao;
import com.zchadli.ecommerce_back.request.ReviewSaveRequest;
import com.zchadli.ecommerce_back.response.PageResponse;
import com.zchadli.ecommerce_back.response.ReviewResponse;
import com.zchadli.ecommerce_back.service.ReviewService;
import com.zchadli.ecommerce_back.specification.SpecificationBuilderHelper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {
    private final ReviewDao reviewDao;
    private final ProductDao productDao;
    private final UserDao userDao;
    private final EcommerceMapper ecommerceMapper;
    @Override
    public ReviewResponse save(ReviewSaveRequest reviewSaveRequest) {
        Product product = productDao.findById(reviewSaveRequest.idProduct()).orElseThrow(() -> new ProductNotFoundException(reviewSaveRequest.idProduct()));
        User user = userDao.findById(reviewSaveRequest.idUser()).orElseThrow(() -> new UserNotFoundException(""));
        Review review = ecommerceMapper.toReview(reviewSaveRequest);
        return ecommerceMapper.toReviewResponse(reviewDao.save(review));
    }
    @Override
    public PageResponse<ReviewResponse> findReviews(Map<String, String[]> reviewSearchRequest) {
        Specification<Review> specification = SpecificationBuilderHelper.buildSpecificationFromParams(reviewSearchRequest);
        Pageable pageable = SpecificationBuilderHelper.buildPageableFromParams(reviewSearchRequest);
        Page<Review> reviewPage = reviewDao.findAll(specification, pageable);
        return new PageResponse<>(
            ecommerceMapper.toReviewsResponse(reviewPage.getContent()),
            reviewPage.getTotalElements(),
            reviewPage.getSize(),
            reviewPage.getNumber()
        );
    }
}
