package com.carvea.dto;

import com.carvea.model.Brand;
import com.carvea.model.Category;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CarDto {

    private int id;
    private Brand brand;
    private String model;
    private int year;
    private double price;
    private double rentPrice;
    private int horsepower;
    private int kilometers;
    private String description;
    private String exterior;
    private String interior;
    private String fuelType;
    private String transmission;
    private String engine;
    private Category category;

}
