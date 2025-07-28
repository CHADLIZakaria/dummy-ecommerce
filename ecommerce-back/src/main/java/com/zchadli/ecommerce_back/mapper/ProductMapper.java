package com.zchadli.ecommerce_back.mapper;

import com.zchadli.ecommerce_back.model.Product;
import com.zchadli.ecommerce_back.model.Review;
import com.zchadli.ecommerce_back.model.UploadedFile;
import com.zchadli.ecommerce_back.request.ProductPrice;
import com.zchadli.ecommerce_back.request.ProductSaveRequest;
import com.zchadli.ecommerce_back.response.ProductCompareResponse;
import com.zchadli.ecommerce_back.response.ProductDetailsResponse;
import com.zchadli.ecommerce_back.response.ProductResponse;
import org.mapstruct.Context;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.util.List;
import java.util.Set;

@Mapper(componentModel = "spring", uses = { ImagePathMapper.class })
public interface ProductMapper extends  EcommerceMapper {
    @Mapping(source = "product", target = "coverImage", qualifiedByName = "mapImagePathWithFolder")
    @Mapping(source = "product.reviews", target = "reviewsCounts", qualifiedByName = "mapReviewsCount")
    @Mapping(source = "product.reviews", target = "avgReview", qualifiedByName = "mapAvgReviews")
    @Mapping(target = "favorite", ignore = true)
    ProductResponse toProductResponse(Product product);
    default ProductResponse toProductResponse(Product product, Set<Long> favoriteProductIds) {
        ProductResponse response = toProductResponse(product);
        response.setFavorite(favoriteProductIds != null && favoriteProductIds.contains(product.getId()));
        return response;
    }
    default List<ProductResponse> toProductsResponse(List<Product> products, Set<Long> favoriteProductIds) {
        return products.stream()
                .map(product -> toProductResponse(product, favoriteProductIds))
                .toList();
    }
    List<ProductPrice> toProducts(List<ProductResponse> productsResponse);
    @Named("mapReviewsCount")
    default Integer mapReviewsCount(List<Review> reviews) {
        return reviews != null ? reviews.size() : 0;
    }

    @Named("mapAvgReviews")
    default Double mapAvgReviews(List<Review> reviews) {
        return (reviews != null && !reviews.isEmpty()) ? reviews.stream().map(Review::getRating).reduce(0, Integer::sum)/(double)reviews.size() : 0d;
    }
    @Mapping(source = "idCategory", target = "category.id")
    Product toProduct(ProductSaveRequest productSaveRequest);

    @Mapping(source = "product.images", target = "images", qualifiedByName = "mapImageListWithPath")
    @Mapping(source = "product.category.title", target = "category")
    @Mapping(source = "product.brand.name", target = "brand")
    @Mapping(source = "product", target = "coverImage", qualifiedByName = "mapImagePathWithFolder")
    ProductDetailsResponse toProductDetailsResponse(Product product, boolean isFavorite);

    @Mapping(source = "product.category.title", target = "category")
    @Mapping(source = "product.brand.name", target = "brand")
    @Mapping(source = "product", target = "coverImage", qualifiedByName = "mapImagePathWithFolder")
    @Mapping(source = "product.reviews", target = "reviewsCounts", qualifiedByName = "mapReviewsCount")
    @Mapping(source = "product.reviews", target = "avgReview", qualifiedByName = "mapAvgReviews")
    ProductCompareResponse toProductCompareResponse(Product product);
    List<ProductCompareResponse> toProductsCompareResponse(List<Product> products);

    List<ProductResponse> toProductsResponse(List<Product> products);
    @Named("isProductFavorite")
    static boolean isProductFavorite(Product product, @Context Set<Long> favoriteProductIds) {
        return favoriteProductIds.contains(product.getId());
    }
    default List<String> mapUploadedFilesToStrings(List<UploadedFile> uploadedFiles) {
        return uploadedFiles.stream().map(UploadedFile::getFileName).toList();
    }
}
