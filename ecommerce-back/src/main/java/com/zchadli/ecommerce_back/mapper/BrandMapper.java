package com.zchadli.ecommerce_back.mapper;

import com.zchadli.ecommerce_back.model.Brand;
import com.zchadli.ecommerce_back.request.BrandSaveRequest;
import com.zchadli.ecommerce_back.response.BrandFilterResponse;
import com.zchadli.ecommerce_back.response.BrandResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface BrandMapper extends  EcommerceMapper {
    Brand toBrand(BrandSaveRequest brandSaveRequest);
    BrandResponse toBrandResponse(Brand brand);
    @Mapping(source = "products", target = "productCounts", qualifiedByName = "mapProductCount")
    BrandFilterResponse toBrandFilterResponse(Brand brand);
    List<BrandFilterResponse> toBrandsFilterResponse(List<Brand> brand);
}
