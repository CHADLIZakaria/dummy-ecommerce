package com.zchadli.ecommerce_back.exception.uploadedfile;

import com.zchadli.ecommerce_back.exception.base.BadRequestException;

public class FileDeleteException extends BadRequestException {
    public FileDeleteException(String message) {
        super(message);
    }
}
