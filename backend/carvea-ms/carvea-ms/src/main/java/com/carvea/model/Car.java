package com.carvea.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Car {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "modelId", nullable = false)
    private Model model;

    @Column(name = "year", nullable = false)
    private int year;

    @Column(name = "price", nullable = false)
    private double price;

    @Column(name = "rentPrice", nullable = false)
    private double rentPrice;

    @Column(name = "horsepower", nullable = false)
    private int horsepower;

    @Column(name = "kilometers", nullable = false)
    private double kilometers;

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


    @ManyToOne
    @JoinColumn(name = "categoryId", nullable = false)
    private Category category;

    @ManyToMany
    @JoinTable(
            name = "car_feature",
            joinColumns = @JoinColumn(name = "car_id"),
            inverseJoinColumns = @JoinColumn(name = "feature_id")
    )
    private List<Features> features;

    public Car(Model model, int year, double price, double rentPrice,
               int horsepower, double kilometers, String description,
               String exterior, String interior, String fuelType, String transmission,
               Category category, List<Features> features) {
        this.model = model;
        this.year = year;
        this.price = price;
        this.rentPrice = rentPrice;
        this.horsepower = horsepower;
        this.kilometers = kilometers;
        this.description = description;
        this.exterior = exterior;
        this.interior = interior;
        this.fuelType = fuelType;
        this.transmission = transmission;
        this.category = category;
        this.features = features;
    }

    public double calculateDepreciation(double depreciationRate) {
        int currentYear = java.time.Year.now().getValue();
        int age = currentYear - year;
        return price - (price * depreciationRate * age);
    }

    public static int compareByPrice(Car car1, Car car2) {
        return Double.compare(car1.getPrice(), car2.getPrice());
    }

    public boolean isAvailableForRent() {
        return kilometers < 100000; // Example condition: cars with mileage under 100,000 are rentable
    }



}
