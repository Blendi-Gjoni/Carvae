package com.carvea.model;

import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.*;

import java.math.BigDecimal;

@Entity
@DiscriminatorValue("RENTAL")
@Builder
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class RentalCar extends Car {
    @Column(name = "monthly_payment")
    private BigDecimal monthlyPayment;

    @Override
    public BigDecimal getPrice() {
        return monthlyPayment;
    }
}
