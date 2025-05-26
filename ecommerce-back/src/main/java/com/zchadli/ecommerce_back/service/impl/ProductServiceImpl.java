package com.zchadli.ecommerce_back.service.impl;

import com.zchadli.ecommerce_back.exception.brand.category.BrandNotFoundException;
import com.zchadli.ecommerce_back.exception.category.CategoryNotFoundException;
import com.zchadli.ecommerce_back.exception.product.ProductAlreadyExistsException;
import com.zchadli.ecommerce_back.exception.product.ProductNotFoundException;
import com.zchadli.ecommerce_back.mapper.EcommerceMapper;
import com.zchadli.ecommerce_back.model.*;
import com.zchadli.ecommerce_back.repository.BrandDao;
import com.zchadli.ecommerce_back.repository.CategoryDao;
import com.zchadli.ecommerce_back.repository.FavoriteDao;
import com.zchadli.ecommerce_back.repository.ProductDao;
import com.zchadli.ecommerce_back.request.ProductSaveRequest;
import com.zchadli.ecommerce_back.response.PageResponse;
import com.zchadli.ecommerce_back.response.ProductDetailsResponse;
import com.zchadli.ecommerce_back.response.ProductResponse;
import com.zchadli.ecommerce_back.response.RangePriceResponse;
import com.zchadli.ecommerce_back.service.ProductService;
import com.zchadli.ecommerce_back.service.UploadedFileService;
import com.zchadli.ecommerce_back.specification.SpecificationBuilderHelper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {
    private final ProductDao productDao;
    private final EcommerceMapper ecommerceMapper;
    private final UploadedFileService uploadedFileService;
    private final CategoryDao categoryDao;
    private final BrandDao brandDao;
    private final FavoriteDao favoriteDao;
    private static final String PATH = "uploads/products/";
    @Override
    public ProductResponse save(ProductSaveRequest productSaveRequest, MultipartFile[] files, MultipartFile coverImage) {
        if(productDao.existsByName(productSaveRequest.name())) {
            throw new ProductAlreadyExistsException(productSaveRequest.name());
        }
        Category category = categoryDao.findById(productSaveRequest.idCategory()).orElseThrow(() -> new CategoryNotFoundException(productSaveRequest.idCategory()));
        Brand brand = brandDao.findById(productSaveRequest.idBrand()).orElseThrow(() -> new BrandNotFoundException(productSaveRequest.idBrand()));
        Product product = ecommerceMapper.toProduct(productSaveRequest);
        product.setCategory(category);
        product.setBrand(brand);
        product = productDao.save(product);
        //Upload Images
        List<UploadedFile> uploadedFiles = new ArrayList<>();
        for(MultipartFile currentFile: files) {
            UploadedFile uploadedFile = uploadedFileService.uploadFile(PATH, currentFile);
            uploadedFile.setProduct(product);
            uploadedFiles.add(uploadedFile);
        }
        product.setImages(uploadedFiles);
        //Upload Cover Image
        UploadedFile uploadedFile = uploadedFileService.uploadFile(PATH, coverImage);
        product.setCoverImage(uploadedFile);
        uploadedFile.setProduct(product);
        return ecommerceMapper.toProductResponse(productDao.save(product), Collections.emptySet());
    }
    @Override
    public PageResponse<ProductResponse> findAll(User user, Map<String, String[]> productSearchRequest) {
        Specification<Product> specification = SpecificationBuilderHelper.buildSpecificationFromParams(productSearchRequest);
        Pageable pageable = SpecificationBuilderHelper.buildPageableFromParams(productSearchRequest);
        Page<Product> productPage = productDao.findAll(specification, pageable);
        Set<Long> favoriteProductIds = favoriteDao.findByUser(user).stream().map(favorite -> favorite.getProduct().getId()).collect(Collectors.toSet());
        return new PageResponse<>(
            ecommerceMapper.toProductsResponse(productPage.getContent()),
            productPage.getTotalElements(),
            productPage.getSize(),
            productPage.getNumber()
        );
    }
    @Override
    public ProductDetailsResponse findBySlug(String slug) {
        Product product = productDao.findBySlug(slug).orElseThrow(() -> new ProductNotFoundException(slug));
        return ecommerceMapper.toProductDetailsResponse(product);
    }
    @Override
    public RangePriceResponse findRangePrice(Map<String, String[]> productSearchRequest) {
        Specification<Product> specification = SpecificationBuilderHelper.buildSpecificationFromParams(productSearchRequest);
        Pageable pageable = SpecificationBuilderHelper.buildPageableFromParams(productSearchRequest);
        List<Product> products = productDao.findAll(specification, pageable).get().toList();
        Double maxPrice = products.stream().map(Product::getPrice).max(Double::compare).orElse(0d);
        Double minPrice = products.stream().map(Product::getPrice).min(Double::compare).orElse(0d);
        return new RangePriceResponse(minPrice, maxPrice);
    }
}
