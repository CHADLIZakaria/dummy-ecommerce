package com.zchadli.ecommerce_back.request;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ProductSearchRequest {
    private int page = 0;
    private int size = 10;
    private String[] sort = {"id", "desc"};
    private String keyword;
    private List<Long> idsCategory;
    private List<Long> idsBrand;
    private Double minPrice;
    private Double maxPrice;
}
