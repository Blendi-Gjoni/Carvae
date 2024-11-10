package com.carvea.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Brand {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "country", nullable = false)
    private String country;

    @Column(name = "city", nullable = false)
    private String city;

    @Column(name = "year", nullable = false)
    private int year;

    @Column(name = "description", nullable = false)
    private String description;

    public Brand(String name, String country, String city, int year, String description) {
        this.name = name;
        this.country = country;
        this.city = city;
        this.year = year;
        this.description = description;
    }
}
