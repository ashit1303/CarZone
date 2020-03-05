const mongoose = require('mongoose');
const { validationResult } = require('express-validator/check');


const Product = require('../models/product');
const fileHelper = require('../util/file');


exports.getAddProduct = (req, res, next) => {
  res.render('addcar', {
    pageTitle: 'Add New Car',
    path: '/add-cars',
    editing: false,
    hasError: false,
    errorMessage: null,
    validationErrors: []
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const image = req.file;
  const price = req.body.price;
  const description = req.body.description;
  if (!image) {
    return res.status(422).render('addcar', {
      pageTitle: 'Add New Car',
      path: '/add-cars',
      editing: false,
      hasError: true,
      product: {
        title: title,
        price: price,
        description: description
      },
      errorMessage: 'Attached file is not an image.',
      validationErrors: []
    });
  }
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(errors.array());
    return res.status(422).render('addcar', {
      pageTitle: 'Add New Car',
      path: '/add-cars',
      editing: false,
      hasError: true,
      product: {
        title: title,
        imageUrl: imageUrl,
        price: price,
        description: description
      },
      errorMessage: errors.array()[0].msg,
      validationErrors: errors.array()
    });
  }

  const imageUrl = image.path;

  const product = new Product({
    // _id: new mongoose.Types.ObjectId('5badf72403fd8b5be0366e81'),
    title: title,
    price: price,
    description: description,
    imageUrl: imageUrl,
    userId: req.user
  });
  product
    .save()
    .then(result => {
      // console.log(result);
      console.log('Created Product');
      res.redirect('/add-cars');
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};
