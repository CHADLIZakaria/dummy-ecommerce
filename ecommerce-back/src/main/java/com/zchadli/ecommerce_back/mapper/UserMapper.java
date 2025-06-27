package com.zchadli.ecommerce_back.mapper;

import com.zchadli.ecommerce_back.model.User;
import com.zchadli.ecommerce_back.response.UserResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = { ImagePathMapper.class })
public interface UserMapper {
    @Mapping(source = "user", target = "filePath", qualifiedByName = "mapImagePathWithFolder")
    UserResponse toUserResponse(User user);
}
