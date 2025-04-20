package com.zchadli.ecommerce_back.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class UploadedFile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String fileName;
    @OneToOne(mappedBy = "file")
    private Category category;
    private String contentType;
    private Long size;
    private LocalDateTime uploadTime;
    @ManyToOne
    @JoinColumn(name="product_id")
    private Product product;
}
