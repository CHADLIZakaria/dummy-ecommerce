package com.zchadli.ecommerce_back.service;

import com.zchadli.ecommerce_back.model.User;
import com.zchadli.ecommerce_back.response.ProductResponse;
import com.zchadli.ecommerce_back.response.UserResponse;

import java.util.List;

public interface UserService {
    UserResponse getUser(String username);
    List<ProductResponse> findFavoritesProducts(User user);
}
