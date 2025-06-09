package com.zchadli.ecommerce_back.repository;

import com.zchadli.ecommerce_back.model.Product;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.criteria.*;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.domain.Specification;
import java.util.List;

public class ProductDaoImpl implements ProductDaoCustom {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Page<Product> findAllSortedByAvgReview(Specification<Product> spec, Pageable pageable) {
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<Product> query = cb.createQuery(Product.class);
        Root<Product> root = query.from(Product.class);
        Join<Object, Object> reviewsJoin = root.join("reviews", JoinType.LEFT);
        query.select(root);
        query.groupBy(root.get("id"));
        Predicate predicate = spec != null ? spec.toPredicate(root, query, cb) : cb.conjunction();
        query.where(predicate);
        Path<Number> rating = reviewsJoin.get("rating");
        Sort.Order sortOrder = pageable.getSort().getOrderFor("avgReview");
        Order order = (sortOrder != null && sortOrder.getDirection() == Sort.Direction.ASC)
                ? cb.asc(cb.avg(rating))
                : cb.desc(cb.avg(rating));
        query.orderBy(order);
        List<Product> results = entityManager.createQuery(query)
                .setFirstResult((int) pageable.getOffset())
                .setMaxResults(pageable.getPageSize())
                .getResultList();

        // Count query
        CriteriaQuery<Long> countQuery = cb.createQuery(Long.class);
        Root<Product> countRoot = countQuery.from(Product.class);
        countRoot.join("reviews", JoinType.LEFT);
        countQuery.select(cb.countDistinct(countRoot));
        countQuery.where(spec != null ? spec.toPredicate(countRoot, countQuery, cb) : cb.conjunction());
        Long total = entityManager.createQuery(countQuery).getSingleResult();

        return new PageImpl<>(results, pageable, total);
    }
}
