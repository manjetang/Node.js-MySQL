DROP DATABASE IF EXISTS bamazonDB;
CREATE DATABASE bamazonDB;
USE bamazonDB;
CREATE TABLE products (
item_id INT NOT NULL AUTO_INCREMENT,
product_name VARCHAR (50),
department_name VARCHAR (50),
price DECIMAL(10, 2),
stock_quantity INT(10) NULL,
PRIMARY KEY(ITEM_ID)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("initiatives nonstick cookware", "kitchen and dining", 54.82, 10),
("jade matcha green tea", "food and beverage", 9.95, 10),
("umbuzo wood table", "kitchen and dining", 499, 10),
("apple macbook pro 13", "electronics", 1037.49, 10),
("multivitamins", "supplement", 18.95, 10),
("playstation 4", "electronic and gaming", 299.99, 10),
("high yield toner cartridge", "school and office supplies", 53.99, 10),
("dinnerware set", "kitchen and dining", 45.00, 10),
("brother printer", "office and school supplies", 59.99, 10),
("call of duty", "software", 59.99, 10);

SELECT * FROM products;