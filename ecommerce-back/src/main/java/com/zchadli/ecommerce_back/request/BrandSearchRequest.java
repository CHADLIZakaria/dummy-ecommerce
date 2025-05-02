package com.zchadli.ecommerce_back.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BrandSearchRequest {
    private int page = 0;
    private int size = 10;
    private String[] sort = {"id", "desc"};
    private String keyword;
}
