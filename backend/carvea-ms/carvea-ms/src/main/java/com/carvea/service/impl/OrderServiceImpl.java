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
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderServiceImpl implements OrderService {
    private final OrderRepository orderRepository;
    private final CarRepository carRepository;
    private final UserRepository userRepository;
    private final DealershipRepository dealershipRepository;

    public OrderServiceImpl(OrderRepository orderRepository, CarRepository carRepository, UserRepository userRepository, DealershipRepository dealershipRepository) {
        this.orderRepository = orderRepository;
        this.carRepository = carRepository;
        this.userRepository = userRepository;
        this.dealershipRepository = dealershipRepository;
    }

    public Order save(OrderDto request) {
        if (request.getCarId() == null) {
            throw new CustomException(CarCustomError.CAR_ID_REQUIRED);
        }
        if (request.getUserId() == null) {
            throw new CustomException(UserCustomError.USER_ID_REQUIRED);
        }
        if (request.getDealershipId() == null) {
            throw new ResourceNotFoundException(DealershipCustomError.DEALERSHIP_NOT_FOUND.getMessage());
        }

        Car car = carRepository.findById(request.getCarId())
                .orElseThrow(() -> new CustomException(CarCustomError.CAR_NOT_FOUND));

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new CustomException(UserCustomError.USER_NOT_FOUND));

        Dealership dealership = dealershipRepository.findById(request.getDealershipId())
                .orElseThrow(() -> new CustomException(DealershipCustomError.DEALERSHIP_NOT_FOUND));

        Order order = new Order();
        order.setCar(car);
        order.setUser(user);
        order.setDealership(dealership);
        order.setStatus("PENDING");
        order.setPrice(car.getPrice());
        return orderRepository.save(order);
    }

    public void delete(Long id) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new CustomException(OrderCustomError.ORDER_NOT_FOUND));
        orderRepository.delete(order);
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public List<Order> getByCarId(Long carId) {
        return orderRepository.findByCar_Id(carId);
    }

    public Optional<Order> getByOrderId(Long id) {
        return orderRepository.findById(id);
    }

    public List<Order> getByUserId(Long userId) {
        return orderRepository.findByUserId(userId);
    }
}
