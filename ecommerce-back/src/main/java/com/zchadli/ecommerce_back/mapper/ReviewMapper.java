package com.zchadli.ecommerce_back.mapper;

import com.zchadli.ecommerce_back.model.Review;
import com.zchadli.ecommerce_back.request.ReviewSaveRequest;
import com.zchadli.ecommerce_back.response.ReviewResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring", uses = { ImagePathMapper.class })
public interface ReviewMapper {
    @Mapping(source = "slugProduct", target = "product.slug")
    @Mapping(source = "username", target = "user.username")
    @Mapping(source = "createdAt",target = "createdAt")
    Review toReview(ReviewSaveRequest reviewSaveRequest);
    @Mapping(source = "product.id", target = "idProduct")
    @Mapping(source = "user.username", target = "username")
    @Mapping(source = "user", target = "userImage", qualifiedByName = "mapImagePathWithFolder")
    ReviewResponse toReviewResponse(Review review);
    List<ReviewResponse> toReviewsResponse(List<Review> review);
}
