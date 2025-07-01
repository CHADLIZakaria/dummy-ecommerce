package com.zchadli.dummy_ecommerce_data.ecommerce.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReviewRequest {
    Long idProduct;
    Integer rating;
    String comment;
    Long idUser;
    String createdAt;
}