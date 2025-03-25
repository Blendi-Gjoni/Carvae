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
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Slf4j
@Service
public class ReservationServiceImpl implements ReservationService {
    private final ReservationRepository reservationRepository;
    private final UserRepository userRepository;
    private final RentalRepository rentalRepository;
    private final CarRepository carRepository;
    private final EmailNotifier emailNotifier;

    @Autowired
    public ReservationServiceImpl(ReservationRepository reservationRepository,
                                  UserRepository userRepository,
                                  RentalRepository rentalRepository,
                                  CarRepository carRepository,
                                  EmailNotifier emailNotifier) {
        this.reservationRepository = reservationRepository;
        this.userRepository = userRepository;
        this.rentalRepository = rentalRepository;
        this.carRepository = carRepository;
        this.emailNotifier = emailNotifier;
    }

    public ReservationDto createReservation(ReservationDto reservationDto) {
        User user = userRepository.findById(reservationDto.getUserId())
                .orElseThrow(() -> {
                    log.error("User with ID {} not found. Cannot create.", reservationDto.getUserId());
                    return new CustomException(UserCustomError.USER_NOT_FOUND);
                });

        Rental rental = rentalRepository.findById(reservationDto.getRentalId())
                .orElseThrow(() -> {
                    log.error("Rental with ID {} not found. Cannot create.", reservationDto.getRentalId());
                    return new CustomException(RentalCustomError.RENTAL_NOT_FOUND);
                });

        Car car = carRepository.findById(reservationDto.getCarId())
                .orElseThrow(() -> {
                    log.error("Car with ID {} not found. Cannot create.", reservationDto.getCarId());
                    return new CustomException(CarCustomError.CAR_NOT_FOUND);
                });

        Reservation createdReservation = new Reservation();
        createdReservation.setUser(user);
        createdReservation.setRental(rental);
        createdReservation.setCar(car);
        createdReservation.setStartDate(reservationDto.getStartDate());
        createdReservation.setEndDate(reservationDto.getEndDate());
        createdReservation.setStatus("RESERVED");
        long days = ChronoUnit.DAYS.between(reservationDto.getStartDate(), reservationDto.getEndDate());

        if (days <= 0) {
            days = 1;
        }

        BigDecimal carPrice = car.getPrice();

        if (carPrice == null) {
            throw new IllegalStateException("Car price is not set for car ID: " + car.getId());
        }

        BigDecimal totalPrice = BigDecimal.valueOf(days).multiply(carPrice);
        createdReservation.setPrice(totalPrice);

        createdReservation.attach(emailNotifier);
        log.info("Sending reservation confirmation email to: {}.", user.getEmail());
        createdReservation.notifyObservers(
                user.getEmail(),
                "Your Car Reservation Confirmation",
                "<html>"
                        + "<body style=\"font-family: Arial, sans-serif;\">"
                        + "<div style=\"background-color: #f5f5f5; padding: 20px;\">"
                        + "<h2 style=\"color: #333;\">Your Car Reservation is Confirmed!</h2>"
                        + "<p style=\"font-size: 16px;\">Hello " + user.getUsernameF() + ",</p>"
                        + "<p style=\"font-size: 16px;\">Your reservation has been successfully created.</p>"
                        + "<p><strong>Rental:</strong> " + rental.getName() + "</p>"
                        + "<p><strong>Car:</strong> " + car.getModel().getBrand().getName() + " " + car.getModel().getName() + "</p>"
                        + "<p><strong>Start Date:</strong> " + reservationDto.getStartDate() + "</p>"
                        + "<p><strong>End Date:</strong> " + reservationDto.getEndDate() + "</p>"
                        + "<p><strong>Price:</strong> $" + totalPrice + "</p>"
                        + "<div style=\"background-color: #007bff; color: #fff; padding: 10px; text-align: center; border-radius: 5px;\">"
                        + "<p>Thank you for choosing Carvea!</p>"
                        + "</div>"
                        + "</div>"
                        + "</body>"
                        + "</html>"
        );
        log.info("Successfully sent reservation confirmation email to: {}.", user.getEmail());

        log.info("Adding order: {}.", createdReservation);
        createdReservation = reservationRepository.save(createdReservation);
        log.info("Successfully added reservation: {}.", createdReservation);

        return ReservationMapper.toReservationDto(createdReservation);
    }

    public ReservationDto getReservationById(Long id) {
        Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(() -> {
                    log.error("Reservation with ID {} not found. Cannot get reservation.", id);
                    return new CustomException(ReservationCustomError.RESERVATION_NOT_FOUND);
                });
        log.info("Fetched reservatin with ID {}.", id);
        return ReservationMapper.toReservationDto(reservation);
    }

    public List<Reservation> getAllReservations() {
        List<Reservation> reservations = reservationRepository.findAll();
        log.info("Fetched {} reservations from the database.", reservations.size());
        return reservations;
    }

    public Page<Reservation> getAllReservationsWithPagination(PageRequest pageRequest) {
        Page<Reservation> reservations = reservationRepository.findAll(pageRequest);
        if(reservations.isEmpty()) {
            log.warn("No reservations found!");
        }
        log.info("Fetched {} reservations from the database( page {} of {}).",
                reservations.getTotalElements(),
                pageRequest.getPageNumber(),
                reservations.getTotalPages()
                );
        return reservations;
    }

    public ReservationDto updateReservation(Long id, ReservationDto reservationDto) {
        Reservation existingReservation = reservationRepository.findById(id)
                .orElseThrow(() -> {
                    log.error("Reservation with ID {} not found. Cannot update.", id);
                    return new CustomException(ReservationCustomError.RESERVATION_NOT_FOUND);
                });

        User user = userRepository.findById(reservationDto.getUserId())
                .orElseThrow(() -> {
                    log.error("User with ID {} not found. Cannot update.", id);
                    return new CustomException(UserCustomError.USER_NOT_FOUND);
                });

        Rental rental = rentalRepository.findById(reservationDto.getRentalId())
                .orElseThrow(() -> {
                    log.error("Rental with ID {} not found. Cannot update.", id);
                    return new CustomException(RentalCustomError.RENTAL_NOT_FOUND);
                });

        Car car = carRepository.findById(reservationDto.getCarId())
                .orElseThrow(() -> {
                    log.error("Car with ID {} not found. Cannot update.", id);
                    return new CustomException(CarCustomError.CAR_NOT_FOUND);
                });

        existingReservation.setUser(user);
        existingReservation.setRental(rental);
        existingReservation.setCar(car);
        existingReservation.setStartDate(reservationDto.getStartDate());
        existingReservation.setEndDate(reservationDto.getEndDate());
        existingReservation.setStatus(reservationDto.getStatus());

        log.info("Updating reservation with ID: {}.", id);

        Reservation savedReservation = reservationRepository.save(existingReservation);

        log.info("Successfully updated reservation with ID: {}.", id);

        return ReservationMapper.toReservationDto(savedReservation);
    }

    public void deleteReservation(Long id) {
        try {
            Reservation reservation = reservationRepository.findById(id)
                    .orElseThrow(() -> {
                        log.error("Reservation with ID {} not found. Cannot delete.", id);
                        return new CustomException(ReservationCustomError.RESERVATION_NOT_FOUND);
                    });
            log.info("Deleting reservation with ID: {}.", id);
            reservationRepository.delete(reservation);
            log.info("Successfully deleted reservation with ID: {}", id);
        } catch( CustomException e ) {
            log.error("Error deleting reservation with ID {}: {}", id, e.getMessage());
            throw e;
        }
    }

}
