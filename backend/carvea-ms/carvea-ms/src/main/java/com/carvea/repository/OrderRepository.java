package com.carvea.repository;

import com.carvea.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    List<Order> findByCar_Id(Long carId); // Using "car.id" for nested property
    List<Order> findByUser_Id(Long userId);
    Order findByOrderId(Long orderId);
    List<Order> findByUserId(Long userId);
}
