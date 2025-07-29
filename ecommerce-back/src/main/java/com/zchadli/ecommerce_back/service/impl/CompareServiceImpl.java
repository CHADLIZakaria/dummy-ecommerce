package com.zchadli.ecommerce_back.service.impl;

import com.zchadli.ecommerce_back.mapper.ProductMapper;
import com.zchadli.ecommerce_back.model.Product;
import com.zchadli.ecommerce_back.model.User;
import com.zchadli.ecommerce_back.repository.ProductDao;
import com.zchadli.ecommerce_back.repository.UserDao;
import com.zchadli.ecommerce_back.response.ProductCompareResponse;
import com.zchadli.ecommerce_back.service.CompareService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CompareServiceImpl implements CompareService {
    private final UserDao userRepository;
    private final ProductDao productRepository;
    private final ProductMapper productMapper;

    public ProductCompareResponse addProductToCompare(String username, String slugProduct) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Product product = productRepository.findBySlug(slugProduct)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        user.getCompareProducts().add(product);
        userRepository.save(user);
        return productMapper.toProductCompareResponse(product);
    }

    public List<ProductCompareResponse> getCompareProducts(String username) {
        return userRepository.findByUsername(username)
                .map(User::getCompareProducts)
                .map(productMapper::toProductsCompareResponse)
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