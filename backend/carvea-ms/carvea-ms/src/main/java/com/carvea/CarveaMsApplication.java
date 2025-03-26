package com.carvea;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class CarveaMsApplication // implements CommandLineRunner
{


	public static void main(String[] args) {

		SpringApplication.run(CarveaMsApplication.class, args);
		System.out.println("Carvae Application Started!");
	}
}
