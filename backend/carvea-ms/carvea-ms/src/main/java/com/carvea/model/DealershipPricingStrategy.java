package com.carvea.model;

import java.math.BigDecimal;

public class DealershipPricingStrategy implements PricingStrategy {
    @Override
    public BigDecimal calculatePrice(Car car){
        if(car instanceof DealershipCar){
            return ((DealershipCar)car).getPrice();
        }
        throw new IllegalArgumentException("Invalid car type for DealershipPricingStrategy");
    }
}
