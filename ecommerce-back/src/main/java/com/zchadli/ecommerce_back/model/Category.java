package com.zchadli.ecommerce_back.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table
@Getter
@Setter
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    @OneToOne
    @JoinColumn(name = "file_id")
    private UploadedFile file;
}
