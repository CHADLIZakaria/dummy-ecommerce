package com.zchadli.ecommerce_back.specification;

import com.zchadli.ecommerce_back.model.Brand;
import com.zchadli.ecommerce_back.model.Category;
import org.springframework.data.jpa.domain.Specification;

public class BrandSpecification {
    private BrandSpecification() {}
    public static Specification<Brand> nameContains(String name) {
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
