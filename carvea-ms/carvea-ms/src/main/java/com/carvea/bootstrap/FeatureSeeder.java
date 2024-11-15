package com.carvea.bootstrap;

import com.carvea.model.Features;
import com.carvea.repository.FeaturesRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class FeatureSeeder {

    @Bean
    CommandLineRunner seedFeatures(FeaturesRepository featuresRepository) {
        return args -> {
            if (featuresRepository.count() == 0) {
                List<Features> features = List.of(
                        new Features("Sunroof", "A panel in the car roof that can be opened for extra ventilation or light."),
                        new Features("Leather Seats", "Premium seats made from leather for added comfort and style."),
                        new Features("Bluetooth", "Wireless technology for connecting mobile devices to the car."),
                        new Features("Navigation System", "Built-in GPS for real-time directions and maps."),
                        new Features("Rear Camera", "A camera providing a view behind the car for safer reversing."),
                        new Features("Heated Seats", "Seats with built-in heating for added comfort in cold weather."),
                        new Features("Keyless Entry", "Unlock the car and start the engine without using a physical key."),
                        new Features("Cruise Control", "System for maintaining a steady speed without using the accelerator."),
                        new Features("Automatic Headlights", "Headlights that turn on/off automatically based on lighting conditions."),
                        new Features("Adaptive Suspension", "A system that adjusts the suspension for a smoother ride."),
                        new Features("Parking Sensors", "Sensors that assist with parking by detecting obstacles."),
                        new Features("Lane Assist", "Technology to help keep the car within its lane while driving.")
                );

                featuresRepository.saveAll(features);
            }
        };
    }
}