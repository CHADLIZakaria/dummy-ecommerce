package com.zchadli.ecommerce_back.exception;

import com.zchadli.ecommerce_back.exception.base.AlreadyExistsException;
import com.zchadli.ecommerce_back.exception.base.NotFoundException;
import com.zchadli.ecommerce_back.exception.uploadedfile.FileUploadException;
import com.zchadli.ecommerce_back.response.EcommerceResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.HttpMediaTypeNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(NotFoundException.class)
    public EcommerceResponse<Object> handleNotFound(NotFoundException ex) {
        return new EcommerceResponse<>(ex.getStatusCode(), ex.getMessage(), null);
    }
    @ExceptionHandler(AlreadyExistsException.class)
    public EcommerceResponse<Object> handleAlreadyExists(AlreadyExistsException ex) {
        return new EcommerceResponse<>(ex.getStatusCode(), ex.getMessage(), null);
    }
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public EcommerceResponse<Object> handleValidation(MethodArgumentNotValidException ex) {
        String message = ex.getBindingResult().getFieldErrors().stream()
                .map(err -> err.getField() + ": " + err.getDefaultMessage())
                .findFirst()
                .orElse("Validation error");
        return new EcommerceResponse<>(400, message, null);
    }
    @ExceptionHandler(FileUploadException.class)
    public EcommerceResponse<Object> handleFailedFileUpload(FileUploadException ex) {
        return new EcommerceResponse<>(ex.getStatusCode(), ex.getMessage(), null);
    }
    @ExceptionHandler(Exception.class)
    public EcommerceResponse<Object> handleAll(Exception ex) {
        return new EcommerceResponse<>(500, "Something went wrong", null);
    }

    @ExceptionHandler(HttpMediaTypeNotSupportedException.class)
    public ResponseEntity<String> handleUnsupportedMediaType(HttpMediaTypeNotSupportedException e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Unsupported Media Type: " + e.getMessage());
    }
}
