package com.zchadli.ecommerce_back.service.impl;

import com.zchadli.ecommerce_back.exception.brand.category.BrandAlreadyExistsException;
import com.zchadli.ecommerce_back.exception.brand.category.BrandNotFoundException;
import com.zchadli.ecommerce_back.mapper.EcommerceMapper;
import com.zchadli.ecommerce_back.model.Brand;
import com.zchadli.ecommerce_back.repository.BrandDao;
import com.zchadli.ecommerce_back.request.BrandSaveRequest;
import com.zchadli.ecommerce_back.request.BrandSearchRequest;
import com.zchadli.ecommerce_back.response.BrandFilterResponse;
import com.zchadli.ecommerce_back.response.BrandResponse;
import com.zchadli.ecommerce_back.response.PageResponse;
import com.zchadli.ecommerce_back.service.BrandService;
import com.zchadli.ecommerce_back.specification.BrandSpecification;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BrandServiceImpl implements BrandService {
    private final BrandDao brandDao;
    private final EcommerceMapper ecommerceMapper;
    @Override
    public BrandResponse save(BrandSaveRequest brandSaveRequest) {
        if(brandDao.existsByName(brandSaveRequest.name())) {
            throw new BrandAlreadyExistsException(brandSaveRequest.name());
        }
        Brand brand = ecommerceMapper.toBrand(brandSaveRequest);
        return ecommerceMapper.toBrandResponse(brandDao.save(brand));
    }
    @Override
    public BrandResponse findByName(String name) {
        Brand brand = brandDao.findByName(name).orElseThrow(() -> new BrandNotFoundException(name));
        return ecommerceMapper.toBrandResponse(brand);
    }
    @Override
    public PageResponse<BrandFilterResponse> findAllWithNumberProducts(BrandSearchRequest brandSearchRequest) {
        String[] sort = brandSearchRequest.getSort();
        Sort.Direction direction = Sort.Direction.fromString(sort[1]);
        Sort sortBy = Sort.by(direction, sort[0]);
        Specification<Brand> specification = Specification.where(null);
        if(brandSearchRequest.getKeyword() != null && !brandSearchRequest.getKeyword().isBlank()) {
            specification  = specification.and(BrandSpecification.nameContains(brandSearchRequest.getKeyword()));
        }
        Pageable pageable = null;
        if(brandSearchRequest.getSize()==0) {
            pageable = Pageable.unpaged(sortBy);
        }
        else {
            pageable = PageRequest.of(
                brandSearchRequest.getPage(),
                brandSearchRequest.getSize(),
                sortBy
            );
        }
        Page<Brand> brandPage = brandDao.findAll(specification, pageable);
        return new PageResponse<>(
            ecommerceMapper.toBrandsFilterResponse(brandPage.getContent()),
            brandPage.getTotalElements(),
            brandPage.getSize(),
            brandPage.getNumber()
        );
    }

}
