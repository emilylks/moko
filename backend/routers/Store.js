const express = require('express');
const router = express.Router();
const Store = require('./../modules/storeModule.js');
const GeoCoder = require('./../modules/geoCoder.js');

// Store Routes - base route /stores
router.post('/', createStore);
router.get('/', getAllStores);
router.get('/:userID', getStoreByUserId);
router.get('/:radius/:address', getStoresInRadius);

let cache = {};

function createStore(req, res, next) {
  const newStore = new Store({
    userID: req.body.userID,
    name: req.body.name,
    description: req.body.description,
    address: req.body.address
  });

  Store.create(newStore, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message
      });
    } else { res.send(data); }
  });
}

function getAllStores(req, res, next) {
  Store.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message
      });
    else { res.send(data); }
  });
}

function getStoreByUserId(req, res, next) {
  Store.findById(req.params.userID, (err, data) => {
    if (err)
      res.status(404).send({
        message: "User has no store"
      });
    else { res.send(data); }
  });
}

function getStoresInRadius(req, res, next) {
  const baseAddress = req.params.address;
  const radius = req.params.radius;

  console.log("radius search base address: " + baseAddress);
  console.log("radius search radius: " + radius);
  Store.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message
      });
    else {
      if (cache[radius]) {
  	console.log("got cached radius data");
 	console.log(cache[radius]);
        res.send(cache[radius]);
      } else {
	let storesInRadius = [];
        data.forEach(async (store) => {
          let dist = await GeoCoder.getDistanceBetweenAddresses(baseAddress, store.address);
	  console.log("distance between addresses: " + dist);
          if (dist >= 0 && dist <= radius) {
	    storesInRadius.push(store);
	  }
        });
	
	console.log("got geocoded data");
	console.log(storesInRadius);
        cache[radius] = storesInRadius;
        res.send(storesInRadius);
      }
    }
  });
}

module.exports = router;
