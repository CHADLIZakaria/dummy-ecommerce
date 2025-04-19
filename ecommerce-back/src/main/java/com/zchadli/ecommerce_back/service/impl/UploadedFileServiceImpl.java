package com.zchadli.ecommerce_back.service.impl;

import com.zchadli.ecommerce_back.exception.uploadedfile.FileDeleteException;
import com.zchadli.ecommerce_back.exception.uploadedfile.FileUploadException;
import com.zchadli.ecommerce_back.model.UploadedFile;
import com.zchadli.ecommerce_back.repository.UploadedFileDao;
import com.zchadli.ecommerce_back.service.UploadedFileService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Service
@RequiredArgsConstructor
public class UploadedFileServiceImpl implements UploadedFileService {
    private final UploadedFileDao uploadedFileDao;
    @Override
    public UploadedFile uploadFile(String path, MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new FileUploadException("Uploaded file is empty or missing.");
        }
        String uploadDir = new File(path).getAbsolutePath();
        File dir = new File(uploadDir);
        if (!dir.exists() && !dir.mkdirs()) {
            throw new FileUploadException("Failed to create upload directory: " + uploadDir);
        }
        String originalFileName = Paths.get(file.getOriginalFilename()).getFileName().toString();
        originalFileName = generateTimestampedFileName(originalFileName);
        Path destinationPath = Paths.get(uploadDir, originalFileName);
        try {
            file.transferTo(destinationPath);
        }
        catch (IOException e) {
            throw new FileUploadException("File upload failed: " + e.getMessage());
        }
        UploadedFile uploadedFile = new UploadedFile();
        uploadedFile.setFileName(originalFileName);
        uploadedFile.setContentType(file.getContentType());
        uploadedFile.setSize(file.getSize());
        uploadedFile.setUploadTime(LocalDateTime.now());
        uploadedFile = uploadedFileDao.save(uploadedFile);
        return  uploadedFile;
    }
    @Override
    public void deleteFile(String path, UploadedFile uploadedFile) {
        Path filePath = Paths.get(path, uploadedFile.getFileName());
        try {
            Files.deleteIfExists(filePath);
        }
        catch (IOException e) {
            throw new FileDeleteException("Could not delete file: " + filePath.toAbsolutePath());
        }
        uploadedFileDao.delete(uploadedFile);
    }
    private String generateTimestampedFileName(String originalFileName) {
        String cleanedFileName = Paths.get(originalFileName).getFileName().toString();
        String baseName = cleanedFileName.contains(".")
                ? cleanedFileName.substring(0, cleanedFileName.lastIndexOf('.'))
                : cleanedFileName;
        String extension = cleanedFileName.contains(".")
                ? cleanedFileName.substring(cleanedFileName.lastIndexOf('.'))
                : "";
        String timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMdd'T'HHmmss"));
        return baseName.replaceAll("\\s+", "_") + "_" + timestamp + extension;
    }
}
