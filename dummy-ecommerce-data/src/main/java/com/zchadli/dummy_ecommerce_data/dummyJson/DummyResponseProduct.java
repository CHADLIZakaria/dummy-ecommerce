package com.zchadli.dummy_ecommerce_data.dummyJson;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class DummyResponseProduct {
    private List<DummyProduct> products;
}
