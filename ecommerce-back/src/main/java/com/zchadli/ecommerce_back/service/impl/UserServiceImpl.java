package com.zchadli.ecommerce_back.service.impl;

import com.zchadli.ecommerce_back.exception.user.UserNotFoundException;
import com.zchadli.ecommerce_back.mapper.EcommerceMapper;
import com.zchadli.ecommerce_back.model.Product;
import com.zchadli.ecommerce_back.model.User;
import com.zchadli.ecommerce_back.repository.FavoriteDao;
import com.zchadli.ecommerce_back.repository.ProductDao;
import com.zchadli.ecommerce_back.repository.UserDao;
import com.zchadli.ecommerce_back.response.ProductResponse;
import com.zchadli.ecommerce_back.response.UserResponse;
import com.zchadli.ecommerce_back.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserDao userDao;
    private final ProductDao productDao;
    private final FavoriteDao favoriteDao;
    private final EcommerceMapper ecommerceMapper;
    @Override
    public UserResponse getUser(String username) {
        User user = userDao.findByUsername(username).orElseThrow(() -> new UserNotFoundException(username));
        return ecommerceMapper.toUserResponse(user);
    }
    @Override
    public List<ProductResponse> findFavoritesProducts(User user) {
        Set<Long> favoriteProductIds = favoriteDao.findByUser(user).stream().map(favorite -> favorite.getProduct().getId()).collect(Collectors.toSet());
        List<Product> products = productDao.findAll().stream().filter(product ->
           favoriteProductIds.contains(product.getId())
        ).toList();
        return ecommerceMapper.toProductsResponse(products, favoriteProductIds);
    }
}
