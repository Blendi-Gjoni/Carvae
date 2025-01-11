package com.carvea.model;

import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.Setter;

import java.math.BigDecimal;

@Entity
@DiscriminatorValue("DEALERSHIP")
@Setter
public class DealershipCar  extends Car{
    @Column(name ="full_price")
    private BigDecimal fullPrice;

    @Override
    public BigDecimal getPrice() {
        return fullPrice;
    }
}
