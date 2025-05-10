package com.zchadli.ecommerce_back.service.impl;

import com.zchadli.ecommerce_back.exception.base.BadCredentialsException;
import com.zchadli.ecommerce_back.exception.user.UserNotFoundException;
import com.zchadli.ecommerce_back.model.Role;
import com.zchadli.ecommerce_back.model.UploadedFile;
import com.zchadli.ecommerce_back.model.User;
import com.zchadli.ecommerce_back.repository.UserDao;
import com.zchadli.ecommerce_back.request.LoginUserRequest;
import com.zchadli.ecommerce_back.request.RegisterUserRequest;
import com.zchadli.ecommerce_back.response.LoginResponse;
import com.zchadli.ecommerce_back.service.AuthenticationService;
import com.zchadli.ecommerce_back.service.JwtService;
import com.zchadli.ecommerce_back.service.UploadedFileService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class AuthentificationServiceImpl implements AuthenticationService {
    private final UserDao userDao;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager  authenticationManager;
    private final UploadedFileService uploadedFileService;
    private final JwtService jwtService;
    private static final String PATH_USER = "uploads/users/";
    @Override
    public User signup(RegisterUserRequest registerUserRequest, MultipartFile file) {
        UploadedFile uploadedFile = null;
        if(file != null) {
            uploadedFile = uploadedFileService.uploadFile(PATH_USER, file);
        }
        User user = User
                .builder()
                .username(registerUserRequest.username())
                .password(passwordEncoder.encode(registerUserRequest.password()))
                .firstName(registerUserRequest.firstName())
                .lastName(registerUserRequest.lastName())
                .role(Role.USER)
                .file(uploadedFile)
                .build();
        return userDao.save(user);
    }
    @Override
    public LoginResponse authenticate(LoginUserRequest loginUserRequest) {
        try {
            authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                    loginUserRequest.username(),
                    loginUserRequest.password()
                )
            );
        }
        catch(org.springframework.security.authentication.BadCredentialsException |
                org.springframework.security.authentication.InternalAuthenticationServiceException exception) {
            throw new BadCredentialsException("Username or Password is incorrect.");
        }
        User user = userDao.findByUsername(loginUserRequest.username()).orElseThrow(() -> new UserNotFoundException(loginUserRequest.username()));
        String jwt = jwtService.generateToken(user);
        return LoginResponse
                .builder()
                .token(jwt)
                .expiresIn(jwtService.getExpirationTime())
                .build();
    }
}
