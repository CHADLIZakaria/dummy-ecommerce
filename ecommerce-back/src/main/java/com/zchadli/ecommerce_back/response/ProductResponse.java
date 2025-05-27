package com.zchadli.ecommerce_back.response;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ProductResponse {
    private Long id;
    String name;
    String slug;
    String description;
    Double price;
    List<String> images;
    Double avgReview;
    Double reviewsCounts;
    String coverImage;
    boolean isFavorite;
}

