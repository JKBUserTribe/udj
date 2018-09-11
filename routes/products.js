const express = require('express');
const router = express.Router();
const passport = require('passport');
const config = require('../config/database');
const Product = require('../models/product');

// Register Route
router.post('/register', (req, res, next) => {
  let newProduct = new Product({

    name: req.body.name,
    description: req.body.description,
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

// Get all products Route
router.get('/all', (req, res, next) => {
  Product.find({}, (err, products) => {
    if(err) throw err;
    if(!products){
      return res.json({success: false});
    }

    const data = []
    products.forEach(function(object){
      data.push({
        _id: object._id,
        name: object.name,
        description: object.description,
        brand: object.brand,
        info: object.info,
        price: object.price,
        release_date: object.release_date,
      });
    });


    res.json({
      success: true,
      products: data
    })
  });
});

module.exports = router;