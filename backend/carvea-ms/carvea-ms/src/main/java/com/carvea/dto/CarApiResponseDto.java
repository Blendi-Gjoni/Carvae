package com.carvea.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class CarApiResponseDto {
    @JsonProperty("Make_Name")
    private String makeName;

    @JsonProperty("Model_Name")
    private String modelName;
}
