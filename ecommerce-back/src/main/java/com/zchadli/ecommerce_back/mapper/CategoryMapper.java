package com.zchadli.ecommerce_back.mapper;

import com.zchadli.ecommerce_back.model.Category;
import com.zchadli.ecommerce_back.request.CategorySaveRequest;
import com.zchadli.ecommerce_back.response.CategoryFilterResponse;
import com.zchadli.ecommerce_back.response.CategoryResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring", uses = { ImagePathMapper.class })
public interface CategoryMapper extends EcommerceMapper {
    @Mapping(source = "category", target = "imagePath", qualifiedByName = "mapImagePathWithFolder")
    CategoryResponse toCategoryResponse(Category category);
    List<CategoryResponse> toCategoriesResponse(List<Category> categories);

    @Mapping(source = "file.fileName", target = "imagePath")
    @Mapping(source = "products", target = "productCounts", qualifiedByName = "mapProductCount")
    CategoryFilterResponse toCategoryFilterResponse(Category category);
    List<CategoryFilterResponse> toCategoriesFilterResponse(List<Category> category);

    Category toCategory(CategorySaveRequest categorySaveRequest);
}
