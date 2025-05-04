package com.zchadli.ecommerce_back.service;

import com.zchadli.ecommerce_back.request.ReviewSaveRequest;
import com.zchadli.ecommerce_back.response.ReviewResponse;

public interface ReviewService {
    ReviewResponse save(ReviewSaveRequest reviewSaveRequest);
}
