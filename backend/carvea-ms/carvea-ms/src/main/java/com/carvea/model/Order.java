package com.carvea.model;

import com.carvea.observer.Observer;
import com.carvea.observer.Subject;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "orders")
public class Order implements Subject {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "car_id", nullable = false)
    private Car car;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "order_date", nullable = false)
    private LocalDateTime orderDate;

    @ManyToOne
    @JoinColumn(name = "dealership_id", nullable = false)
    private Dealership dealership;

    @Column(name = "delivery_date")
    private LocalDateTime deliveryDate;

    @Column(name = "status", nullable = false)
    private String status;

    @Column(name = "price", nullable = false)
    private BigDecimal price;

    @Transient
    private List<Observer> observers = new ArrayList<>();

    @PrePersist
    protected void onCreate() {
        orderDate = LocalDateTime.now();
        deliveryDate = orderDate.plusMonths(2);
    }

    @Override
    public void attach(Observer observer) {
        observers.add(observer);
    }

    @Override
    public void detach(Observer observer) {
        observers.remove(observer);
    }

    @Override
    public void notifyObservers(String email, String subject, String message) {
        for (Observer observer : observers) {
            observer.update(email, subject, message);
        }
    }

    @Override
    public String toString() {
        return "Order{" +
                "id=" + id +
                ", car='" + car.getModel().getName() + '\'' +
                ", user='" + user.getUsernameF() + '\'' +
                ", orderDate=" + orderDate +
                ", dealership=" + dealership +
                ", deliveryDate=" + deliveryDate +
                ", status='" + status + '\'' +
                ", price=" + price +
                "}";
    }
}
