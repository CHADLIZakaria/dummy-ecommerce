package com.zchadli.ecommerce_back.exception.user;

import com.zchadli.ecommerce_back.exception.base.AlreadyExistsException;

public class UserAlreadyExistsException extends AlreadyExistsException {
    public UserAlreadyExistsException(String username) {
        super("User '" + username + "' already exists.");
    }
}
