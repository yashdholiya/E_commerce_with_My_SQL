
const express = require("express");
const productuRoute = express.Router();
const productController = require("../../controller/User/product.controller");
const  { getAllProduct, getProductById, getAllCategories } = require ("../../controller/User/product.controller");
const { getCatogery } = require("../../controller/Admin/categories.controller");

productuRoute.get('/product/all', getAllProduct);
 
productuRoute.get('/:id', getProductById);

productuRoute.get('/categoriess', getAllCategories);

productuRoute.get('/category/:categoryId/products', productController.getCategoryWithProducts);


module.exports = productuRoute