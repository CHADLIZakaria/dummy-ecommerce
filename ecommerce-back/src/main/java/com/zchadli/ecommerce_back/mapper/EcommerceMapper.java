package com.zchadli.ecommerce_back.mapper;

import com.zchadli.ecommerce_back.model.Category;
import com.zchadli.ecommerce_back.request.CategorySaveRequest;
import com.zchadli.ecommerce_back.response.CategoryResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface EcommerceMapper {
    @Mapping(source = "file.fileName", target = "imagePath")
    CategoryResponse toCategoryResponse(Category category);
    Category toCategory(CategorySaveRequest categorySaveRequest);
    List<CategoryResponse> toCategoriesResponse(List<Category> category);
}
