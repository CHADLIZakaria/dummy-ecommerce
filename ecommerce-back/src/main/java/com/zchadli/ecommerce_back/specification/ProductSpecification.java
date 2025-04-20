package com.zchadli.ecommerce_back.specification;

import com.zchadli.ecommerce_back.model.Product;
import org.springframework.data.jpa.domain.Specification;

public class ProductSpecification {
    private ProductSpecification() {}
    public static Specification<Product> nameContains(String name) {
        return (root, query, criteriaBuilder) -> {
            if(name == null || name.trim().isEmpty()) {
                return criteriaBuilder.conjunction();
            }
            return criteriaBuilder.like(
                    criteriaBuilder.lower(root.get("name")),
                    "%"+name.toLowerCase()+"%");
        };
    }
}
