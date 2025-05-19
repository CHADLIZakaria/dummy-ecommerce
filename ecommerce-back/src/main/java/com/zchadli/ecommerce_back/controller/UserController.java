package com.zchadli.ecommerce_back.controller;

import com.zchadli.ecommerce_back.exception.user.UserNotFoundException;
import com.zchadli.ecommerce_back.mapper.EcommerceMapper;
import com.zchadli.ecommerce_back.model.User;
import com.zchadli.ecommerce_back.repository.UserDao;
import com.zchadli.ecommerce_back.response.UserResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {
    private final UserDao userDao;
    private final EcommerceMapper ecommerceMapper;
    @PostMapping()
    public UserResponse getUser(Authentication authentication) {
        String username = authentication.getName();
        User user = userDao.findByUsername(username).orElseThrow(() -> new UserNotFoundException(username));
        return ecommerceMapper.toUserResponse(user);
    }
}
