package com.carvea.service;

import com.carvea.dto.OrderDto;
import com.carvea.model.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import java.util.List;
import java.util.Optional;

public interface OrderService {
    public Order save(OrderDto request);
    public void delete(Long id);
    public List<Order> getAllOrders();
    public Page<Order> getAllOrdersWithPagination(PageRequest pageRequest);
    public List<Order> getByCarId(Long carId);
    public Optional<Order> getByOrderId(Long id);
    public List<Order> getByUserId(Long userId);
}
