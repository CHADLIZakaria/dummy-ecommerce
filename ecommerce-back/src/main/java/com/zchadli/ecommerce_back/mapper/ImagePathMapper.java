package com.zchadli.ecommerce_back.mapper;

import com.zchadli.ecommerce_back.model.ImageStorable;
import com.zchadli.ecommerce_back.model.UploadedFile;
import org.mapstruct.Context;
import org.mapstruct.Named;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ImagePathMapper {
    @Value("${app.image.base-url}")
    private String baseUrl;

    @Named("mapImagePathWithFolder")
    public String mapImagePath(ImageStorable entity) {
        if (entity == null || entity.getImageFileName() == null) return null;
        return baseUrl + entity.getImageFolder() + "/" + entity.getImageFileName();
    }

    @Named("mapImagePathFromString")
    public String mapFromString(String fileName, @Context String folder) {
        if (fileName == null || fileName.isBlank()) return null;
        return baseUrl + folder + "/" + fileName;
    }

    @Named("mapImageListWithPath")
    public List<String> mapImageListWithPath(List<UploadedFile> files) {
        if (files == null) return List.of();
        return files.stream()
                .map(file -> {
                    String folder = "product";
                    return baseUrl + folder + "/" + file.getFileName();
                })
                .toList();
    }

}
