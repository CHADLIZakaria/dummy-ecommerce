package com.zchadli.ecommerce_back.mapper;

import com.zchadli.ecommerce_back.model.*;
import com.zchadli.ecommerce_back.request.BrandSaveRequest;
import com.zchadli.ecommerce_back.request.CategorySaveRequest;
import com.zchadli.ecommerce_back.request.ProductSaveRequest;
import com.zchadli.ecommerce_back.request.ReviewSaveRequest;
import com.zchadli.ecommerce_back.response.*;
import org.mapstruct.Context;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.util.List;
import java.util.Set;

@Mapper(componentModel = "spring")
public interface EcommerceMapper {
    @Mapping(source = "file.fileName", target = "imagePath")
    CategoryResponse toCategoryResponse(Category category);
    @Mapping(source = "file.fileName", target = "imagePath")
    @Mapping(source = "products", target = "productCounts", qualifiedByName = "mapProductCount")
    CategoryFilterResponse toCategoryFilterResponse(Category category);
    @Named("mapProductCount")
    default Integer mapProductCount(List<Product> products) {
        return products != null ? products.size() : 0;
    }
    List<CategoryFilterResponse> toCategoriesFilterResponse(List<Category> category);
    Category toCategory(CategorySaveRequest categorySaveRequest);
    List<CategoryResponse> toCategoriesResponse(List<Category> categories);

    @Mapping(source = "product.coverImage.fileName", target = "coverImage")
    @Mapping(source = "product.reviews", target = "reviewsCounts", qualifiedByName = "mapReviewsCount")
    @Mapping(source = "product.reviews", target = "avgReview", qualifiedByName = "mapAvgReviews")
    @Mapping(source = "product", target = "isFavorite", qualifiedByName = "isProductFavorite")
    ProductResponse toProductResponse(Product product, Set<Long> favoriteProductIds);
    @Named("mapReviewsCount")
    default Integer mapReviewsCount(List<Review> reviews) {
        return reviews != null ? reviews.size() : 0;
    }

    @Named("mapAvgReviews")
    default Double mapAvgReviews(List<Review> reviews) {
        return reviews != null ? reviews.stream().map(Review::getRating).reduce(0, Integer::sum)/(double)reviews.size() : 0d;
    }
    @Mapping(source = "idCategory", target = "category.id")
    Product toProduct(ProductSaveRequest productSaveRequest);
    @Mapping(source = "category.title", target = "category")
    @Mapping(source = "coverImage.fileName", target = "coverImage")
    @Mapping(source = "brand.name", target = "brand")
    ProductDetailsResponse toProductDetailsResponse(Product product);
    default List<String> mapUploadedFilesToStrings(List<UploadedFile> uploadedFiles) {
        return uploadedFiles.stream().map(UploadedFile::getFileName).toList();
    }

    List<ProductResponse> toProductsResponse(List<Product> products);

    default List<ProductResponse> toProductsResponse(List<Product> products, Set<Long>  favoriteProductIds) {
        return products.stream().map(product -> toProductResponse(product, favoriteProductIds)).toList();
    }
    @Named("isProductFavorite")
    static boolean isProductFavorite(Product product, @Context Set<Long> favoriteProductIds) {
        return favoriteProductIds.contains(product.getId());
    }
    Brand toBrand(BrandSaveRequest brandSaveRequest);
    BrandResponse toBrandResponse(Brand brand);
    @Mapping(source = "products", target = "productCounts", qualifiedByName = "mapProductCount")
    BrandFilterResponse toBrandFilterResponse(Brand brand);
    List<BrandFilterResponse> toBrandsFilterResponse(List<Brand> brand);

    @Mapping(source = "idProduct", target = "product.id")
    @Mapping(source = "idUser", target = "user.id")
    Review toReview(ReviewSaveRequest reviewSaveRequest);
    @Mapping(source = "product.id", target = "idProduct")
    @Mapping(source = "user.username", target = "username")
    @Mapping(source = "user.file.fileName", target = "userImage")
    ReviewResponse toReviewResponse(Review review);
    List<ReviewResponse> toReviewsResponse(List<Review> review);
    @Mapping(source = "file.fileName", target = "filePath")
    UserResponse toUserResponse(User user);
}
