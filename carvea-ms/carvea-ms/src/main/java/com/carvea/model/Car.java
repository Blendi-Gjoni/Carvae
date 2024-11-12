package com.carvea.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "car")
@Getter
@Setter
@NoArgsConstructor
public class Car {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "brand_id", nullable = false)
    private Brand brand;

    @Column(name = "model", nullable = false)
    private String model;

    @Column(name = "year", nullable = false)
    private int year;

    @Column(name = "price", nullable = false)
    private double price;

    @Column(name = "rentPrice", nullable = false)
    private double rentPrice;

    @Column(name = "horsepower", nullable = false)
    private int horsepower;

    @Column(name = "kilometers", nullable = false)
    private int kilometers;

    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "exterior", nullable = false)
    private String exterior;

    @Column(name = "interior", nullable = false)
    private String interior;

    @Column(name = "fuelType", nullable = false)
    private String fuelType;

    @Column(name = "transmission", nullable = false)
    private String transmission;

    @Column(name = "engine", nullable = false)
    private String engine;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category", nullable = false)
    private Category category;

    @ManyToMany
    @JoinTable(name = "car_feature",
            joinColumns = @JoinColumn(name = "car_id"),
            inverseJoinColumns = @JoinColumn(name = "feature_id"))
    private List<Feature> features;

    public Car(Brand brand, int year, double price){
        this.brand = brand;
        this.year = year;
        this.price = price;
    }


}
