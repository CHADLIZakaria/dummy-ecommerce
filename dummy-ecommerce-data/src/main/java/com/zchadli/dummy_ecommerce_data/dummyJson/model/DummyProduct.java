package com.zchadli.dummy_ecommerce_data.dummyJson.model;

import com.zchadli.dummy_ecommerce_data.dummyJson.DummyReview;

import java.util.List;

public record DummyProduct(String title, String description, Double price, String category, List<String> images, String thumbnail, String brand, List<DummyReview> reviews, String sku, String date) {

}
