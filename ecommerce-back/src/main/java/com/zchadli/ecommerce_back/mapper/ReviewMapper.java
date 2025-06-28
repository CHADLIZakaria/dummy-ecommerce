package com.zchadli.ecommerce_back.mapper;

import com.zchadli.ecommerce_back.model.Review;
import com.zchadli.ecommerce_back.request.ReviewSaveRequest;
import com.zchadli.ecommerce_back.response.ReviewResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring", uses = { ImagePathMapper.class })
public interface ReviewMapper {
    @Mapping(source = "idProduct", target = "product.id")
    @Mapping(source = "idUser", target = "user.id")
    Review toReview(ReviewSaveRequest reviewSaveRequest);
    @Mapping(source = "product.id", target = "idProduct")
    @Mapping(source = "user.username", target = "username")
    @Mapping(source = "user", target = "userImage", qualifiedByName = "mapImagePathWithFolder")
    ReviewResponse toReviewResponse(Review review);
    List<ReviewResponse> toReviewsResponse(List<Review> review);
}
