package com.zchadli.ecommerce_back.service;

import com.zchadli.ecommerce_back.model.User;
import com.zchadli.ecommerce_back.response.FavoriteResponse;

public interface FavoriteService {
    FavoriteResponse toggleFavorite(User user, Long idProduct);
}
