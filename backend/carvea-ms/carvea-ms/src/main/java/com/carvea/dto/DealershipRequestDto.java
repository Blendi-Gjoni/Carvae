package com.carvea.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class DealershipRequestDto {
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

    @JsonIgnore
    private MultipartFile image;
}
