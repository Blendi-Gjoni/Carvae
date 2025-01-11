package com.carvea.model;

import java.math.BigDecimal;

public class RentalPricingStrategy implements PricingStrategy {
    @Override
    public BigDecimal calculatePrice(Car car){
        if(car instanceof RentalCar){
            return ((RentalCar)car).getPrice();
        }
        throw new IllegalArgumentException("Invalid car type for RentalPricingStrategy");
    }
}
