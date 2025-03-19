package com.carvea.mapper;

import com.carvea.dto.DealershipDto;
import com.carvea.model.Dealership;

public class DealershipMapper {
    public static Dealership toDealershipEntity(DealershipDto dealershipDto) {
        Dealership dealership = new Dealership();
        dealership.setId(dealershipDto.getId());
        dealership.setName(dealershipDto.getName());
        dealership.setAddress(dealershipDto.getAddress());
        dealership.setCity(dealershipDto.getCity());
        dealership.setState(dealershipDto.getState());
        dealership.setPhoneNumber(dealershipDto.getPhoneNumber());
        dealership.setEmail(dealershipDto.getEmail());
        dealership.setWebsite(dealershipDto.getWebsite());
        dealership.setOpeningHours(dealershipDto.getOpeningHours());
        dealership.setImagePath(dealershipDto.getImagePath() != null ? dealershipDto.getImagePath() : null);
        return dealership;
    }

    public static DealershipDto toDealershipDto(Dealership dealership) {
        DealershipDto dealershipDto = new DealershipDto();
        dealershipDto.setId(dealership.getId());
        dealershipDto.setName(dealership.getName());
        dealershipDto.setAddress(dealership.getAddress());
        dealershipDto.setCity(dealership.getCity());
        dealershipDto.setState(dealership.getState());
        dealershipDto.setPhoneNumber(dealership.getPhoneNumber());
        dealershipDto.setEmail(dealership.getEmail());
        dealershipDto.setWebsite(dealership.getWebsite());
        dealershipDto.setOpeningHours(dealership.getOpeningHours());
        if (dealership.getImagePath() != null) {
            String correctedPath = dealership.getImagePath()
                    .replace("\\", "/");
            dealershipDto.setImagePath("http://localhost:8080/uploads/" + correctedPath);
        } else {
            dealershipDto.setImagePath(null);
        }
        return dealershipDto;
    }
}
