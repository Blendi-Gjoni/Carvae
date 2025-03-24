package com.carvea.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.List;

@Data
public class CarApiResponseWrapperDto {
    @JsonProperty("Results")
    private List<CarApiResponseDto> results;
}
