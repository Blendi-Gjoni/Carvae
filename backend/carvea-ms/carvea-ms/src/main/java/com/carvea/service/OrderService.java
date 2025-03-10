package com.carvea.service;

import com.carvea.dto.OrderDto;
import com.carvea.model.Order;

import java.util.List;
import java.util.Optional;

public interface OrderService {
    public Order save(OrderDto request);
    public void delete(Long id);
    public List<Order> getAllOrders();
    public List<Order> getByCarId(Long carId);
    public Optional<Order> getByOrderId(Long id);
    public List<Order> getByUserId(Long userId);
}
