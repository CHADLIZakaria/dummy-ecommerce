package com.zchadli.ecommerce_back.exception.user;

import com.zchadli.ecommerce_back.exception.base.NotFoundException;

public class UserNotFoundException extends NotFoundException {
    public UserNotFoundException(String username) {
        super("User " + username + " not found.");
    }
}
