/* Database Initialization Script: */
CREATE DATABASE MokoDB;
USE MokoDB;

CREATE TABLE USER(
  userID varchar(200) NOT NULL,
  isSeller boolean NOT NULL,
  address varchar(200) NOT NULL,
  email varchar(100) NOT NULL,
  phoneNumber varchar(10) NOT NULL,
  PRIMARY KEY(userID)
);

CREATE TABLE STORE(
  storeID int NOT NULL AUTO_INCREMENT,
  userID varchar(200) NOT NULL,
  name varchar(50) NOT NULL,
  description varchar(200) NOT NULL,
  address varchar(400) NOT NULL,
  FOREIGN KEY (userID) REFERENCES USER (userID),
  PRIMARY KEY(storeID)
);

CREATE TABLE STORE_ITEM(
  storeItemID int NOT NULL AUTO_INCREMENT,
  storeID int NOT NULL,
  name varchar(60) NOT NULL,
  description varchar(60),
  stockQty int unsigned NOT NULL CHECK (stockQty >= 0),
  price float NOT NULL CHECK (price >= 0),
  imageUrl varchar(800),
  imageName varchar(800),
  FOREIGN KEY (storeID) REFERENCES STORE (storeID),
  PRIMARY KEY(storeItemID)
);

CREATE TABLE CART_ITEM(
  userID varchar(200) NOT NULL,
  storeItemID int NOT NULL,
  quantity int,
  price float NOT NULL CHECK (price >= 0),
  imageUrl varchar(800),
  imageName varchar(800),
  storeID int NOT NULL,
  name varchar(60) NOT NULL,
  description varchar(60),
  FOREIGN KEY (storeID) REFERENCES STORE (storeID),
  FOREIGN KEY (userID) REFERENCES USER (userID),
  FOREIGN KEY (storeItemID) REFERENCES STORE_ITEM(storeItemID),
  PRIMARY KEY(storeItemID)
);

CREATE TABLE TAG(
  tagID int NOT NULL AUTO_INCREMENT,
  name varchar(400) NOT NULL,
  PRIMARY KEY(tagID)
);

CREATE TABLE TAG_LOOKUP(
  userID varchar(200),
  storeID int,
  tagID int,
  FOREIGN KEY (userID) REFERENCES USER (userID),
  FOREIGN KEY (storeID) REFERENCES STORE (storeID),
  FOREIGN KEY (tagID) REFERENCES TAG (tagID),
  PRIMARY KEY(userID, storeID, tagID),
  UNIQUE(userID, storeID, tagID)
);

INSERT INTO TAG(name) VALUES('Vegetables');
INSERT INTO TAG(name) VALUES('Fruit');
INSERT INTO TAG(name) VALUES('Dairy');
INSERT INTO TAG(name) VALUES('Eggs');
INSERT INTO TAG(name) VALUES('Meat Products');
INSERT INTO TAG(name) VALUES('Produce');
INSERT INTO TAG(name) VALUES('Vegetarian');
INSERT INTO TAG(name) VALUES('Home Cooked');
INSERT INTO TAG(name) VALUES('Desserts');
INSERT INTO TAG(name) VALUES('Ready-made');

INSERT INTO USER(isSeller, address, email, phoneNumber)
  VALUES('1', true, '1580 Point W Blvd, Coppell, TX 75019', 'john@doe.com', '1234561234');
INSERT INTO USER(isSeller, address, email, phoneNumber)
  VALUES('2', true, '1575 S Belt Line Rd, Coppell, TX 75019', 'jane@doe.com', '9876543210');

INSERT INTO STORE(userID, name, description, address) VALUES('1', 'Johnnys veggies', 'A friendly vegetable stand', '1580 Point W Blvd, Coppell, TX 75019');
INSERT INTO STORE(userID, name, description, address) VALUES('2', 'Sweet Stand', 'A local dessert stand', '1575 S Belt Line Rd, Coppell, TX 75019');

INSERT INTO STORE_ITEM(storeID, name, description, stockQty, price, imageUrl, imageName)
  VALUES(1, 'Lettuce', 'Crisp head of iceberg', 10, 1.99, "", "");
INSERT INTO STORE_ITEM(storeID, name, description, stockQty, price, imageUrl, imageName)
  VALUES(1, 'Tomatoes', 'Sweet tomatoes, per bunch', 20, 2.99, "", "");
INSERT INTO STORE_ITEM(storeID, name, description, stockQty, price, imageUrl, imageName)
  VALUES(1, 'Cucumbers', 'Fresh cucumbers, per bunch of 3', 20, 1.99, "", "");
INSERT INTO STORE_ITEM(storeID, name, description, stockQty, price, imageUrl, imageName)
  VALUES(1, 'Celery', 'Crunchy celery, per bunch', 30, 2.99, "", "");
INSERT INTO STORE_ITEM(storeID, name, description, stockQty, price, imageUrl, imageName)
  VALUES(1, 'Apples', 'Ripe apple, per apple', 20, 1.99, "", "");

INSERT INTO STORE_ITEM(storeID, name, description, stockQty, price, imageUrl, imageName)
  VALUES(2, 'Chocolate Chip Cookie', 'Chewy cookies, priced per cookie', 30, 0.99, "", "");
INSERT INTO STORE_ITEM(storeID, name, description, stockQty, price, imageUrl, imageName)
  VALUES(2, 'Banana Bread', 'A mini-loaf of warm banana bread', 10, 1.50, "", "");
INSERT INTO STORE_ITEM(storeID, name, description, stockQty, price, imageUrl, imageName)
  VALUES(2, 'Vanilla Cupcake', 'A light vanilla cupcake with sprinkles', 30, 2.99, "", "");
