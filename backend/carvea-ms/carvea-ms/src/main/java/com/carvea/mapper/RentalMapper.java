package com.carvea.mapper;

import com.carvea.dto.RentalDto;
import com.carvea.model.Rental;

public class RentalMapper {
    public static Rental toRentalEntity(RentalDto rentalDto) {
        Rental rental = new Rental();
        rental.setId(rentalDto.getId());
        rental.setName(rentalDto.getName());
        rental.setAddress(rentalDto.getAddress());
        rental.setCity(rentalDto.getCity());
        rental.setState(rentalDto.getState());
        rental.setPhoneNumber(rentalDto.getPhoneNumber());
        rental.setEmail(rentalDto.getEmail());
        rental.setWebsite(rentalDto.getWebsite());
        rental.setOpeningHours(rentalDto.getOpeningHours());
        rental.setImagePath(rentalDto.getImagePath());
        return rental;
    }

    public static RentalDto toRentalDto(Rental rental) {
        RentalDto rentalDto = new RentalDto();
        rentalDto.setId(rental.getId());
        rentalDto.setName(rental.getName());
        rentalDto.setAddress(rental.getAddress());
        rentalDto.setCity(rental.getCity());
        rentalDto.setState(rental.getState());
        rentalDto.setPhoneNumber(rental.getPhoneNumber());
        rentalDto.setEmail(rental.getEmail());
        rentalDto.setWebsite(rental.getWebsite());
        rentalDto.setOpeningHours(rental.getOpeningHours());
        rentalDto.setImagePath(rental.getImagePath());
        return rentalDto;
    }
}
