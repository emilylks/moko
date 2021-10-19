const sql = require("./db.js");

const StoreItem = function(storeItem) {
  this.storeItemID = storeItem.storeItemID,
  this.storeID = storeItem.storeID,
  this.name = storeItem.name,
  this.description = storeItem.description,
  this.stockQty = storeItem.stockQty,
  this.price = storeItem.price,
  this.imageUrl = storeItem.imageUrl,
  this.imageName = storeItem.imageName
};

StoreItem.create = (storeItem, result) => {
  let fields = "storeID, name, description, stockQty, price, imageUrl, imageName";
  let values = "\"" + storeItem.storeID + "\",\"" + storeItem.name
    + "\",\"" + storeItem.description + "\",\"" + storeItem.stockQty + "\",\"" + storeItem.price +
    "\",\"" + storeItem.imageUrl + "\",\"" + storeItem.imageName +  "\"" ;

  sql.query("INSERT INTO STORE_ITEM(" + fields + ") VALUES(" + values + ")", (err,res) => {
      if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
      }
      console.log("created store item: ", { ...storeItem });
      result(null, { ...storeItem });
  });
}

StoreItem.findById = (storeItemID, result) => {
  sql.query('SELECT * FROM STORE_ITEM WHERE storeItemID=\"' + storeItemID + '\"', (err, res) => {
      if (err) {
          console.log("error ", err);
          result(err, null);
          return;
      }

      if (res.length) {
          console.log("found storeItem: ", res[0]);
          result(null, res);
          return;
      }

      result({ kind: "User not found" }, null);
  });
}

StoreItem.findItemsByStoreId = (storeID, result) => {
  sql.query('SELECT * FROM STORE_ITEM WHERE storeID=\"' + storeID + '\"', (err, res) => {
      if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
      }

      console.log("store items: ", res);
      result(null, res);
  });
}

StoreItem.updateQuantity = (storeItem, result) => {
  sql.query(
      "UPDATE STORE_ITEM SET stockQty=\"" + storeItem.stockQty + "\" WHERE storeItemID=\"" + storeItem.storeItemID + "\"",
      (err, res) => {
          if (err) {
              console.log("error: ", err);
              result(err, null);
              return;
          } else if (res.affectedRows == 0) {
              result({ kind: "store item not found" }, null);
              return;
          }

          console.log("updated store item: ", { ...storeItem });
          result(null, { ...storeItem });
      }
  );
}

StoreItem.updateImage = (storeItem, result) => {
 var query = "UPDATE STORE_ITEM SET ? WHERE storeItemID = ?";
 var updates = { imageUrl: storeItem.imageUrl, imageName: storeItem.imageName };
 sql.query(
      query, [updates, storeItem.storeItemID],
      (err, res) => {
          if (err) {
              console.log("error: ", err);
              result(err, null);
              return;
          } else if (res.affectedRows == 0) {
              result({ kind: "store item not found" }, null);
              return;
          }

          console.log("updated store item: ", { ...storeItem });
          result(null, { ...storeItem });
      }
  );
}

module.exports = StoreItem;
