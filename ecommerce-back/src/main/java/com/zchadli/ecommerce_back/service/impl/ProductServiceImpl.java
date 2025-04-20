package com.zchadli.ecommerce_back.service.impl;

import com.zchadli.ecommerce_back.exception.category.CategoryAlreadyExistsException;
import com.zchadli.ecommerce_back.exception.category.CategoryNotFoundException;
import com.zchadli.ecommerce_back.mapper.EcommerceMapper;
import com.zchadli.ecommerce_back.model.Category;
import com.zchadli.ecommerce_back.model.Product;
import com.zchadli.ecommerce_back.model.UploadedFile;
import com.zchadli.ecommerce_back.repository.CategoryDao;
import com.zchadli.ecommerce_back.repository.ProductDao;
import com.zchadli.ecommerce_back.request.ProductSaveRequest;
import com.zchadli.ecommerce_back.request.ProductSearchRequest;
import com.zchadli.ecommerce_back.response.PageResponse;
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
    private static final String PATH = "uploads/products/";
    @Override
    public ProductResponse save(ProductSaveRequest productSaveRequest, MultipartFile[] files) {
        if(productDao.existsByName(productSaveRequest.name())) {
            throw new CategoryAlreadyExistsException(productSaveRequest.name());
        }
        Category category = categoryDao.findById(productSaveRequest.idCategory()).orElseThrow(() -> new CategoryNotFoundException(productSaveRequest.idCategory()));
        Product product = ecommerceMapper.toProduct(productSaveRequest);
        product.setCategory(category);
        List<UploadedFile> uploadedFiles = new ArrayList<>();
        for(MultipartFile currentFile: files) {
            UploadedFile uploadedFile = uploadedFileService.uploadFile(PATH, currentFile);
            uploadedFile.setProduct(product);
            uploadedFiles.add(uploadedFile);
        }
        product.setImages(uploadedFiles);
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
        if(productSearchRequest.getSearch() != null && !productSearchRequest.getSearch().isBlank()) {
            specification  = specification.and(ProductSpecification.nameContains(productSearchRequest.getSearch()));
        }
        Page<Product> productPage = productDao.findAll(specification, pageable);
        return new PageResponse<>(
                ecommerceMapper.toProductsResponse(productPage.getContent()),
                productPage.getTotalElements(),
                productPage.getSize(),
                productPage.getNumber()
        );
    }
}
