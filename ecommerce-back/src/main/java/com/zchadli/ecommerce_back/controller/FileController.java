package com.zchadli.ecommerce_back.controller;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/file")
public class FileController {
    @GetMapping("{table}/{filename}")
    public ResponseEntity<byte[]> getFile(@PathVariable("table") String table, @PathVariable("filename") String filename) throws IOException {
        Path imagePath = null;
        if("category".equals(table)) {
            imagePath = Paths.get("./uploads/categories/"+filename);
        }
        else if("product".equals(table)) {
            imagePath = Paths.get("./uploads/products/"+filename);
        }
        else if("user".equals(table)) {
            imagePath = Paths.get("./uploads/users/"+filename);
        }
        byte[] imageBytes = Files.readAllBytes(imagePath);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.IMAGE_JPEG);
        return new ResponseEntity<>(imageBytes, headers, HttpStatus.OK);
    }
}