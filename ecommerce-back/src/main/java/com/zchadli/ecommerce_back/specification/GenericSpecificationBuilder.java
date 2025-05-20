package com.zchadli.ecommerce_back.specification;

import com.zchadli.ecommerce_back.request.SearchCriteria;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;

public class GenericSpecificationBuilder<T> {
    private final List<SearchCriteria> searchCriteriaList = new ArrayList<>();
    public GenericSpecificationBuilder<T> with(String key, String operation, Object value) {
        if(value != null) {
            searchCriteriaList.add(new SearchCriteria(key, operation, value));
        }
        return this;
    }
    public Specification<T> build() {
        if(searchCriteriaList.isEmpty()) {
            return null;
        }
        Specification<T> specification = new GenericSpecification<>(searchCriteriaList.get(0));
        for(int i=1; i<searchCriteriaList.size(); i++) {
            specification = Specification.where(specification).and(new GenericSpecification<>(searchCriteriaList.get(i)));
        }
        return specification;
    }
}
