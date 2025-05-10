package com.zchadli.ecommerce_back.service;

import com.zchadli.ecommerce_back.model.User;
import com.zchadli.ecommerce_back.request.LoginUserRequest;
import com.zchadli.ecommerce_back.request.RegisterUserRequest;
import com.zchadli.ecommerce_back.response.LoginResponse;
import org.springframework.web.multipart.MultipartFile;

public interface AuthenticationService {
    User signup(RegisterUserRequest registerUserRequest, MultipartFile file);
    LoginResponse authenticate(LoginUserRequest loginUserRequest);
}
