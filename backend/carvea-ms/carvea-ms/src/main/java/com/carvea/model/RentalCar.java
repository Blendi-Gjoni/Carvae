package com.carvea.model;

import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.Setter;

import java.math.BigDecimal;

@Entity
@DiscriminatorValue("RENTAL")
@Setter
public class RentalCar extends Car {
    @Column(name = "monthly_payment")
    private BigDecimal monthlyPayment;

    @Override
    public BigDecimal getPrice() {
        return monthlyPayment;
    }
}
