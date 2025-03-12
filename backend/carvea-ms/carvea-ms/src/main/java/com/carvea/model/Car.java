package com.carvea.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;

@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "car_type")
@Getter
@Setter
@NoArgsConstructor
public abstract class Car {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "modelId", nullable = false)
    private Model model;

    @Column(name = "year", nullable = false)
    private int year;

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

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "car_feature",
            joinColumns = @JoinColumn(name = "car_id"),
            inverseJoinColumns = @JoinColumn(name = "feature_id")
    )
    private List<Features> features;

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
                ", category={" + category +
                "}, features={" + features +
                "}, car type='" + getCarType() + '\'' +
                "}";
    }
}
