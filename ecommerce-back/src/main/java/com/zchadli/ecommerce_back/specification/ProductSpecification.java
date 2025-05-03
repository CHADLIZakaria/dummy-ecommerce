package com.zchadli.ecommerce_back.specification;

import com.zchadli.ecommerce_back.model.Product;
import org.springframework.data.jpa.domain.Specification;

import java.util.List;

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
    public static Specification<Product> inCategories(List<Long> idsCategories) {
        return (root, query, criteriaBuilder) -> root.get("category").get("id").in(idsCategories);
    }
}
