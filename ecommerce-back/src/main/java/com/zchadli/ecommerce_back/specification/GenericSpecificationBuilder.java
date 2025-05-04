package com.zchadli.ecommerce_back.specification;

import com.zchadli.ecommerce_back.request.SearchCriteria;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;

public class GenericSpecificationBuilder<T> {
    private final List<SearchCriteria> params = new ArrayList<>();
    public GenericSpecificationBuilder<T> with(String key, String operation, Object value) {
        params.add(new SearchCriteria(key, operation, value));
        return this;
    }
    public Specification<T> build() {
        if(params.isEmpty()) {
            return null;
        }
        return ((root, query, criteriaBuilder) -> {
           List<Predicate> predicates = new ArrayList<>();
           for(SearchCriteria param: params) {
               String key = param.key();
               String operation = param.operation();
               Object value = param.value();
               switch (operation.toLowerCase()) {
                   case "equal":
                       predicates.add(criteriaBuilder.equal(root.get(key), value));
                       break;
                   case "like":
                       predicates.add(criteriaBuilder.like(criteriaBuilder.lower(root.get(key)), "%"+value.toString().toLowerCase()+"%"));
                       break;
               }
           }
           return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        });
    }
}
