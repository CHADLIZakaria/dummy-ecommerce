package com.zchadli.ecommerce_back.mapper;

import com.zchadli.ecommerce_back.model.User;
import com.zchadli.ecommerce_back.response.UserResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserMapper {
    @Mapping(source = "file.fileName", target = "filePath")
    UserResponse toUserResponse(User user);
}
