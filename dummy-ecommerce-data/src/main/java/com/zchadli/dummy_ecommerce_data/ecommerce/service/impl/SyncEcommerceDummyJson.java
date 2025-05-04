package com.zchadli.dummy_ecommerce_data.ecommerce.service.impl;

import com.zchadli.dummy_ecommerce_data.dummyJson.DummyJsonClient;
import com.zchadli.dummy_ecommerce_data.dummyJson.DummyJsonMapper;
import com.zchadli.dummy_ecommerce_data.ecommerce.EcommerceClient;
import com.zchadli.dummy_ecommerce_data.ecommerce.FileSystemMultipartFile;
import com.zchadli.dummy_ecommerce_data.ecommerce.model.*;
import com.zchadli.dummy_ecommerce_data.ecommerce.service.SyncEcommerce;
import com.zchadli.dummy_ecommerce_data.utils.FileHelper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

@Service
@RequiredArgsConstructor
public class SyncEcommerceDummyJson implements SyncEcommerce {
    private final DummyJsonClient dummyJsonClient;
    private final EcommerceClient ecommerceClient;
    private final DummyJsonMapper dummyJsonMapper;
    private static final String PATH_PRODUCT = "uploads/products/";
    @Override
    public void saveProducts() {
        dummyJsonClient.getProducts().getProducts().forEach(product -> {
            AtomicInteger index = new AtomicInteger(1);
            List<String> imagesPath = new ArrayList<>();
            //Uploads Images
            product.images().forEach(image -> {
                String destination = FileHelper.convertToImageName(product.title(), index.getAndIncrement());
                imagesPath.add(destination);
                FileHelper.downloadImage(image, PATH_PRODUCT + destination);
            });
            //Upload cover Image
            String coverImageDestination = FileHelper.convertToImageName(product.title(), 0);
            FileHelper.downloadImage(product.thumbnail(), PATH_PRODUCT + coverImageDestination);
            //Get category
            Category category = ecommerceClient.getCategoryByTitle(product.category()).data();
            //Save Brand
            EcommerceResponse<BrandResponse> brandResponse = ecommerceClient.saveBrand(new BrandRequest(product.brand()));
            if(brandResponse.status()==409) {
                brandResponse = ecommerceClient.getBrandByName(product.brand());
            }
            if(brandResponse.status()==400) {
                brandResponse = ecommerceClient.saveBrand(new BrandRequest(product.title()));
            }
            Product productToSave = dummyJsonMapper.toProduct(product, category.getId(), brandResponse.data().id());
            ProductResponse newProduct =  saveProduct(productToSave, imagesPath, coverImageDestination);
            product.reviews().forEach(
                review -> {
                    ecommerceClient.saveReview(dummyJsonMapper.toReview(review, newProduct.id()));
                }
            );
        });
    }
    private ProductResponse saveProduct(Product product, List<String> path, String coverImage) {
        List<MultipartFile> fileList = new ArrayList<>();
        for(String image: path) {
            File file = new File(PATH_PRODUCT+image);
            if (!file.exists()) {
                throw new RuntimeException("File does not exist: " + file.getAbsolutePath());
            }
            MultipartFile multipartFile = new FileSystemMultipartFile(file);
            fileList.add(multipartFile);
        }
        MultipartFile[] multipartFiles = fileList.toArray(new MultipartFile[0]);
        MultipartFile coverImageFile = new FileSystemMultipartFile(new File(PATH_PRODUCT+coverImage));
        return ecommerceClient.saveProduct(multipartFiles, coverImageFile, product).data();
    }
    @Override
    public void saveCategories() {
        List<Category> categoryResponses = getCategories();
        categoryResponses.forEach(this::saveCategory);
    }

    private void saveCategory(Category categoryResponse) {
        File file = new File("uploads/categories/" + categoryResponse.getTitle() + ".jpg");
        if (!file.exists()) {
            throw new RuntimeException("File does not exist: " + file.getAbsolutePath());
        }
        MultipartFile multipartFile = new FileSystemMultipartFile(file);
        ecommerceClient.saveCategory(multipartFile, categoryResponse);
    }

    private List<Category> getCategories() {
        return dummyJsonMapper.toCategoryList(dummyJsonClient.getCategories());
    }
}
