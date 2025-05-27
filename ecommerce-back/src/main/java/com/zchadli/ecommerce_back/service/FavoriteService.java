package com.zchadli.ecommerce_back.service;

import com.zchadli.ecommerce_back.model.User;

public interface FavoriteService {
    String toggleFavorite(User user, Long idProduct);
}
