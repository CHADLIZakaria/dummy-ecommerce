package com.zchadli.ecommerce_back.service;

import com.zchadli.ecommerce_back.model.UploadedFile;
import org.springframework.web.multipart.MultipartFile;

public interface UploadedFileService {
    UploadedFile uploadFile(String path, MultipartFile file);
    void deleteFile(String path, UploadedFile uploadedFile);
}
