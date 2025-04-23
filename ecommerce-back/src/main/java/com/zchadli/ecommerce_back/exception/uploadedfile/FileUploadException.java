package com.zchadli.ecommerce_back.exception.uploadedfile;

import com.zchadli.ecommerce_back.exception.base.BadRequestException;

public class FileUploadException extends BadRequestException {
    public FileUploadException(String message) {
        super(message);
    }
}
