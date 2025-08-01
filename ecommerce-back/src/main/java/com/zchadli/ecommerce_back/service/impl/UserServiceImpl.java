package com.zchadli.ecommerce_back.service.impl;

import com.zchadli.ecommerce_back.exception.user.UserNotFoundException;
import com.zchadli.ecommerce_back.mapper.ProductMapper;
import com.zchadli.ecommerce_back.mapper.UserMapper;
import com.zchadli.ecommerce_back.model.Product;
import com.zchadli.ecommerce_back.model.User;
import com.zchadli.ecommerce_back.repository.FavoriteDao;
import com.zchadli.ecommerce_back.repository.ProductDao;
import com.zchadli.ecommerce_back.repository.UserDao;
import com.zchadli.ecommerce_back.request.FavoriteSearchRequest;
import com.zchadli.ecommerce_back.response.ProductResponse;
import com.zchadli.ecommerce_back.response.UserResponse;
import com.zchadli.ecommerce_back.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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
    private final UserMapper userMapper;
    private final ProductMapper productMapper;
    @Override
    public UserResponse getUser(String username) {
        User user = userDao.findByUsername(username).orElseThrow(() -> new UserNotFoundException(username));
        return userMapper.toUserResponse(user);
    }
    @Override
    public List<ProductResponse> findFavoritesProducts(User user, FavoriteSearchRequest favoriteSearchRequest) {
        Set<Long> favoriteProductIds = favoriteDao.findByUser(user).stream().map(favorite -> favorite.getProduct().getId()).collect(Collectors.toSet());
        Sort sort = Sort.by(Sort.Direction.fromString(favoriteSearchRequest.direction()), favoriteSearchRequest.column());
        Pageable pageable = PageRequest.of(0, Integer.MAX_VALUE, sort);
        List<Product> products = productDao.findByIdIn(favoriteProductIds, pageable.getSort());
        return productMapper.toProductsResponse(products, favoriteProductIds);
    }
}
