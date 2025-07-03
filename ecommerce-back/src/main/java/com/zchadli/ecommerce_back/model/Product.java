package com.zchadli.ecommerce_back.model;

import com.zchadli.ecommerce_back.utils.SlugUtils;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Table
@Getter
@Setter
public class Product implements ImageStorable  {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String slug;
    private String description;
    private double price;
    private String sku;
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
    @OneToMany(mappedBy = "product")
    private List<Review> reviews;
    private int quantity;
    @PrePersist
    @PreUpdate
    public void generateSlug() {
        if(name != null && (slug == null || slug.isEmpty())) {
            this.slug = SlugUtils.toSlug(name);
        }
    }

    @Override
    public String getImageFolder() {
        return "product";
    }

    @Override
    public String getImageFileName() {
        return coverImage.getFileName();
    }
}
