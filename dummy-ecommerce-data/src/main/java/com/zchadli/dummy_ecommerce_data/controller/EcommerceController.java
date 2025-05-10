package com.zchadli.dummy_ecommerce_data.controller;

import com.zchadli.dummy_ecommerce_data.ecommerce.service.SyncEcommerce;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class EcommerceController {
    private final SyncEcommerce syncEcommerce;

    @GetMapping(value = "/load")
    public void save() {
        syncEcommerce.saveUsers();
        syncEcommerce.saveCategories();
        syncEcommerce.saveProducts();
    }
}
