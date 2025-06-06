package com.zchadli.ecommerce_back.controller;

import com.zchadli.ecommerce_back.model.User;
import com.zchadli.ecommerce_back.request.LoginUserRequest;
import com.zchadli.ecommerce_back.request.RegisterUserRequest;
import com.zchadli.ecommerce_back.response.EcommerceResponse;
import com.zchadli.ecommerce_back.response.LoginResponse;
import com.zchadli.ecommerce_back.service.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RequestMapping("/auth")
@RestController
@RequiredArgsConstructor
public class AuthenticationController {
    private final AuthenticationService authenticationService;
    @PostMapping(value = "/register", consumes =  MediaType.MULTIPART_FORM_DATA_VALUE)
    public EcommerceResponse<User> register(
            @RequestPart(value="file", required = false) MultipartFile file,
            @RequestPart("user") RegisterUserRequest registerUserRequest) {
        return new EcommerceResponse<>(201, "User register successfully", authenticationService.signup(registerUserRequest, file));
    }
    @PostMapping("/login")
    public EcommerceResponse<LoginResponse> login(@RequestBody LoginUserRequest loginUserRequest) {
        return new EcommerceResponse<>(200, "User login successfully", authenticationService.authenticate(loginUserRequest));
    }
}
