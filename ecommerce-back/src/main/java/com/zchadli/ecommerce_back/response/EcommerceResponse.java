package com.zchadli.ecommerce_back.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class EcommerceResponse<T> {
    private Integer status;
    private String message;
    private T data;
}
