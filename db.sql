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

INSERT INTO resturants
  (name, location, price_range)
VALUES
  ('Mcdonalds', 'NY', 3);

SELECT *
FROM resturants;

SELECT name, price_range
FROM resturants;
