package com.carvea.dto;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
public class CarDto {
    private Long modelId;       // Maps to "modelId" in JSON
    private int year;
    private int horsepower;
    private double kilometers;
    private String description;
    private String exterior;
    private String interior;
    private String fuelType;
    private String transmission;
    private Long categoryId;    // Maps to "categoryId" in JSON
    private List<Long> features; // Maps to "features" in JSON

    private String carType;
    private BigDecimal price;
}
