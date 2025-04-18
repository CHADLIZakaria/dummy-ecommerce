package com.zchadli.ecommerce_back.mapper;

import com.zchadli.ecommerce_back.dto.CategoryDto;
import com.zchadli.ecommerce_back.model.Category;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface EcommerceMapper {
    CategoryDto toCategoryDto(Category category);
    Category toCategory(CategoryDto categoryDto);
    List<CategoryDto> toCategoriesDto(List<Category> category);
}
