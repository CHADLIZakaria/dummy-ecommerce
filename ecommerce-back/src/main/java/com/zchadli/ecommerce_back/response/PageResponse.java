package com.zchadli.ecommerce_back.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PageResponse<T> {
    private List<T> data;
    private long totalElements;
    private int size;
    private int page;
}
