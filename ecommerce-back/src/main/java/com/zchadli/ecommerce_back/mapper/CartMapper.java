package com.zchadli.ecommerce_back.mapper;

import com.zchadli.ecommerce_back.model.CartItem;
import com.zchadli.ecommerce_back.request.CartItemRequest;
import com.zchadli.ecommerce_back.response.CartItemResponse;
import org.mapstruct.Context;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring", uses = { ImagePathMapper.class })
public interface CartMapper {
    @Mapping(source = "userId", target = "user.id")
    CartItem toCartItem(CartItemRequest cartItemRequest, Long userId);

    @Mapping(source = "cartItem.productImage", target = "productImage", qualifiedByName = "mapImagePathFromString")
    CartItemResponse toCartItemResponse(CartItem cartItem, @Context String folder);

    @Mapping(source = "cartItem.productImage", target = "productImage", qualifiedByName = "mapImagePathFromString")
    List<CartItemResponse> toCartItemsResponse(List<CartItem> cartItems, @Context String folder);
}
