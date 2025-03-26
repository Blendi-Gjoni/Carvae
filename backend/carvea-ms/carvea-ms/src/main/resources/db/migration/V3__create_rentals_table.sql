CREATE TABLE rentals (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    address VARCHAR(50) NOT NULL,
    city VARCHAR(50) NOT NULL,
    state VARCHAR(50) NOT NULL,
    phone_number VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    website VARCHAR(100) NOT NULL UNIQUE,
    opening_hours VARCHAR(50) NOT NULL,
    image_path TEXT
)
