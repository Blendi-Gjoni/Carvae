package com.carvea.mapper;

import com.carvea.dto.ReservationDto;
import com.carvea.model.Car;
import com.carvea.model.Rental;
import com.carvea.model.Reservation;
import com.carvea.model.User;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class ReservationMapper {

    public static Reservation toReservationEntity(ReservationDto reservatonDto, User user, Rental rental, Car car){
        Reservation reservation = new Reservation();
        reservation.setId(reservatonDto.getId());
        reservation.setUser(user);
        reservation.setRental(rental);
        reservation.setCar(car);
        reservation.setStartDate(reservatonDto.getStartDate());
        reservation.setEndDate(reservatonDto.getEndDate());
        reservation.setStatus(reservatonDto.getStatus());
        return reservation;
    }

    public static ReservationDto toReservationDto(Reservation reservation){
        ReservationDto reservationDto = new ReservationDto();
        reservationDto.setId(reservation.getId());
        reservationDto.setUserId(reservation.getUser().getId());
        reservationDto.setRentalId(reservation.getRental().getId());
        reservationDto.setCarId(reservation.getCar().getId());
        reservationDto.setStartDate(reservation.getStartDate());
        reservationDto.setEndDate(reservation.getEndDate());
        reservationDto.setStatus(reservation.getStatus());
        return reservationDto;
    }
}
