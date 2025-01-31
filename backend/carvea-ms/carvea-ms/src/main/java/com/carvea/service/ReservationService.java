package com.carvea.service;

import com.carvea.dto.ReservationDto;
import com.carvea.mapper.ReservationMapper;
import com.carvea.model.Car;
import com.carvea.model.Rental;
import com.carvea.model.Reservation;
import com.carvea.model.User;
import com.carvea.repository.CarRepository;
import com.carvea.repository.RentalRepository;
import com.carvea.repository.ReservationRepository;
import com.carvea.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReservationService {
    private ReservationRepository reservationRepository;
    private UserRepository userRepository;
    private RentalRepository rentalRepository;
    private CarRepository carRepository;

    @Autowired
    public ReservationService(ReservationRepository reservationRepository,
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
                .orElseThrow(() -> new RuntimeException("User Not Found"));

        Rental rental = rentalRepository.findById(reservationDto.getRentalId())
                .orElseThrow(() -> new RuntimeException("Rental Not Found"));

        List<Long> carIds = reservationDto.getCarIds();
        if (carIds.size() == 1) {
            carIds = Arrays.asList(carIds.get(0));
        }

        List<Car> cars = carRepository.findAllById(carIds);

        Reservation reservation = ReservationMapper.toReservationEntity(reservationDto, user, rental, cars);
        Reservation savedReservation = reservationRepository.save(reservation);
        return ReservationMapper.toReservationDto(savedReservation);
    }

    public ReservationDto getReservationById(Long id) {
        Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Reservation Not Found"));
        return ReservationMapper.toReservationDto(reservation);
    }

    public List<ReservationDto> getAllReservations() {
        List<Reservation> reservations = reservationRepository.findAll();
        return reservations.stream()
                .map(ReservationMapper::toReservationDto)
                .collect(Collectors.toList());
    }

    public ReservationDto updateReservation(Long id, ReservationDto reservationDto) {
        Reservation existingReservation = reservationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Reservation Not Found"));

        User user = userRepository.findById(reservationDto.getUserId())
                .orElseThrow(() -> new RuntimeException("User Not Found"));

        Rental rental = rentalRepository.findById(reservationDto.getRentalId())
                .orElseThrow(() -> new RuntimeException("Rental Not Found"));

        List<Car> cars = carRepository.findAllById(reservationDto.getCarIds());

        existingReservation.setUser(user);
        existingReservation.setRental(rental);
        existingReservation.setCars(cars);
        existingReservation.setStartDate(reservationDto.getStartDate());
        existingReservation.setEndDate(reservationDto.getEndDate());
        existingReservation.setStatus(reservationDto.getStatus());

        Reservation savedReservation = reservationRepository.save(existingReservation);

        return ReservationMapper.toReservationDto(savedReservation);
    }

    public void deleteReservation(Long id) {
        Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Reservation Not Found"));
        reservationRepository.delete(reservation);
    }

}
