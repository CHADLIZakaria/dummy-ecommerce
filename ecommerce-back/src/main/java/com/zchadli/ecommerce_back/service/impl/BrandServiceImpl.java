package com.zchadli.ecommerce_back.service.impl;

import com.zchadli.ecommerce_back.exception.brand.BrandAlreadyExistsException;
import com.zchadli.ecommerce_back.exception.brand.BrandNotFoundException;
import com.zchadli.ecommerce_back.mapper.BrandMapper;
import com.zchadli.ecommerce_back.model.Brand;
import com.zchadli.ecommerce_back.repository.BrandDao;
import com.zchadli.ecommerce_back.request.BrandSaveRequest;
import com.zchadli.ecommerce_back.response.BrandFilterResponse;
import com.zchadli.ecommerce_back.response.BrandResponse;
import com.zchadli.ecommerce_back.response.PageResponse;
import com.zchadli.ecommerce_back.service.BrandService;
import com.zchadli.ecommerce_back.specification.SpecificationBuilderHelper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class BrandServiceImpl implements BrandService {
    private final BrandDao brandDao;
    private final BrandMapper brandMapper;
    @Override
    public BrandResponse save(BrandSaveRequest brandSaveRequest) {
        if(brandDao.existsByName(brandSaveRequest.name())) {
            throw new BrandAlreadyExistsException(brandSaveRequest.name());
        }
        Brand brand = brandMapper.toBrand(brandSaveRequest);
        return brandMapper.toBrandResponse(brandDao.save(brand));
    }
    @Override
    public BrandResponse findByName(String name) {
        Brand brand = brandDao.findByName(name).orElseThrow(() -> new BrandNotFoundException(name));
        return brandMapper.toBrandResponse(brand);
    }
    @Override
    public PageResponse<BrandFilterResponse> findAllWithNumberProducts(Map<String, String[]> brandSearchRequest) {
        Specification<Brand> specification = SpecificationBuilderHelper.buildSpecificationFromParams(brandSearchRequest);
        Pageable pageable = SpecificationBuilderHelper.buildPageableFromParams(brandSearchRequest);
        Page<Brand> brandPage = brandDao.findAll(specification, pageable);
        return new PageResponse<>(
            brandMapper.toBrandsFilterResponse(brandPage.getContent()),
            brandPage.getTotalElements(),
            brandPage.getSize(),
            brandPage.getNumber()
        );
    }

}
