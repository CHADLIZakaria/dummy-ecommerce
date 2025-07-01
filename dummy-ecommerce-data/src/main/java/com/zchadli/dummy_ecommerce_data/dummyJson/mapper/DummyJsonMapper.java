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

import java.util.List;

@Mapper(componentModel = "spring")
public interface DummyJsonMapper {
    List<Category> toCategoryList(List<String> nameList);
    @Mapping(target = "title", source = ".")
    Category map(String value);

    @Mapping(source = "product.title", target = "name")
    @Mapping(source = "idCategory", target = "idCategory")
    @Mapping(source = "idBrand", target = "idBrand")
    Product toProduct(DummyProduct product, Long idCategory, Long idBrand);
    @Mapping(source = "review.date", target = "createdAt")
    ReviewRequest toReview(DummyReview review, Long idProduct);

    User toUser(DummyUser dummyUser);

}
