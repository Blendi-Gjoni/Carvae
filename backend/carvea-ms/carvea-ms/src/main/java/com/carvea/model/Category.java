package com.carvea.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "description", nullable = false)
    private String description;


    public Category(String name, String description) {
        this.name = name;
        this.description = description;
    }

    public String getSummary() {
        return name + ": " + description;
    }

    @Override
    public String toString() {
        return "Caregory {" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                "}";
    }
}
