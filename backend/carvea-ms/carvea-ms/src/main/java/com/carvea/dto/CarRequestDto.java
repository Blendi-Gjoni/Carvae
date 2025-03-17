package com.carvea.dto;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CarRequestDto {
    private Long modelId;
    private int year;
    private int horsepower;
    private double kilometers;
    private String description;
    private String exterior;
    private String interior;
    private String fuelType;
    private String transmission;
    private Long categoryId;
    private List<Long> features;
    private String carType;
    private BigDecimal price;

    private List<MultipartFile> images;
}
