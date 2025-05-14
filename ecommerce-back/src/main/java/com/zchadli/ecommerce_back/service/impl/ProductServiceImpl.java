package com.zchadli.ecommerce_back.service.impl;

import com.zchadli.ecommerce_back.exception.brand.category.BrandNotFoundException;
import com.zchadli.ecommerce_back.exception.category.CategoryNotFoundException;
import com.zchadli.ecommerce_back.exception.product.ProductAlreadyExistsException;
import com.zchadli.ecommerce_back.exception.product.ProductNotFoundException;
import com.zchadli.ecommerce_back.mapper.EcommerceMapper;
import com.zchadli.ecommerce_back.model.Brand;
import com.zchadli.ecommerce_back.model.Category;
import com.zchadli.ecommerce_back.model.Product;
import com.zchadli.ecommerce_back.model.UploadedFile;
import com.zchadli.ecommerce_back.repository.BrandDao;
import com.zchadli.ecommerce_back.repository.CategoryDao;
import com.zchadli.ecommerce_back.repository.ProductDao;
import com.zchadli.ecommerce_back.request.ProductSaveRequest;
import com.zchadli.ecommerce_back.request.ProductSearchRequest;
import com.zchadli.ecommerce_back.response.PageResponse;
import com.zchadli.ecommerce_back.response.ProductDetailsResponse;
import com.zchadli.ecommerce_back.response.ProductResponse;
import com.zchadli.ecommerce_back.service.ProductService;
import com.zchadli.ecommerce_back.service.UploadedFileService;
import com.zchadli.ecommerce_back.specification.ProductSpecification;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {
    private final ProductDao productDao;
    private final EcommerceMapper ecommerceMapper;
    private final UploadedFileService uploadedFileService;
    private final CategoryDao categoryDao;
    private final BrandDao brandDao;
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
        return ecommerceMapper.toProductResponse(productDao.save(product));
    }
    @Override
    public PageResponse<ProductResponse> findAll(ProductSearchRequest productSearchRequest) {
        String[] sort = productSearchRequest.getSort();
        Sort.Direction direction = Sort.Direction.fromString(sort[1]);
        Sort sortBy = Sort.by(direction, sort[0]);
        Pageable pageable = PageRequest.of(
            productSearchRequest.getPage(),
            productSearchRequest.getSize(),
            sortBy
        );
        Specification<Product> specification = Specification.where(null);
        if(productSearchRequest.getKeyword() != null && !productSearchRequest.getKeyword().isBlank()) {
            specification  = specification.and(ProductSpecification.nameContains(productSearchRequest.getKeyword()));
        }
        if(productSearchRequest.getIdsCategory() != null && !productSearchRequest.getIdsCategory().isEmpty()) {
            specification = specification.and(ProductSpecification.inCategories(productSearchRequest.getIdsCategory()));
        }
        if(productSearchRequest.getMinPrice() != null && productSearchRequest.getMaxPrice() != null) {
            specification = specification.and(ProductSpecification.hasPriceInRange(productSearchRequest.getMinPrice(), productSearchRequest.getMaxPrice()));
        }
        if(productSearchRequest.getIdsBrand() != null && !productSearchRequest.getIdsBrand().isEmpty()) {
            specification = specification.and(ProductSpecification.inBrands(productSearchRequest.getIdsBrand()));
        }
        Page<Product> productPage = productDao.findAll(specification, pageable);
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
}
