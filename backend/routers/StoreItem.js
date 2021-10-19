const express = require('express');
const fs = require('fs');
require('base64-arraybuffer');
const router = express.Router();
const StoreItem = require('./../modules/storeItemModule.js');
const S3 = require('./S3.js');

// StoreItem Routes - base route /store_items
router.post('/', createStoreItem);
router.get('/:storeItemID', findStoreItemByID);
router.get('/by_store/:storeID', findItemsByStoreId);
router.put('/', updateStoreItemQuantity);
router.put('/image', updateStoreImage);

async function createStoreItem(req, res, next) {
  if (!req.body.storeItemID) {
      res.status(400).send({
        message: "storeItemID cannot be empty!"
      });
  }

  const newStoreItem = new StoreItem({
    storeItemID: req.body.storeItemID,
    storeID: req.body.storeID,
    name: req.body.name,
    description: req.body.description,
    stockQty: req.body.stockQty,
    price: req.body.price,
    imageUrl: req.body.imageUrl,
    imageName: req.body.imageName
  });

	StoreItem.create(newStoreItem, async (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message
      });
    } else {
      if (newStoreItem.imageUrl != "") {
        const base64 = await fs.readFile(newStoreItem.imageUrl, 'base64');
        const arrayBuffer = decode(base64);
        const s3Params = new S3({
          fileName: newStoreItem.imageName,
          fileBody: arrayBuffer
        });

        S3.createImage(s3Params, (error, result) => {
          if (err) {
            res.status(500).send({
              message: err.message
            });
          } else { res.send(data); }
        });
      }
    }
  });
}

function findStoreItemByID(req, res, next) {
  StoreItem.findById(req.params.storeItemID, (err, data) => {
    if (err) {
      res.status(404).send({
        message: `Unable to find user with userID ${userID}.`
      });
    } else { res.send(data); }
  });
}

function findItemsByStoreId(req, res, next) {
  StoreItem.findItemsByStoreId(req.params.storeID, (err, data) => {
    if (err)
      res.status(404).send({
        message: "Store not found"
      });
    else { res.send(data); }
  });
}

function updateStoreItemQuantity(req, res, next) {
  const newStoreItem = new StoreItem({
    storeItemID: req.body.storeItemID,
    storeID: req.body.storeID,
    name: req.body.name,
    description: req.body.description,
    stockQty: req.body.stockQty,
    price: req.body.price,
    imageUrl: req.body.imageUrl,
    imageName: req.body.imageName
  });

	StoreItem.updateQuantity(newStoreItem, (err, data) => {
    if (err) {
        res.status(404).send({
          message: `Unable to update storeItem with ID ${newStoreItem.storeItemID}.`
        });
    } else { res.send(data); }
  });
}

function updateStoreImage(req, res, next) {
  const newStoreItem = new StoreItem({
    storeItemID: req.body.storeItemID,
    storeID: req.body.storeID,
    name: req.body.name,
    description: req.body.description,
    stockQty: req.body.stockQty,
    price: req.body.price,
    imageUrl: req.body.imageUrl,
    imageName: req.body.imageName
  });

  StoreItem.updateImage(newStoreItem, async (err, data) => {
    if (err) {
        res.status(404).send({
          message: `Unable to update storeItem with ID ${newStoreItem.storeItemID}.`
        });
    } else {
      const base64 = await fs.readFile(newStoreItem.imageUrl, 'base64');
      const arrayBuffer = decode(base64);
      const s3Params = new S3({
        fileName: newStoreItem.imageName,
        fileBody: arrayBuffer
      });

      S3.updateImage(s3Params, (error, result) => {
        if (err) {
          res.status(500).send({
            message: err.message
          });
        } else { res.send(data); }
      });
    }
  })
}

module.exports = router;
