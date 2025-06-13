package com.zchadli.ecommerce_back.mapper;

import com.zchadli.ecommerce_back.model.*;
import org.mapstruct.Mapper;
import org.mapstruct.Named;

import java.util.List;

@Mapper(componentModel = "spring")
public interface EcommerceMapper {
    @Named("mapUploadedFileToFileName")
    default String mapUploadedFileToFileName(UploadedFile file) {
        return file != null ? file.getFileName() : null;
    }

    @Named("mapProductCount")
    default Integer mapProductCount(List<Product> products) {
        return products != null ? products.size() : 0;
    }
}
