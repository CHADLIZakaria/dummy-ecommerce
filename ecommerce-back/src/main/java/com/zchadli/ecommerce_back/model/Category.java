package com.zchadli.ecommerce_back.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Table
@Getter
@Setter
public class Category extends AbstractEntity implements ImageStorable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String slug;
    @OneToOne
    @JoinColumn(name = "file_id")
    private UploadedFile file;
    @OneToMany(mappedBy = "category")
    private List<Product> products;

    @Override
    public String getImageFolder() {
        return "category";
    }

    @Override
    public String getImageFileName() {
        return file != null ? file.getFileName() : null;
    }
}
