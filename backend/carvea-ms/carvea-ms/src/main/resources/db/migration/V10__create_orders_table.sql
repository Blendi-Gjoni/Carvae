CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    car_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    order_date TIMESTAMP(6) WITHOUT TIME ZONE NOT NULL,
    dealership_id BIGINT NOT NULL,
    delivery_date TIMESTAMP(6) WITHOUT TIME ZONE,
    status VARCHAR(50),
    price NUMERIC(10,2),
    FOREIGN KEY (car_id) REFERENCES cars(id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (dealership_id) REFERENCES dealerships(id) ON DELETE CASCADE
)