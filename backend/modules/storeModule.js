const sql = require("./db.js");

const Store = function(store) {
  this.storeID = store.storeID;
  this.userID = store.userID;
  this.name = store.name;
  this.description = store.description;
  this.address = store.address;
};

Store.create = (store, result) => {
  let fields = "userID, name, description, address";
  let values = "\"" + store.userID + "\",\"" + store.name + "\",\"" +
    store.description + "\",\"" + store.address + "\"";

  sql.query("INSERT INTO STORE(" + fields + ") VALUES(" + values + ")", (err,res) => {
      if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
      }
      console.log("created store: ", { ...store });
      result(null, { ...store });
  });
};

Store.getAll = (result) => {
  sql.query("SELECT * FROM STORE", (err, res) => {
      if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
      }

      console.log("stores: ", res);
      result(null, res);
  });
}

Store.findById = (result) => {
  sql.query("SELECT * FROM STORE WHERE userID=\"' + userID + '\"", (err, res) => {
      if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
      }

      console.log("stores: ", res);
      result(null, res);
  });
}

module.exports = Store;
