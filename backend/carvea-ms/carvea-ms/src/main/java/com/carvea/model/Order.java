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
    private Long orderId;

    @ManyToOne
    @JoinColumn(name = "car_id", nullable = false)
    private Car car;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private LocalDateTime orderDate;

    @ManyToOne
    @JoinColumn(name = "dealership_id", nullable = false)
    private Dealership dealership;

    private LocalDateTime deliveryDate;

    private String status;

    private BigDecimal price;

    private LocalDateTime updatedAt;

    @Transient
    private List<Observer> observers = new ArrayList<>();

    @PrePersist
    protected void onCreate() {
        orderDate = LocalDateTime.now();
        deliveryDate = orderDate.plusMonths(2);
        notifyObservers("Order created: " + orderId);
    }

    @PreUpdate
    public void onUpdate() {
        this.updatedAt = LocalDateTime.now();
        if (deliveryDate != null && deliveryDate.isBefore(LocalDateTime.now().plusDays(1))) {
            notifyObservers("Order about to arrive: " + orderId + ". Email: " + user.getEmail());
        }
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
    public void notifyObservers(String message) {
        for (Observer observer : observers) {
            observer.update(message);
        }
    }
}
