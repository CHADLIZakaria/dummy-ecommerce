package com.zchadli.ecommerce_back.response;

import lombok.Builder;

@Builder
public record LoginResponse(String token, Long expiresIn) {
}
