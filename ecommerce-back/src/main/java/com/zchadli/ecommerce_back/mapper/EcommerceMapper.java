package com.zchadli.ecommerce_back.mapper;

import com.zchadli.ecommerce_back.model.*;
import com.zchadli.ecommerce_back.request.BrandSaveRequest;
import com.zchadli.ecommerce_back.request.CategorySaveRequest;
import com.zchadli.ecommerce_back.request.ProductSaveRequest;
import com.zchadli.ecommerce_back.request.ReviewSaveRequest;
import com.zchadli.ecommerce_back.response.*;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.util.List;

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

    @Mapping(source = "category.title", target = "category")
    @Mapping(source = "coverImage.fileName", target = "coverImage")
    ProductResponse toProductResponse(Product product);

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

    Brand toBrand(BrandSaveRequest brandSaveRequest);
    BrandResponse toBrandResponse(Brand brand);
    @Mapping(source = "products", target = "productCounts", qualifiedByName = "mapProductCount")
    BrandFilterResponse toBrandFilterResponse(Brand brand);
    List<BrandFilterResponse> toBrandsFilterResponse(List<Brand> brand);

    Review toReview(ReviewSaveRequest reviewSaveRequest);
    @Mapping(source = "product.id", target = "idProduct")
    ReviewResponse toReviewResponse(Review review);
    List<ReviewResponse> toReviewsResponse(List<Review> review);
}
