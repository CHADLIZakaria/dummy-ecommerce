package com.zchadli.ecommerce_back.request;

public record SearchCriteria(String key, String operation, Object value) {
}
