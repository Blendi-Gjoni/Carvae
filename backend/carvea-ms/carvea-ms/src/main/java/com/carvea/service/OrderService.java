package com.carvea.service;

import com.carvea.dto.OrderDto;
import com.carvea.exceptions.ResourceNotFoundException;
import com.carvea.model.Car;
import com.carvea.model.Order;
import com.carvea.model.User;
import com.carvea.model.Dealership;
import com.carvea.repository.CarRepository;
import com.carvea.repository.OrderRepository;
import com.carvea.repository.UserRepository;
import com.carvea.repository.DealershipRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {
    private final OrderRepository orderRepository;
    private final CarRepository carRepository;
    private final UserRepository userRepository;
    private final DealershipRepository dealershipRepository;

    public OrderService(OrderRepository orderRepository, CarRepository carRepository, UserRepository userRepository, DealershipRepository dealershipRepository) {
        this.orderRepository = orderRepository;
        this.carRepository = carRepository;
        this.userRepository = userRepository;
        this.dealershipRepository = dealershipRepository;
    }

    public Order save(OrderDto request) {
        if (request.getCarId() == null) {
            throw new ResourceNotFoundException("Car Id is required");
        }
        if (request.getUserId() == null) {
            throw new ResourceNotFoundException("User Id is required");
        }
        if (request.getDealershipId() == null) {
            throw new ResourceNotFoundException("Dealership Id is required");
        }

        Car car = carRepository.findById(request.getCarId())
                .orElseThrow(() -> new ResourceNotFoundException("Car not found with ID: " + request.getCarId()));

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + request.getUserId()));

        Dealership dealership = dealershipRepository.findById(request.getDealershipId())
                .orElseThrow(() -> new ResourceNotFoundException("Dealership not found with ID: " + request.getDealershipId()));

        Order order = new Order();
        order.setCar(car);
        order.setUser(user);
        order.setDealership(dealership);
        order.setStatus("PENDING");
        order.setPrice(car.getPrice());
        return orderRepository.save(order);
    }

    public void delete(Long orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with ID: " + orderId));
        orderRepository.delete(order);
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public List<Order> getByCarId(Long carId) {
        return orderRepository.findByCar_Id(carId);
    }

    public Order getByOrderId(Long orderId) {
        return orderRepository.findByOrderId(orderId);
    }

    public List<Order> getByUserId(Long userId) {
        return orderRepository.findByUserId(userId);
    }
}
