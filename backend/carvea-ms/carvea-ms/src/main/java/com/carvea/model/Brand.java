package com.carvea.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "brands")
@Getter
@Setter
@NoArgsConstructor
public class Brand {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "name")
    private String name;

//    @Column(name = "imgUrl")
//    private String imgUrl;

    public Brand(String name) {
        this.name = name;
    }

    public String displayBrandInfo() {
        return "Brand Name: " + name +
                (id != null ? ", ID: " + id : "");
    }

    public boolean isValid() {
        return name != null && !name.trim().isEmpty();
    }

    @Override
    public String toString() {
        return "Brand{" +
                "id=" + id +
                ", name='" + name + '\'' +
                "}";
    }

}
