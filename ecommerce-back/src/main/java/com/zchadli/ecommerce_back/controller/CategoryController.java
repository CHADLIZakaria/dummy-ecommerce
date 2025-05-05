package com.zchadli.ecommerce_back.controller;

import com.zchadli.ecommerce_back.request.CategorySaveRequest;
import com.zchadli.ecommerce_back.request.CategorySearchRequest;
import com.zchadli.ecommerce_back.response.CategoryFilterResponse;
import com.zchadli.ecommerce_back.response.CategoryResponse;
import com.zchadli.ecommerce_back.response.EcommerceResponse;
import com.zchadli.ecommerce_back.response.PageResponse;
import com.zchadli.ecommerce_back.service.CategoryService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@Tag(name = "Categories", description = "Category management APIs")
@RestController
@RequestMapping("/categories")
@RequiredArgsConstructor
public class CategoryController {
    private final CategoryService categoryService;
    @Operation(
            summary = "Create a new category",
            description = "Upload a new category with an image",
            responses = {
                    @ApiResponse(responseCode = "201", description = "Category created successfully"),
                    @ApiResponse(responseCode = "400", description = "Invalid input", content = @Content)
            }
    )
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<EcommerceResponse<CategoryResponse>> save(
            @Parameter(description = "Category JSON body")
            @RequestPart("category") @Valid @NotNull
            CategorySaveRequest category,
            @Parameter(description = "Image file")
            @RequestPart("file") @NotNull
            MultipartFile file) {
        return ResponseEntity.status(HttpStatus.CREATED).body(new EcommerceResponse<>(201, "Category saved successfully", categoryService.save(category, file)));
    }
    @Operation(summary = "Get category by Id")
    @GetMapping("/{id}")
    public EcommerceResponse<CategoryResponse> findById(
            @Parameter(description = "Category Id")
            @PathVariable("id") Long id) {
        return new EcommerceResponse<>(200, "Category retrieved successfully", categoryService.findById(id));
    }
    @Operation(summary = "Get category by Title")
    @GetMapping("/title/{title}")
    public EcommerceResponse<CategoryResponse> findByTitle(
            @Parameter(description = "Category Name")
            @PathVariable("title") String title) {
        return new EcommerceResponse<>(200, "Category retrieved successfully", categoryService.findByTitle(title));
    }
    @Operation(summary = "Search all categories with optional filters")
    @GetMapping("/search-with-products")
    public EcommerceResponse<PageResponse<CategoryFilterResponse>> searchCategoriesWithProducts(CategorySearchRequest categorySearchRequest) {
        return new EcommerceResponse<>(200, "Categories retrieved successfully", categoryService.findAllWithNumberProducts(categorySearchRequest));
    }


    @Operation(summary = "Search all categories with optional filters")
    @GetMapping()
    public EcommerceResponse<PageResponse<CategoryResponse>> searchCategories(HttpServletRequest request) {
        return new EcommerceResponse<>(200, "Categories retrieved successfully", categoryService.findAll(request.getParameterMap()));
    }
    @Operation(summary = "Delete category by Id")
    @DeleteMapping("/{id}")
    public EcommerceResponse<Void> delete(
            @Parameter(description = "Category Id to delete")
            @PathVariable Long id) {
        categoryService.deleteById(id);
        return new EcommerceResponse<>(200, "Category deleted successfully", null);
    }
}
