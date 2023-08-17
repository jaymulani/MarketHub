const express = require('express');
const { createProduct, getALlProducts } = require('../Controllers/productController');

const router = express.Router();

router.post('/', getALlProducts);
router.post('/addProduct', createProduct);

module.exports = router;
