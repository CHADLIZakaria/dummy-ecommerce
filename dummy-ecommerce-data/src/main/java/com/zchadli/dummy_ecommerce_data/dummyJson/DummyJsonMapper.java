package com.zchadli.dummy_ecommerce_data.dummyJson;

import com.zchadli.dummy_ecommerce_data.ecommerce.model.Category;
import com.zchadli.dummy_ecommerce_data.ecommerce.model.Product;
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
    Product toProduct(DummyProduct product, Long idCategory);
}
