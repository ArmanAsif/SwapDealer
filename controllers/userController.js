import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import User from "../models/userModel.js";

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      mobile: user.mobile,
      bKash: user.bKash,
      address: user.address,
      city: user.city,
      postalCode: user.postalCode,
      feedback: user.feedback,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    mobile,
    bKash,
    address,
    city,
    postalCode,
    password,
  } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    mobile,
    bKash,
    address,
    city,
    postalCode,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      mobile: user.mobile,
      bKash: user.bKash,
      address: user.address,
      city: user.city,
      postalCode: user.postalCode,
      feedback: user.feedback,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});


// @desc    Get all users reviews
// @route   GET /api/users/reviews
// @access  Private
const getUsersReview = asyncHandler(async (req, res) => {
  const users = await User.find({});

  const myUsers = new Array();
  users.map((user, index) =>
    myUsers.push({
      index,
      name: user.name,
      feedback: user.feedback,
    })
  );

  res.json(myUsers);
});

// @desc    Add feedback
// @route   PUT /api/users/:id/feedback
// @access  Private
const addFeedback = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    user.feedback = req.body.feedback;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).select("-password");

  res.json(users);
});


export {
  authUser,
  registerUser,
  getUsersReview,
  addFeedback,
  getAllUsers,
};
