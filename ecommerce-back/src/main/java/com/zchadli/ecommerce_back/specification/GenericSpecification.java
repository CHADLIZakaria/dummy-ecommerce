package com.zchadli.ecommerce_back.specification;

import com.zchadli.ecommerce_back.request.SearchCriteria;
import jakarta.persistence.criteria.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.domain.Specification;

import java.util.Collection;

@RequiredArgsConstructor
public class GenericSpecification<T> implements Specification<T> {
    private final SearchCriteria searchCriteria;
    @Override
    public Predicate toPredicate(Root<T> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
        Path<?> path;
        if(searchCriteria.key().contains(".")) {
            String[] keys = searchCriteria.key().split("\\.");
            path = root.get(keys[0]);
            for(int i=1; i<keys.length; i++) {
                path = path.get(keys[i]);
            }
        }
        else {
            path = root.get(searchCriteria.key());
        }
        switch(searchCriteria.operation()) {
            case ">=":
                return criteriaBuilder.greaterThanOrEqualTo(path.as(String.class), searchCriteria.value().toString());
            case "=":
                return criteriaBuilder.equal(path.as(String.class), searchCriteria.value().toString());
            case "<=":
                return criteriaBuilder.lessThanOrEqualTo(path.as(String.class), searchCriteria.value().toString());
            case "like":
                return criteriaBuilder.like(criteriaBuilder.lower(path.as(String.class)), "%"+searchCriteria.value().toString().toLowerCase()+"%");
            case "in":
                if(searchCriteria.value() instanceof Collection<?>) {
                    return path.in((Collection<?>) searchCriteria.value());
                }
                break;
        }
        return null;
    }
}
