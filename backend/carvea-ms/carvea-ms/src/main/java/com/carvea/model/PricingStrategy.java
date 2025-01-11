package com.carvea.model;

import java.math.BigDecimal;

public interface PricingStrategy {
    BigDecimal calculatePrice(Car car);
}
