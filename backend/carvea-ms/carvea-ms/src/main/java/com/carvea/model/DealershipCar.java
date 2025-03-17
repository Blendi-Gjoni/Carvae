package com.carvea.model;

import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.*;

import java.math.BigDecimal;

@Entity
@DiscriminatorValue("DEALERSHIP")
@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class DealershipCar  extends Car{
    @Column(name ="full_price")
    private BigDecimal fullPrice;

    @Override
    public BigDecimal getPrice() {
        return fullPrice;
    }
}
