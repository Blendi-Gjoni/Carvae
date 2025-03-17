package com.carvea.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "dealerships")
public class Dealership {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String address;
    private String city;
    private String state;
    private String phoneNumber;
    private String email;
    private String website;
    private String openingHours;

    private String imagePath;

    @Override
    public String toString() {
        return "Dealership{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", address='" + address + '\'' +
                ", city='" + city + '\'' +
                ", state='" + state + '\'' +
                ", phoneNumber=" + phoneNumber +
                ", email='" + email + '\'' +
                ", website='" + website + '\'' +
                ", openingHours=" + openingHours +
                "}";
    }
}
