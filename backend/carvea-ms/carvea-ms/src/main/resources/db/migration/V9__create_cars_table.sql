CREATE TABLE cars (
    id SERIAL PRIMARY KEY,
    model_id BIGINT NOT NULL,
    year INT NOT NULL,
    horsepower INT NOT NULL,
    kilometers DOUBLE PRECISION NOT NULL,
    description TEXT NOT NULL,
    exterior VARCHAR(50) NOT NULL,
    interior VARCHAR(50) NOT NULL,
    fuel_type VARCHAR(50) NOT NULL,
    transmission VARCHAR(50) NOT NULL,
    category_id BIGINT NOT NULL,
    car_type VARCHAR(50) NOT NULL,
    FOREIGN KEY (model_id) REFERENCES models(id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);

CREATE TABLE car_feature (
    car_id BIGINT NOT NULL,
    feature_id BIGINT NOT NULL,
    PRIMARY KEY (car_id, feature_id),
    FOREIGN KEY (car_id) REFERENCES cars(id) ON DELETE CASCADE,
    FOREIGN KEY (feature_id) REFERENCES features(id) ON DELETE CASCADE
);

CREATE TABLE car_images (
    car_id BIGINT NOT NULL,
    image_path TEXT NOT NULL,
    FOREIGN KEY (car_id) REFERENCES cars(id) ON DELETE CASCADE
);