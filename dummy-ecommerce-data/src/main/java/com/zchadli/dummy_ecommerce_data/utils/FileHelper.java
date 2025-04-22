package com.zchadli.dummy_ecommerce_data.utils;

import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Paths;

public class FileHelper {
    public static void downloadImage(String imageUrl, String destinationPath) {
        try (InputStream in = new URL(imageUrl).openStream()) {
            Files.copy(in, Paths.get(destinationPath));
            System.out.println("Downloaded: " + destinationPath);
        } catch (IOException e) {
            System.err.println("Failed to download image: " + e.getMessage());
        }
    }
    public static String convertToImageName(String name, Integer index) {
        return  name.trim().replaceAll("\\s+", "-").concat(String.valueOf(index)).concat(".png");
    }

}
