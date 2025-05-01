package com.zchadli.ecommerce_back.service.impl;

import com.zchadli.ecommerce_back.exception.category.CategoryAlreadyExistsException;
import com.zchadli.ecommerce_back.exception.category.CategoryNotFoundException;
import com.zchadli.ecommerce_back.mapper.EcommerceMapper;
import com.zchadli.ecommerce_back.model.Category;
import com.zchadli.ecommerce_back.model.UploadedFile;
import com.zchadli.ecommerce_back.repository.CategoryDao;
import com.zchadli.ecommerce_back.request.CategorySaveRequest;
import com.zchadli.ecommerce_back.request.CategorySearchRequest;
import com.zchadli.ecommerce_back.response.CategoryFilterResponse;
import com.zchadli.ecommerce_back.response.CategoryResponse;
import com.zchadli.ecommerce_back.response.PageResponse;
import com.zchadli.ecommerce_back.service.CategoryService;
import com.zchadli.ecommerce_back.service.UploadedFileService;
import com.zchadli.ecommerce_back.specification.CategorySpecification;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {
    private final CategoryDao categoryDao;
    private final EcommerceMapper ecommerceMapper;
    private final UploadedFileService uploadedFileService;
    private static final String PATH = "uploads/categories/";
    @Override
    public CategoryResponse save(CategorySaveRequest categorySaveRequest, MultipartFile file) {
        if(categoryDao.existsByTitle(categorySaveRequest.title())) {
            throw new CategoryAlreadyExistsException(categorySaveRequest.title());
        }
        UploadedFile uploadedFile = uploadedFileService.uploadFile(PATH, file);
        Category category = ecommerceMapper.toCategory(categorySaveRequest);
        category.setFile(uploadedFile);
        return ecommerceMapper.toCategoryResponse(categoryDao.save(category));
    }
    @Override
    public CategoryResponse findById(Long id) {
        Category category = categoryDao.findById(id).orElseThrow(() -> new CategoryNotFoundException(id));
        return ecommerceMapper.toCategoryResponse(category);
    }

    @Override
    public CategoryResponse findByTitle(String title) {
        Category category = categoryDao.findByTitle(title).orElseThrow(() -> new CategoryNotFoundException(title));
        return ecommerceMapper.toCategoryResponse(category);
    }
    @Override
    public PageResponse<CategoryFilterResponse> findAllWithNumberProducts(CategorySearchRequest categorySearchRequest) {
        Page<Category> categoryPage = findPageCategory(categorySearchRequest);
        return new PageResponse<>(
                ecommerceMapper.toCategoriesFilterResponse(categoryPage.getContent()),
                categoryPage.getTotalElements(),
                categoryPage.getSize(),
                categoryPage.getNumber()
        );
    }
    @Override
    public PageResponse<CategoryResponse> findAll(CategorySearchRequest categorySearchRequest) {
        Page<Category> categoryPage = findPageCategory(categorySearchRequest);
        return new PageResponse<>(
            ecommerceMapper.toCategoriesResponse(categoryPage.getContent()),
            categoryPage.getTotalElements(),
            categoryPage.getSize(),
            categoryPage.getNumber()
        );
    }

    private Page<Category> findPageCategory(CategorySearchRequest categorySearchRequest) {
        String[] sort = categorySearchRequest.getSort();
        Sort.Direction direction = Sort.Direction.fromString(sort[1]);
        Sort sortBy = Sort.by(direction, sort[0]);
        Specification<Category> specification = Specification.where(null);
        if(categorySearchRequest.getKeyword() != null && !categorySearchRequest.getKeyword().isBlank()) {
            specification  = specification.and(CategorySpecification.titleContains(categorySearchRequest.getKeyword()));
        }
        Pageable pageable = null;
        if(categorySearchRequest.getSize()==0) {
            pageable = Pageable.unpaged(sortBy);
        }
        else {
            pageable = PageRequest.of(
                    categorySearchRequest.getPage(),
                    categorySearchRequest.getSize(),
                    sortBy
            );
        }
        return categoryDao.findAll(specification, pageable);
    }


    @Override
    public void deleteById(Long id) {
        Category category = categoryDao.findById(id).orElseThrow(() -> new CategoryNotFoundException(id));
        uploadedFileService.deleteFile(PATH, category.getFile());
        categoryDao.deleteById(id);
    }
}
