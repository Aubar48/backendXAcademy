-- Crear la base de datos COSUMEL
CREATE DATABASE xAcademyChallenge;

-- Usar la base de datos COSUMEL
USE xAcademyChallenge;

-- Crear la tabla de usuarios
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
-- Inserción de un usuario (sin encriptar la contraseña, solo para pruebas)
INSERT INTO users (username, password) VALUES ('testUser', 'testPassword');
