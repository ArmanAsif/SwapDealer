import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

// @desc    Create new product
// @route   POST /api/products
// @access  Private
const addNewProduct = asyncHandler(async (req, res) => {
  const {
    name,
    image,
    brand,
    condition,
    usagePeriod,
    askingPrice,
    transectionID,
  } = req.body;

  const product = new Product({
    user: req.user._id,
    name,
    image,
    brand,
    condition,
    usagePeriod,
    askingPrice,
    transectionID,
  });

  const createdProduct = await product.save();

  res.status(201).json(createdProduct);
});

// @desc    Get all products
// @route   GET /api/products
// @access  Public
const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).populate(
    "user",
    "id name email bKash address city postalCode"
  );
  res.json(products);
});

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Private
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id).populate(
    "user",
    "id name email bKash address city postalCode"
  );

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc    Approve by Admin
// @route   PUT /api/products/:id/approve
// @access  Private/Admin
const approveProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    product.keyword = req.body.keyword;

    if (req.body.approve) {
      product.isApprove = true;
      product.isDiscard = false;
    } else {
      product.isApprove = false;
      product.isDiscard = true;
    }

    const updatedProduct = await product.save();

    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc    Update product sold
// @route   PUT /api/products/:id/sold
// @access  Private
const updateProductSold = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    product.isSold = true;
    const updatedProduct = await product.save();

    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

export {
  addNewProduct,
  getAllProducts,
  getProductById,
  approveProduct,
  updateProductSold,
};
