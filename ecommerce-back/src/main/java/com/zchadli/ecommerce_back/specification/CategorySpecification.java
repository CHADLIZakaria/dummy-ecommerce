package com.zchadli.ecommerce_back.specification;

import com.zchadli.ecommerce_back.model.Category;
import org.springframework.data.jpa.domain.Specification;

public class CategorySpecification {
    public static Specification<Category> titleContains(String title) {
        return (root, query, criteriaBuilder) -> {
            if(title == null || title.trim().isEmpty()) {
                return criteriaBuilder.conjunction();
            }
            return criteriaBuilder.like(
                    criteriaBuilder.lower(root.get("title")),
                    "%"+title.toLowerCase()+"%");
        };
    }
}
