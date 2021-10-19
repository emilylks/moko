const sql = require("./db.js");

const CartItem = function(cartItem) {
  this.userID = cartItem.userID;
  this.storeItemID = cartItem.storeItemID;
  this.storeID = cartItem.storeID;
  this.quantity = cartItem.quantity;
  this.price = cartItem.price;
  this.imageUrl = cartItem.imageUrl;
  this.imageName = cartItem.imageName;
  this.name = cartItem.name;
  this.description = cartItem.description;
};

CartItem.create = (cartItem, result) => {
  let fields = "userID, storeItemID, storeID, quantity, price, imageUrl, imageName, name, description";
  let values = "\"" + cartItem.userID + "\",\"" + cartItem.storeItemID + "\",\"" + cartItem.storeID + "\",\"" + 
		cartItem.quantity + "\",\"" + cartItem.price + "\",\"" + cartItem.imageUrl + "\",\"" + 
		cartItem.imageName + "\",\"" + cartItem.name + "\",\"" + cartItem.description + "\"";

  sql.query("INSERT INTO CART_ITEM(" + fields + ") VALUES(" + values + ")", (err,res) => {
      if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
      }
      console.log("created cart item: ", { ...cartItem });
      result(null, { ...cartItem });
  });
};

CartItem.updateQuantity = (cartItem, result) => {
  sql.query(
      "UPDATE CART_ITEM SET quantity = \"" + cartItem.quantity + "\" WHERE storeItemID = \"" + cartItem.storeItemID + "\"",
      (err, res) => {
          if (err) {
              console.log("error: ", err);
              result(err, null);
              return;
          } else if (res.affectedRows == 0) {
              result({ kind: "cart item not found" }, null);
              return;
          }

          console.log("updated user: ", { ...cartItem });
          result(null, { ...cartItem });
      }
  );
};

CartItem.remove = (storeItemID, result) => {
  sql.query(
      "DELETE FROM CART_ITEM WHERE storeItemID = \"" + storeItemID + "\"", (err, res) => {
          if (err) {
              console.log("error: ", err);
              result(err, null);
              return;
          } else if (res.affectedRows == 0) {
              result({ kind: "cartItem not found" }, null);
              return;
          }

          console.log("deleted cartItem with storeItemID: ", storeItemID);
          result(null, res);
      }
  );
};

module.exports = CartItem;
