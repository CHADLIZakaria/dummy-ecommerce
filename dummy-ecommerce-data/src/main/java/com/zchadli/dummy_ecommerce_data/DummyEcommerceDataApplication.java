package com.zchadli.dummy_ecommerce_data;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class DummyEcommerceDataApplication {

	public static void main(String[] args) {
		SpringApplication.run(DummyEcommerceDataApplication.class, args);
	}

}
