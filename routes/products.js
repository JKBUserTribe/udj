const express = require('express');
const router = express.Router();
const config = require('../config/database');
const Product = require('../models/product');

// Register Route
router.post('/register', (req, res, next) => {
  let newProduct = new Product({

    display_name: req.body.display_name,
    product_description: req.body.product_description,
    brand: req.body.brand,
    info: req.body.info,
    price: req.body.price,
    release_date: req.body.release_date

  });

  Product.addProduct(newProduct, (err, product) => {
    if(err){
      res.json({success: false, msg:'Failed to register product'})
    } else {
      res.json({success: true, msg:'Product registered'})
    }
  })
});

module.exports = router;
