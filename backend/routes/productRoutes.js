import React from 'react';
// import products from '../data/products.js';
import express from 'express';
import { createProduct, createProductReview, deleteProduct, getProductById, getProducts, getTopProducts, updateProducts } from '../controllers/productController.js'
import { protect, admin } from '../middleware/authMiddleware.js';


const router = express.Router();

router.route('/').get(getProducts).post(protect, createProduct);
router.route('/top').get(getTopProducts);
router.route('/:id').get(getProductById).delete(protect, deleteProduct).put( updateProducts);

router.route('/:id/reviews').post(protect, createProductReview);

export default router;

