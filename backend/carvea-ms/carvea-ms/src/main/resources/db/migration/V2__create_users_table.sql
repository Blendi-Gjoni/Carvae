CREATE TABLE USERS (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    usernameF VARCHAR(50),
    email VARCHAR(100) NOT NULL UNIQUE,
    password TEXT NOT NULL,
    enabled BOOLEAN DEFAULT FALSE NOT NULL,
    verification_code VARCHAR(255),
    verification_expiration TIMESTAMP,
    role_id BIGINT NOT NULL,
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE
)