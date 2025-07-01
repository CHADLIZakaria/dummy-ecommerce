package com.zchadli.ecommerce_back.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table
@Getter
@Setter
public class Review extends AbstractEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String comment;
    private Integer rating;
    @ManyToOne
    @JoinColumn(name = "id_product")
    private Product product;
    @ManyToOne
    @JoinColumn(name = "id_user")
    private User user;
}
