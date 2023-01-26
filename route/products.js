const express = require('express');
const router = express.Router();


const {getAllProducts,getAllProductsStatis} = require('../controllers/products')

router.route('/').get(getAllProducts)
router.route('/static').get(getAllProductsStatis)

module.exports = router
