const path = require('path');
const express = require('express');
const { body } = require('express-validator/check');


const adminController = require('../controllers/admin');
const isAuth = require('../middleware/is-auth');


const router = express.Router();

// /admin/add-product => GET
router.get('/add-cars', isAuth, adminController.getAddProduct);

// /admin/products => GET
//router.get('/carslog', isAuth, adminController.getProducts);

// /admin/add-product => POST
router.post('/add-cars', [
    body('title')
      .isString()
      .isLength({ min: 3 })
      .trim(),
    body('price').isFloat(),
    body('description')
      .isLength({ min: 5, max: 400 })
      .trim()
  ],
  adminController.postAddProduct
);

/* 
router.get('/edit-product/:productId', isAuth, adminController.getEditProduct);

router.post('/edit-product', [
    body('title')
      .isString()
      .isLength({ min: 3 })
      .trim(),
    body('price').isFloat(),
    body('description')
      .isLength({ min: 5, max: 400 })
      .trim()
  ],
  isAuth,
  adminController.postEditProduct
);
 
router.post('/delete-product', isAuth, adminController.postDeleteProduct);
*/
module.exports = router;
