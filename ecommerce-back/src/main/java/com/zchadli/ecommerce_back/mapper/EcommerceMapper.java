package com.zchadli.ecommerce_back.mapper;

import com.zchadli.ecommerce_back.model.Category;
import com.zchadli.ecommerce_back.model.Product;
import com.zchadli.ecommerce_back.model.UploadedFile;
import com.zchadli.ecommerce_back.request.CategorySaveRequest;
import com.zchadli.ecommerce_back.request.ProductSaveRequest;
import com.zchadli.ecommerce_back.response.CategoryFilterResponse;
import com.zchadli.ecommerce_back.response.CategoryResponse;
import com.zchadli.ecommerce_back.response.ProductResponse;
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
    ProductResponse toProductResponse(Product product);

    @Mapping(source = "idCategory", target = "category.id")
    Product toProduct(ProductSaveRequest productSaveRequest);

    default List<String> mapUploadedFilesToStrings(List<UploadedFile> uploadedFiles) {
        return uploadedFiles.stream().map(UploadedFile::getFileName).toList();
    }
    List<ProductResponse> toProductsResponse(List<Product> products);
}
