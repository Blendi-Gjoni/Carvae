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

//	@Autowired
//	private EmailNotifier emailNotifier;

//	@Override
//	public void run(String... args) {
//		User user = new User();
//		user.setEmail("blendi.gjoni@outlook.com");
//		user.setUsername("testUser");
//		user.setPassword("password");
//		user.setEnabled(true);
//		Order order = new Order();
//		order.setUser(user);
//		order.setDeliveryDate(LocalDateTime.now().plusMinutes(1));
//		order.attach(emailNotifier);
//		order.onUpdate();
//		Reservation reservation = new Reservation();
//		reservation.setUser(user);
//		reservation.setEndDate(LocalDate.now().plusDays(1));
//		reservation.attach(emailNotifier);
//		reservation.onUpdate();
//	}

}
