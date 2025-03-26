package com.carvea.model;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.Set;

@Entity
@Table(name = "features")
@Getter
@Setter
@NoArgsConstructor
public class Features {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "description", nullable = false)
    private String description;

    @ManyToMany(mappedBy = "features", fetch = FetchType.EAGER)
    @JsonIgnore
    private Set<Car> cars;


    public Features(String name, String description) {
        this.name = name;
        this.description = description;
    }

    @Override
    public String toString() {
        return "Features{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                "}";
    }

//    @JsonIgnore
//    public String getAssociatedCars() {
//        if (cars == null || cars.isEmpty()) {
//            return "No cars associated with this feature.";
//        }
//        StringBuilder result = new StringBuilder("Cars associated with this feature: ");
//        for (Car car : cars) {
//            result.append(car.getModel()).append(", ");
//        }
//        return result.substring(0, result.length() - 2); // Remove the trailing comma and space
//    }

}
