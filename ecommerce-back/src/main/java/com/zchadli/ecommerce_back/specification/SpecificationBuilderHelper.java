package com.zchadli.ecommerce_back.specification;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;

import java.util.*;
import java.util.stream.Collectors;

public class SpecificationBuilderHelper {
    private static final Map<String, String> OPERATOR_MAP = Map.of(
    "eq", "=",
    "gte", ">=",
    "lte", "<=",
    "like", "like",
    "in", "in");
    public static <T> Specification<T> buildSpecificationFromParams(Map<String, String[]> parameterMap) {
        GenericSpecificationBuilder<T> builder = new GenericSpecificationBuilder<>();
        Map<String, List<String>> filtersParam = new HashMap<>();
        for(Map.Entry<String, String[]> entry: parameterMap.entrySet()) {
            String key = entry.getKey();
            String[] values = entry.getValue();
            List<String> nonEmptyValues = Arrays.stream(values)
                    .flatMap(value -> Arrays.stream(value.split(",")))
                    .map(String::trim)
                    .filter(v -> !v.isEmpty())
                    .collect(Collectors.toList());
            if(!nonEmptyValues.isEmpty()) {
                filtersParam.put(key, nonEmptyValues);
            }
        }
        filtersParam.forEach((param, values) -> {
            if(param.contains("__") && values.size() > 0) {
                String[] parts = param.split("__");
                String key = parts[0];
                String opKey = parts[1];
                String operation = OPERATOR_MAP.get(opKey);
                if(operation != null) {
                    Object value = values.get(0);
                    if(operation.equals("in")) {
                        value = Arrays.asList(values.get(0).split(","));
                    }
                    builder.with(key, operation, value);
                }
            }
        });
        return builder.build();
    }
    public static Pageable buildPageableFromParams(Map<String, String[]> parameterMap) {
        List<Sort.Order> orders = new ArrayList<>();
        String[] sortParams = parameterMap.getOrDefault("sort", new String[0]);
        for(String param: sortParams) {
            String[] parts = param.split(",");
            String property = parts[0];
            String direction = parts.length > 1 ? parts[1] : "asc";
            Sort.Direction dir = direction.equalsIgnoreCase("desc") ? Sort.Direction.DESC : Sort.Direction.ASC;
            orders.add(new Sort.Order(dir, property));
        }
        int page = parseIntParam(parameterMap, "page", 0);
        int size = parseIntParam(parameterMap, "size", 10);
        if(orders.isEmpty()) {
            return PageRequest.of(page, size);
        }
        else {
            return PageRequest.of(page, size, Sort.by(orders));
        }
    }
    private static int parseIntParam(Map<String, String[]> parameterMap, String key, int defaultValue) {
        String[] values = parameterMap.get(key);
        if(values != null && values.length > 0) {
            return Integer.parseInt(values[0]);
        }
        return defaultValue;
    }
}
