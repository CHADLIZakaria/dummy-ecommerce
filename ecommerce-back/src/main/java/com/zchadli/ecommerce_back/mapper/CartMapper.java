package com.zchadli.ecommerce_back.mapper;

import com.zchadli.ecommerce_back.model.CartItem;
import com.zchadli.ecommerce_back.request.CartItemRequest;
import com.zchadli.ecommerce_back.response.CartItemResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CartMapper {
    @Mapping(source = "userId", target = "user.id")
    CartItem toCartItem(CartItemRequest cartItemRequest, Long userId);
    CartItemResponse toCartItemResponse(CartItem cartItem);
    List<CartItemResponse> toCartItemsResponse(List<CartItem> cartItems);
}
