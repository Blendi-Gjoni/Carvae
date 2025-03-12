package com.carvea.service.impl;

import com.carvea.dto.OrderDto;
import com.carvea.enums.CarCustomError;
import com.carvea.enums.DealershipCustomError;
import com.carvea.enums.OrderCustomError;
import com.carvea.exceptions.CustomException;
import com.carvea.exceptions.ResourceNotFoundException;
import com.carvea.enums.UserCustomError;
import com.carvea.model.Car;
import com.carvea.model.Order;
import com.carvea.model.User;
import com.carvea.model.Dealership;
import com.carvea.repository.CarRepository;
import com.carvea.repository.OrderRepository;
import com.carvea.repository.UserRepository;
import com.carvea.repository.DealershipRepository;
import com.carvea.service.OrderService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
public class OrderServiceImpl implements OrderService {
    private final OrderRepository orderRepository;
    private final CarRepository carRepository;
    private final UserRepository userRepository;
    private final DealershipRepository dealershipRepository;
    private final EmailNotifier emailNotifier;

    public OrderServiceImpl(OrderRepository orderRepository, CarRepository carRepository, UserRepository userRepository, DealershipRepository dealershipRepository, EmailNotifier emailNotifier) {
        this.orderRepository = orderRepository;
        this.carRepository = carRepository;
        this.userRepository = userRepository;
        this.dealershipRepository = dealershipRepository;
        this.emailNotifier = emailNotifier;
    }

    public Order save(OrderDto request) {
        if (request.getCarId() == null) {
            log.error("Car ID is null!");
            throw new CustomException(CarCustomError.CAR_ID_REQUIRED);
        }
        if (request.getUserId() == null) {
            log.error("User ID is null!");
            throw new CustomException(UserCustomError.USER_ID_REQUIRED);
        }
        if (request.getDealershipId() == null) {
            log.error("Dealership ID is null!");
            throw new ResourceNotFoundException(DealershipCustomError.DEALERSHIP_NOT_FOUND.getMessage());
        }

        Car car = carRepository.findById(request.getCarId())
                .orElseThrow(() -> {
                    log.error("Car with ID {} not found.", request.getCarId());
                    return new CustomException(CarCustomError.CAR_NOT_FOUND);
                });

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> {
                    log.error("User with ID {} not found.", request.getUserId());
                    return new CustomException(UserCustomError.USER_NOT_FOUND);
                });

        Dealership dealership = dealershipRepository.findById(request.getDealershipId())
                .orElseThrow(() -> {
                    log.error("Dealership with ID {} not found.", request.getDealershipId());
                    return new CustomException(DealershipCustomError.DEALERSHIP_NOT_FOUND);
                });

        Order order = new Order();
        order.setCar(car);
        order.setUser(user);
        order.setDealership(dealership);
        order.setStatus("PENDING");
        order.setPrice(car.getPrice());

        order.attach(emailNotifier);
        log.info("Sending order confirmation email to: {}.", user.getEmail());
        order.notifyObservers(
                user.getEmail(),
                "Your Car Order Confirmation",
                "<html>"
                        + "<body style=\"font-family: Arial, sans-serif;\">"
                        + "<div style=\"background-color: #f5f5f5; padding: 20px;\">"
                        + "<h2 style=\"color: #333;\">Your Car Order is Confirmed!</h2>"
                        + "<p style=\"font-size: 16px;\">Hello " + user.getUsernameF() + ",</p>"
                        + "<p style=\"font-size: 16px;\">Your order has been successfully created.</p>"
                        + "<p><strong>Dealership:</strong> " + dealership.getName() + "</p>"
                        + "<p><strong>Car:</strong> " + car.getModel().getBrand().getName() + " " + car.getModel().getName() + "</p>"
                        + "<p><strong>Price:</strong> $" + car.getPrice() + "</p>"
                        + "<div style=\"background-color: #007bff; color: #fff; padding: 10px; text-align: center; border-radius: 5px;\">"
                        + "<p>Thank you for choosing Carvea!</p>"
                        + "</div>"
                        + "</div>"
                        + "</body>"
                        + "</html>"
        );
        log.info("Successfully sent order confirmation email to: {}.", user.getEmail());

        log.info("Adding order: {}.", order);
        Order createdOrder = orderRepository.save(order);
        log.info("Successfully added order: {}.", createdOrder);
        return createdOrder;
    }

    public void delete(Long id) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> {
                    log.error("Order with ID {} not found.", id);
                    return new CustomException(OrderCustomError.ORDER_NOT_FOUND);
                });
        log.info("Deleting order with ID: {}.", id);
        orderRepository.delete(order);
        log.info("Successfully deleted order with ID: {}.", id);
    }

    public List<Order> getAllOrders() {
        List<Order> orders = orderRepository.findAll();
        log.info("Fetched {} orders from the database.", orders.size());
        return orders;
    }

    public List<Order> getByCarId(Long carId) {
        log.info("Fetched all orders by car ID {}.", carId);
        return orderRepository.findByCar_Id(carId);
    }

    public Optional<Order> getByOrderId(Long id) {
        log.info("Fetched order with ID {}.", id);
        return orderRepository.findById(id);
    }

    public List<Order> getByUserId(Long userId) {
        log.info("Fetched all orders by user ID {}.", userId);
        return orderRepository.findByUserId(userId);
    }
}
