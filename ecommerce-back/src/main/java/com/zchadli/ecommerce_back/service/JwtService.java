package com.zchadli.ecommerce_back.service;

import org.springframework.security.core.userdetails.UserDetails;

public interface JwtService {
    Long getExpirationTime();
    String extractUsername(String token);
    String generateToken(UserDetails userDetails);
    boolean isTokenValid(String token, UserDetails userDetails);
}
