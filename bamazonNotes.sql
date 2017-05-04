CREATE DATABASE Bamazon;


USE Bamazon;

CREATE TABLE auctions(
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price DECIMAL(10,2),
  stock_quantity INT default 0,
  PRIMARY KEY (id)
);

INSERT INTO auctions (product_name, department_name, price, stock_quantity)
VALUES ("Football", "Sporting Goods", 7.50, 11);
INSERT INTO auctions (product_name, department_name, price, stock_quantity)
VALUES ("Basketball Sneakers", "Shoes", 37.50, 16);
INSERT INTO auctions (product_name, department_name, price, stock_quantity)
VALUES ("Baseball Cleats", "Shoes", 55.50, 4);
INSERT INTO auctions (product_name, department_name, price, stock_quantity)
VALUES ("Basketball", "Sporting Goods", 13.50, 7);
INSERT INTO auctions (product_name, department_name, price, stock_quantity)
VALUES ("Golf Clubs", "Sporting Goods", 89.50, 12);
INSERT INTO auctions (product_name, department_name, price, stock_quantity)
VALUES ("Football Helmet", "Sporting Goods", 18.50, 13);
INSERT INTO auctions (product_name, department_name, price, stock_quantity)
VALUES ("Baseball Bat", "Sporting Goods", 16.50, 10);





DELETE FROM auctions WHERE product_name = 'baseball';

DROP TABLE auctions;
commit;

select * from auctions;