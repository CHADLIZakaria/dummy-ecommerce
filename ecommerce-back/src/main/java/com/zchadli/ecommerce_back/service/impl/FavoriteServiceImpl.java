package com.zchadli.ecommerce_back.service.impl;

import com.zchadli.ecommerce_back.exception.product.ProductNotFoundException;
import com.zchadli.ecommerce_back.model.Favorite;
import com.zchadli.ecommerce_back.model.Product;
import com.zchadli.ecommerce_back.model.User;
import com.zchadli.ecommerce_back.repository.FavoriteDao;
import com.zchadli.ecommerce_back.repository.ProductDao;
import com.zchadli.ecommerce_back.repository.UserDao;
import com.zchadli.ecommerce_back.service.FavoriteService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class FavoriteServiceImpl implements FavoriteService {
    private final FavoriteDao favoriteDao;
    private final ProductDao productDao;
    private final UserDao userDao;

    @Override
    public boolean toggleFavorite(User user, Long idProduct) {
        Product product = productDao.findById(idProduct).orElseThrow(() -> new ProductNotFoundException(idProduct));
        Optional<Favorite> favoriteOptional = favoriteDao.findByUserAndProduct(user, product);
        if(favoriteOptional.isPresent()) {
            favoriteDao.delete(favoriteOptional.get());
        }
        else {
            Favorite favorite = new Favorite();
            favorite.setUser(user);
            favorite.setProduct(product);
            favoriteDao.save(favorite);
        }
        return true;
    }
}
