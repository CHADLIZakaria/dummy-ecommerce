package com.zchadli.ecommerce_back.service.impl;

import com.zchadli.ecommerce_back.mapper.ProductMapper;
import com.zchadli.ecommerce_back.model.Product;
import com.zchadli.ecommerce_back.model.User;
import com.zchadli.ecommerce_back.repository.ProductDao;
import com.zchadli.ecommerce_back.repository.UserDao;
import com.zchadli.ecommerce_back.response.ProductResponse;
import com.zchadli.ecommerce_back.service.CompareService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class CompareServiceImpl implements CompareService {

    private final UserDao userRepository;
    private final ProductDao productRepository;
    private final ProductMapper productMapper;

    public void addProductToCompare(String username, String slugProduct) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Product product = productRepository.findBySlug(slugProduct)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        user.getCompareProducts().add(product);
        userRepository.save(user);
    }

    public List<ProductResponse> getCompareProducts(String username) {
        return userRepository.findByUsername(username)
                .map(User::getCompareProducts)
                .map(productMapper::toProductsResponse)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public void removeProductFromCompare(String username, String slugProduct) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Product product = productRepository.findBySlug(slugProduct)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        user.getCompareProducts().remove(product);
        userRepository.save(user);
    }
}