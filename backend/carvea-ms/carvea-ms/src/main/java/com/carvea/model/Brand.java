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

}
