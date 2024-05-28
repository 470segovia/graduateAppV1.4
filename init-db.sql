CREATE DATABASE IF NOT EXISTS test;

-- Grant privileges to 'root' from any host
-- GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY 'your_root_password' WITH GRANT OPTION;

-- Seleccionar la base de datos 'test' para ejecutar consultas
USE test;

-- Verificar si la tabla 'phoneNumbers' existe
DROP TABLE IF EXISTS phoneNumbers;

-- Crear la tabla 'phoneNumbers'
CREATE TABLE phoneNumbers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    phoneNumber VARCHAR(20) NOT NULL,
    company VARCHAR(100),
    name VARCHAR(100)
);

-- Insertar datos en la tabla 'phoneNumbers'
INSERT INTO phoneNumbers (phoneNumber, company, name) VALUES 
('644199790', 'Vodafone', 'Jose'),
('667249583', 'Orange', 'Ana'),
('660596395', 'Simyo', 'Pepe'),
('648102622', NULL, NULL),
('691587202', NULL, NULL),
('660537687', NULL, NULL);
