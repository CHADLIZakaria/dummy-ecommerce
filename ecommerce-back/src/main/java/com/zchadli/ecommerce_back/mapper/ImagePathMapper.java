package com.zchadli.ecommerce_back.mapper;

import com.zchadli.ecommerce_back.model.ImageStorable;
import org.mapstruct.Context;
import org.mapstruct.Named;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class ImagePathMapper {
    @Value("${app.image.base-url}")
    private String baseUrl;

    @Named("mapImagePathWithFolder")
    public String map(ImageStorable entity) {
        if (entity == null || entity.getImageFileName() == null) return null;
        return baseUrl + entity.getImageFolder() + "/" + entity.getImageFileName();
    }

    @Named("mapImagePathFromString")
    public String mapFromString(String fileName, @Context String folder) {
        if (fileName == null || fileName.isBlank()) return null;
        return baseUrl + folder + "/" + fileName;
    }
}
