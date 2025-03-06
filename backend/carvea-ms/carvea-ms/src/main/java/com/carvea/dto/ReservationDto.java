package com.carvea.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Data
@Getter
@Setter
public class ReservationDto {
    private Long id;
    private Long userId;
    private Long rentalId;
    private Long carId;
    private LocalDate startDate;
    private LocalDate endDate;
    private String status;
}
