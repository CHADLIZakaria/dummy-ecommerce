package com.zchadli.dummy_ecommerce_data.dummyJson.mapper;

import com.zchadli.dummy_ecommerce_data.dummyJson.model.DummyProduct;
import com.zchadli.dummy_ecommerce_data.dummyJson.DummyReview;
import com.zchadli.dummy_ecommerce_data.dummyJson.model.DummyUser;
import com.zchadli.dummy_ecommerce_data.ecommerce.model.Category;
import com.zchadli.dummy_ecommerce_data.ecommerce.model.Product;
import com.zchadli.dummy_ecommerce_data.ecommerce.model.ReviewRequest;
import com.zchadli.dummy_ecommerce_data.ecommerce.model.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface DummyJsonMapper {
    List<Category> toCategoryList(List<String> nameList);

    @Mapping(source = ".", target = "title", qualifiedByName = "formatCategorySlug")
    @Mapping(source = ".", target = "slug")
    Category map(String value);
    @Named("formatCategorySlug")
    default String formatCategorySlug(String slug) {
        return Arrays.stream(slug.split("-"))
                .map(word -> word.substring(0, 1).toUpperCase() + word.substring(1))
                .collect(Collectors.joining(" "));
    }

    @Mapping(source = "product.title", target = "name")
    @Mapping(source = "idCategory", target = "idCategory")
    @Mapping(source = "idBrand", target = "idBrand")
    @Mapping(source = "product.stock", target = "quantity")
    Product toProduct(DummyProduct product, Long idCategory, Long idBrand);
    @Mapping(source = "review.date", target = "createdAt")
    ReviewRequest toReview(DummyReview review, Long idProduct);

    User toUser(DummyUser dummyUser);

}
