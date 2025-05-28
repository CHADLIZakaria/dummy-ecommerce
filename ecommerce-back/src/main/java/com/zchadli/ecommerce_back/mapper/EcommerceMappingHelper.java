package com.zchadli.ecommerce_back.mapper;

import com.zchadli.ecommerce_back.model.*;
import org.mapstruct.Context;
import org.mapstruct.Named;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Set;
@Component
public class EcommerceMappingHelper {

    @Named("mapUploadedFileToFileName")
    public static String mapUploadedFileToFileName(UploadedFile file) {
        return file != null ? file.getFileName() : null;
    }

    @Named("mapProductCount")
    public static Integer mapProductCount(List<Product> products) {
        return products != null ? products.size() : 0;
    }

    @Named("mapReviewsCount")
    public static Integer mapReviewsCount(List<Review> reviews) {
        return reviews != null ? reviews.size() : 0;
    }

    @Named("mapAvgReviews")
    public static Double mapAvgReviews(List<Review> reviews) {
        return reviews != null && !reviews.isEmpty()
                ? reviews.stream().mapToInt(Review::getRating).average().orElse(0)
                : 0d;
    }

    @Named("isProductFavorite")
    public static boolean isProductFavorite(Product product, @Context Set<Long> favoriteProductIds) {
        return favoriteProductIds != null && favoriteProductIds.contains(product.getId());
    }
}
