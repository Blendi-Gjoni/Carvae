package com.carvea.dto;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class DealershipDto {
    private Long id;
    private String name;
    private String address;
    private String city;
    private String state;
    private String phoneNumber;
    private String email;
    private String website;
    private String openingHours;
    private String imagePath;
}
