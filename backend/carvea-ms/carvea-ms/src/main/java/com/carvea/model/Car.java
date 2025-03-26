package com.carvea.model;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "cars")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "car_type", discriminatorType = DiscriminatorType.STRING)
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public abstract class Car {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "model_id", nullable = false)
    private Model model;

    @Column(name = "year", nullable = false)
    private int year;

    @Column(name = "horsepower", nullable = false)
    private int horsepower;

    @Column(name = "kilometers", nullable = false)
    private double kilometers;

    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "exterior", nullable = false, length = 50)
    private String exterior;

    @Column(name = "interior", nullable = false, length = 50)
    private String interior;

    @Column(name = "fuel_type", nullable = false, length = 50)
    private String fuelType;

    @Column(name = "transmission", nullable = false, length = 50)
    private String transmission;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "car_feature",
            joinColumns = @JoinColumn(name = "car_id"),
            inverseJoinColumns = @JoinColumn(name = "feature_id")
    )
    private List<Features> features = new ArrayList<>();

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "car_images", joinColumns = @JoinColumn(name = "car_id"))
    @Column(name = "image_path")
    private List<String> imagePaths = new ArrayList<>();

    @Transient
    public String getCarType() {
        return this.getClass().getAnnotation(DiscriminatorValue.class) != null
                ? this.getClass().getAnnotation(DiscriminatorValue.class).value()
                : null;
    }

    @Transient
    private PricingStrategy pricingStrategy;

    public abstract BigDecimal getPrice();

    public void setPricingStrategy(PricingStrategy pricingStrategy) {
        this.pricingStrategy = pricingStrategy;
    }

    public BigDecimal calculatePrice() {
        return pricingStrategy.calculatePrice(this);
    }

    @Override
    public String toString() {
        return "Car{" +
                "id=" + id +
                ", model='" + model.getName() + '\'' +
                ", year=" + year +
                ", horsepower=" + horsepower +
                ", kilometers=" + kilometers +
                ", description='" + description + '\'' +
                ", exterior='" + exterior + '\'' +
                ", interior='" + interior + '\'' +
                ", fuelType='" + fuelType + '\'' +
                ", transmission='" + transmission + '\'' +
                ", category=" + category +
                ", features=" + features +
                ", car type='" + getCarType() + '\'' +
                "}";
    }
}
