package com.zchadli.ecommerce_back.service.impl;

import com.zchadli.ecommerce_back.exception.category.CategoryAlreadyExistsException;
import com.zchadli.ecommerce_back.exception.category.CategoryNotFoundException;
import com.zchadli.ecommerce_back.mapper.CategoryMapper;
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
import com.zchadli.ecommerce_back.specification.GenericSpecificationBuilder;
import com.zchadli.ecommerce_back.specification.SpecificationBuilderHelper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {
    private final CategoryDao categoryDao;
    private final CategoryMapper categoryMapper;
    private final UploadedFileService uploadedFileService;
    private static final String PATH = "uploads/categories/";
    @Override
    public CategoryResponse save(CategorySaveRequest categorySaveRequest, MultipartFile file) {
        if(categoryDao.existsByTitle(categorySaveRequest.title())) {
            throw new CategoryAlreadyExistsException(categorySaveRequest.title());
        }
        UploadedFile uploadedFile = uploadedFileService.uploadFile(PATH, file);
        Category category = categoryMapper.toCategory(categorySaveRequest);
        category.setFile(uploadedFile);
        return categoryMapper.toCategoryResponse(categoryDao.save(category));
    }
    @Override
    public CategoryResponse findById(Long id) {
        Category category = categoryDao.findById(id).orElseThrow(() -> new CategoryNotFoundException(id));
        return categoryMapper.toCategoryResponse(category);
    }

    @Override
    public CategoryResponse findByTitle(String title) {
        Category category = categoryDao.findByTitle(title).orElseThrow(() -> new CategoryNotFoundException(title));
        return categoryMapper.toCategoryResponse(category);
    }

    @Override
    public CategoryResponse findBySlug(String slug) {
        Category category = categoryDao.findBySlug(slug).orElseThrow(() -> new CategoryNotFoundException(slug));
        return categoryMapper.toCategoryResponse(category);
    }

    @Override
    public PageResponse<CategoryFilterResponse> findAllWithNumberProducts(CategorySearchRequest categorySearchRequest) {
        Page<Category> categoryPage = findPageCategory(categorySearchRequest);
        return new PageResponse<>(
                categoryMapper.toCategoriesFilterResponse(categoryPage.getContent()),
                categoryPage.getTotalElements(),
                categoryPage.getSize(),
                categoryPage.getNumber()
        );
    }
    @Override
    public PageResponse<CategoryResponse> findAll(Map<String, String[]> categorySearchRequest) {
        Specification<Category> specification = SpecificationBuilderHelper.buildSpecificationFromParams(categorySearchRequest);
        Pageable pageable = SpecificationBuilderHelper.buildPageableFromParams(categorySearchRequest);
        Page<Category> categoryPage = categoryDao.findAll(specification, pageable);
        return new PageResponse<>(
            categoryMapper.toCategoriesResponse(categoryPage.getContent()),
            categoryPage.getTotalElements(),
            categoryPage.getSize(),
            categoryPage.getNumber()
        );
    }
    private Page<Category> findPageCategory(CategorySearchRequest categorySearchRequest) {
        String[] sort = categorySearchRequest.getSort();
        Sort.Direction direction = Sort.Direction.fromString(sort[1]);
        Sort sortBy = Sort.by(direction, sort[0]);
        GenericSpecificationBuilder<Category> builder = new GenericSpecificationBuilder<>();
        builder.with("title", "like", categorySearchRequest.getKeyword());
        Specification<Category> specification = builder.build();
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
