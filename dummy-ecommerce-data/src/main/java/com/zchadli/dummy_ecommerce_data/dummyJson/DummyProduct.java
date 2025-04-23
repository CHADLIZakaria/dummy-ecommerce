package com.zchadli.dummy_ecommerce_data.dummyJson;

import java.util.List;

public record DummyProduct(String title, String description, Double price, String category, List<String> images, String thumbnail) {

}
