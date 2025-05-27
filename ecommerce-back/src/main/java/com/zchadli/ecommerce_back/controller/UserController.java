package com.zchadli.ecommerce_back.controller;

import com.zchadli.ecommerce_back.model.User;
import com.zchadli.ecommerce_back.response.EcommerceResponse;
import com.zchadli.ecommerce_back.response.ProductResponse;
import com.zchadli.ecommerce_back.response.UserResponse;
import com.zchadli.ecommerce_back.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    @PostMapping()
    public EcommerceResponse<UserResponse> getUser(Authentication authentication) {
        String username = authentication.getName();
        return new EcommerceResponse<>(200, "User retrieved successfully", userService.getUser(username));
    }
    @GetMapping("/user/favorites")
    public EcommerceResponse<List<ProductResponse>> find(@AuthenticationPrincipal User user) {
        System.out.println(user);
        return new EcommerceResponse<>(200, "Products retrieved successfully", userService.findFavoritesProducts(user));
    }
}
