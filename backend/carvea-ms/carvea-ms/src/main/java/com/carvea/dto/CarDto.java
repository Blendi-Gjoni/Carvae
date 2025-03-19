package com.carvea.dto;

import lombok.*;

import java.math.BigDecimal;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CarDto {
    private Long id;
    private Long modelId;
    private String brandName;
    private String modelName;
    private int year;
    private int horsepower;
    private double kilometers;
    private String description;
    private String exterior;
    private String interior;
    private String fuelType;
    private String transmission;
    private Long categoryId;
    private String categoryName;
    private List<Long> features; // Maps to "features" in JSON
    private List<String> imagePaths;

    private String carType;
    private BigDecimal price;
}
