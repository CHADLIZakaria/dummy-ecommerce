package com.zchadli.ecommerce_back.controller;

import com.zchadli.ecommerce_back.model.User;
import com.zchadli.ecommerce_back.request.LoginUserRequest;
import com.zchadli.ecommerce_back.request.RegisterUserRequest;
import com.zchadli.ecommerce_back.response.EcommerceResponse;
import com.zchadli.ecommerce_back.response.LoginResponse;
import com.zchadli.ecommerce_back.service.AuthentificationService;
import com.zchadli.ecommerce_back.service.impl.JwtServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RequestMapping("/auth")
@RestController
@RequiredArgsConstructor
public class AuthenticationController {
    private final JwtServiceImpl jwtService;
    private final AuthentificationService authentificationService;
    @PostMapping(value = "/register", consumes =  MediaType.MULTIPART_FORM_DATA_VALUE)
    public EcommerceResponse<User> register(
            @RequestPart("file") MultipartFile file,
            @RequestPart("user") RegisterUserRequest registerUserRequest) {
        return new EcommerceResponse<>(200, "User register successfully", authentificationService.signup(registerUserRequest, file));
    }
    @PostMapping("/login")
    public EcommerceResponse<LoginResponse> login(@RequestBody LoginUserRequest loginUserRequest) {
        return new EcommerceResponse<>(200, "User login successfully", authentificationService.authenticate(loginUserRequest));
    }
}
