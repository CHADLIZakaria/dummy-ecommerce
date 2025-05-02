package com.zchadli.ecommerce_back.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Table
@Getter
@Setter
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String description;
    private double price;
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
    private List<UploadedFile> images;
    @ManyToOne
    @JoinColumn(name = "id_category")
    private Category category;
    @OneToOne
    @JoinColumn(name = "id_cover_image")
    private UploadedFile coverImage;
    @ManyToOne
    @JoinColumn(name = "id_brand")
    private Brand brand;
}
