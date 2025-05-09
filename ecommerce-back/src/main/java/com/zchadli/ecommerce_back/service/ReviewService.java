package com.zchadli.ecommerce_back.service;

import com.zchadli.ecommerce_back.request.ReviewSaveRequest;
import com.zchadli.ecommerce_back.response.PageResponse;
import com.zchadli.ecommerce_back.response.ReviewResponse;

import java.util.Map;

public interface ReviewService {
    ReviewResponse save(ReviewSaveRequest reviewSaveRequest);
    PageResponse<ReviewResponse> findReviews(Map<String, String[]> searchCriteria);
}
