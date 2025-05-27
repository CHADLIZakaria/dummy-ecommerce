package com.zchadli.ecommerce_back.service.impl;

import com.zchadli.ecommerce_back.model.User;
import com.zchadli.ecommerce_back.repository.UserDao;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {
    private final UserDao userDao;
    @Override
    public User loadUserByUsername(String username) {
        return userDao.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));
    }
}