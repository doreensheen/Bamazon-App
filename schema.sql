DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NULL,
    department_name VARCHAR(100) NULL,
    price DECIMAL(10,2) NULL,
    stock_quantity INT NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("iphone 6s", "phone", 449.99, 2);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("iphone 7", "phone", 649.99, 3);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("iphone 8", "phone", 699.99, 6);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("iphone 8 plus", "phone", 799.99, 2);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("iphone X", "phone", 999.99, 12);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("flexible hardshell case", "accessories", 49.99, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("ipad", "tablet", 459.99, 1);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("ipad pro", "tablet", 729.99, 3);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("screen protector", "accessories", 24.99, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("otterbox case", "accessories", 49.99, 8);

