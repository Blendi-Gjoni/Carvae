package com.carvea.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RentalDto {
    private Long id;
    private String name;
    private String address;
    private String city;
    private String state;
    private String phoneNumber;
    private String email;
    private String website;
    private String openingHours;
}
