package com.carvea.service;

import com.carvea.dto.ReservationDto;
import com.carvea.model.Reservation;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import java.util.List;

public interface ReservationService {
    public ReservationDto createReservation(ReservationDto reservationDto);
    public ReservationDto getReservationById(Long id);
    public List<Reservation> getAllReservations();
    public Page<Reservation> getAllReservationsWithPagination(PageRequest pageRequest);
    public ReservationDto updateReservation(Long id, ReservationDto reservationDto);
    public void deleteReservation(Long id);
}
