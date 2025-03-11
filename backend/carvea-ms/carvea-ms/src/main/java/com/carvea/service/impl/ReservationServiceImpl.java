package com.carvea.service.impl;

import com.carvea.dto.ReservationDto;
import com.carvea.enums.CarCustomError;
import com.carvea.enums.RentalCustomError;
import com.carvea.enums.ReservationCustomError;
import com.carvea.enums.UserCustomError;
import com.carvea.exceptions.CustomException;
import com.carvea.mapper.ReservationMapper;
import com.carvea.model.Car;
import com.carvea.model.Rental;
import com.carvea.model.Reservation;
import com.carvea.model.User;
import com.carvea.repository.CarRepository;
import com.carvea.repository.RentalRepository;
import com.carvea.repository.ReservationRepository;
import com.carvea.repository.UserRepository;
import com.carvea.service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReservationServiceImpl implements ReservationService {
    private ReservationRepository reservationRepository;
    private UserRepository userRepository;
    private RentalRepository rentalRepository;
    private CarRepository carRepository;

    @Autowired
    public ReservationServiceImpl(ReservationRepository reservationRepository,
                                  UserRepository userRepository,
                                  RentalRepository rentalRepository,
                                  CarRepository carRepository) {
        this.reservationRepository = reservationRepository;
        this.userRepository = userRepository;
        this.rentalRepository = rentalRepository;
        this.carRepository = carRepository;
    }

    public ReservationDto createReservation(ReservationDto reservationDto) {
        User user = userRepository.findById(reservationDto.getUserId())
                .orElseThrow(() -> new CustomException(UserCustomError.USER_NOT_FOUND));

        Rental rental = rentalRepository.findById(reservationDto.getRentalId())
                .orElseThrow(() -> new CustomException(RentalCustomError.RENTAL_NOT_FOUND));

        Car car = carRepository.findById(reservationDto.getCarId())
                .orElseThrow(() -> new CustomException(CarCustomError.CAR_NOT_FOUND));

        Reservation createdReservation = new Reservation();
        createdReservation.setUser(user);
        createdReservation.setRental(rental);
        createdReservation.setCar(car);
        createdReservation.setStartDate(reservationDto.getStartDate());
        createdReservation.setEndDate(reservationDto.getEndDate());
        createdReservation.setStatus("RESERVED");
        createdReservation.setPrice(car.getPrice());

        createdReservation = reservationRepository.save(createdReservation);

        return ReservationMapper.toReservationDto(createdReservation);
    }

    public ReservationDto getReservationById(Long id) {
        Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(() -> new CustomException(ReservationCustomError.RESERVATION_NOT_FOUND));
        return ReservationMapper.toReservationDto(reservation);
    }

    public List<Reservation> getAllReservations() {
        List<Reservation> reservations = reservationRepository.findAll();
        return reservations;
    }

    public ReservationDto updateReservation(Long id, ReservationDto reservationDto) {
        Reservation existingReservation = reservationRepository.findById(id)
                .orElseThrow(() -> new CustomException(ReservationCustomError.RESERVATION_NOT_FOUND));

        User user = userRepository.findById(reservationDto.getUserId())
                .orElseThrow(() -> new CustomException(UserCustomError.USER_NOT_FOUND));

        Rental rental = rentalRepository.findById(reservationDto.getRentalId())
                .orElseThrow(() -> new CustomException(RentalCustomError.RENTAL_NOT_FOUND));

        Car car = carRepository.findById(reservationDto.getCarId())
                .orElseThrow(() -> new CustomException(CarCustomError.CAR_NOT_FOUND));

        existingReservation.setUser(user);
        existingReservation.setRental(rental);
        existingReservation.setCar(car);
        existingReservation.setStartDate(reservationDto.getStartDate());
        existingReservation.setEndDate(reservationDto.getEndDate());
        existingReservation.setStatus(reservationDto.getStatus());

        Reservation savedReservation = reservationRepository.save(existingReservation);

        return ReservationMapper.toReservationDto(savedReservation);
    }

    public void deleteReservation(Long id) {
        Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(() -> new CustomException(ReservationCustomError.RESERVATION_NOT_FOUND));
        reservationRepository.delete(reservation);
    }

}
