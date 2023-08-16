const express = require('express');
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadProductCover,
} = require('../controllers/products');

const router = express.Router({ mergeParams: true });

const { protect, authorize } = require('../middlewares/auth');
const Product = require('../models/Product');
const advancedResults = require('../middlewares/advancedResults');

// Uncomment these lines if you want to protect and authorize routes
// router.use(protect);
// router.use(authorize('admin', 'staff'));

router
  .route('/')
  .get(advancedResults(Product), getProducts)
  .post(createProduct);

router
  .route('/:id')
  .get(getProduct)
  .put(updateProduct)
  .delete(deleteProduct);

router.route('/:id/cover').put(uploadProductCover);

module.exports = router;
