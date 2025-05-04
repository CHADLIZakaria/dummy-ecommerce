package com.zchadli.ecommerce_back.controller;

import com.zchadli.ecommerce_back.request.ReviewSaveRequest;
import com.zchadli.ecommerce_back.response.EcommerceResponse;
import com.zchadli.ecommerce_back.response.ReviewResponse;
import com.zchadli.ecommerce_back.service.ReviewService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/reviews")
@RequiredArgsConstructor
public class ReviewController {
    private final ReviewService reviewService;
    @PostMapping()
    public ResponseEntity<EcommerceResponse<ReviewResponse>> save(
            @RequestBody() @Valid
            ReviewSaveRequest reviewSaveRequest) {
        return ResponseEntity.status(HttpStatus.CREATED).body(new EcommerceResponse<>(201, "Review saved successfully", reviewService.save(reviewSaveRequest)));
    }
}
