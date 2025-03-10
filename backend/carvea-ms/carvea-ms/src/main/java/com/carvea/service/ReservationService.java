package com.carvea.service;

import com.carvea.dto.ReservationDto;
import com.carvea.model.Reservation;

import java.util.List;

public interface ReservationService {
    public ReservationDto createReservation(ReservationDto reservationDto);
    public ReservationDto getReservationById(Long id);
    public List<Reservation> getAllReservations();
    public ReservationDto updateReservation(Long id, ReservationDto reservationDto);
    public void deleteReservation(Long id);
}
