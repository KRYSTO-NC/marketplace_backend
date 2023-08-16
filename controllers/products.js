const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async');
const Product = require('../models/Product');
const path = require('path');

// @desc      Get all products
// @route     GET /rfid-marketplace/api/v1/products
// @access    Private/Admin
exports.getProducts = asyncHandler(async (req, res, next) => {
    const products = await Product.find();
    res.status(200).json({ success: true, data: products });
});

// @desc      Get single product
// @route     GET /rfid-marketplace/api/v1/products/:id
// @access    Private/Admin
exports.getProduct = asyncHandler(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
        return next(new ErrorResponse(`Product not found with id of ${req.params.id}`, 404));
    }

    res.status(200).json({ success: true, data: product });
});

// @desc      Create product
// @route     POST /rfid-marketplace/api/v1/products
// @access    Private/Admin
exports.createProduct = asyncHandler(async (req, res, next) => {
    const product = await Product.create(req.body);
    res.status(201).json({ success: true, data: product });
});

// @desc      Update product
// @route     PUT /rfid-marketplace/api/v1/products/:id
// @access    Private/Admin
exports.updateProduct = asyncHandler(async (req, res, next) => {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });

    if (!product) {
        return next(new ErrorResponse(`Product not found with id of ${req.params.id}`, 404));
    }

    res.status(200).json({ success: true, data: product });
});

// @desc      Delete product
// @route     DELETE /rfid-marketplace/api/v1/products/:id
// @access    Private/Admin
exports.deleteProduct = asyncHandler(async (req, res, next) => {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, data: {} });
});

// @desc      Upload cover photo for product
// @route     PUT /rfid-marketplace/api/v1/products/:id/cover
// @access    Private/Admin
exports.uploadProductCover = asyncHandler(async (req, res, next) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorResponse(`Product not found with id of ${req.params.id}`, 404));
    }

    if (!req.files) {
        return next(new ErrorResponse(`Please upload a file`, 400));
    }

    const file = req.files.cover;

    // Ensure the image is a photo
    if (!file.mimetype.startsWith('image')) {
        return next(new ErrorResponse(`Please upload an image file`, 400));
    }

    // Check filesize
    if (file.size > process.env.MAX_FILE_UPLOAD) {
        return next(new ErrorResponse(`Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`, 400));
    }

    // Create custom filename
    file.name = `cover_${product._id}${path.parse(file.name).ext}`;

    file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
        if (err) {
            console.error(err);
            return next(new ErrorResponse(`Problem with file upload`, 500));
        }

        await Product.findByIdAndUpdate(req.params.id, {
            cover: file.name,
        });

        res.status(200).json({
            success: true,
            data: file.name,
        });
    });
});
