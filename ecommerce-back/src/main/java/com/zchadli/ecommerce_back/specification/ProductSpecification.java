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
    public static Specification<Product> inCategories(List<Long> idsCategory) {
        return (root, query, criteriaBuilder) -> root.get("category").get("id").in(idsCategory);
    }
    public static Specification<Product> inBrands(List<Long> idsBrand) {
        return (root, query, criteriaBuilder) -> root.get("brand").get("id").in(idsBrand);
    }

    public static Specification<Product> hasPriceInRange(Double minPrice, Double maxPrice) {
        return (root, query, criteriaBuilder) -> {
            return criteriaBuilder.between(root.get("price"), minPrice, maxPrice);
        };
    }

}
