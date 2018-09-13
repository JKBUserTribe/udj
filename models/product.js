const mongoose = require('mongoose');
const config = require('../config/database');

// User Schema
const ProductSchema = mongoose.Schema({
  name : {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  info: {
    type: Array
  },
  price: {
    type: Number
  },
  release_date: {
    type: Date
  },
  stock: {
    type: Number,
    required: true
  }
});

const Product = module.exports = mongoose.model('Product', ProductSchema);

module.exports.getProductById = function(id, callback){
  Product.findById(id, callback);
}

module.exports.getProductByBrand = function(brand, callback){
  const query = {brand: brand};
  Product.findOne(query, callback);
}

module.exports.getProductByPrice = function(price, callback){
  const query = {price: price};
  Product.findOne(query, callback);
}

module.exports.addProduct = function(newProduct, callback){
  newProduct.save(callback);
};
