package com.zchadli.ecommerce_back.exception;

import com.zchadli.ecommerce_back.exception.base.AlreadyExistsException;
import com.zchadli.ecommerce_back.exception.base.NotFoundException;
import com.zchadli.ecommerce_back.response.ApiResponse;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(NotFoundException.class)
    public ApiResponse<Object> handleNotFound(NotFoundException ex) {
        return new ApiResponse<>(ex.getStatusCode(), ex.getMessage(), null);
    }
    @ExceptionHandler(AlreadyExistsException.class)
    public ApiResponse<Object> handleAlreadyExists(AlreadyExistsException ex) {
        return new ApiResponse<>(ex.getStatusCode(), ex.getMessage(), null);
    }
    @ExceptionHandler(Exception.class)
    public ApiResponse<Object> handleAll(Exception ex) {
        return new ApiResponse<>(500, "Something went wrong", null);
    }
}
