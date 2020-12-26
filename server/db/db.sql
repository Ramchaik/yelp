-- for help: \?
-- to list databases: \l
-- create database: CREATE DATABASE <db_name>;
-- connect to database: \c <db_name>
-- List all tables: \d
-- See structure of table: \d <table_name>

-- Create Table: 
CREATE TABLE products
(
  id INT,
  name VARCHAR(50),
  price INT,
  on_sale boolean
);

-- Add Column:
ALTER TABLE products ADD COLUMN featured boolean;

-- Drop Column:
ALTER TABLE products DROP COLUMN featured;

-- Drop Table:
DROP TABLE products;

-- Drop DB:
DROP DATABASE practice;


CREATE TABLE restaurants
(
  id BIGSERIAL NOT NULL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  location VARCHAR(50) NOT NULL,
  price_range INT NOT NULL CHECK(price_range >= 1 AND price_range <= 5)
);

INSERT INTO restaurants
  (name, location, price_range)
VALUES
  ('Mcdonalds', 'NY', 3);

SELECT *
FROM restaurants;

SELECT name, price_range
FROM restaurants;

SELECT * from restaurants WHERE id=1;

UPDATE restaurants SET name = 'red lobster', location = 'miami', price_range = 2 WHERE id = 8;

DELETE FROM restaurants WHERE id = 8;


-- Reviews
CREATE TABLE reviews (
  id BIGSERIAL NOT NULL PRIMARY KEY,
  restaurant_id BIGINT NOT NULL REFERENCES restaurants(id),
  name VARCHAR(50) NOT NULL,
  review TEXT NOT NULL,
  rating INT NOT NULL CHECK(rating >= 1 AND rating <= 5)
);

INSERT INTO reviews 
  (restaurant_id, name, review, rating) 
VALUES 
  (1, 'carl', 'this is good', 3);