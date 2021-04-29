import express from "express";
const router = express.Router();
import {
  addNewProduct,
  approveProduct,
  getAllProducts,
  getProductById,
  updateProductSold,
} from "../controllers/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").post(protect, addNewProduct).get(protect, getAllProducts);
router.route("/:id").get(protect, getProductById);
router.route("/:id/sold").put(protect, updateProductSold);
router.route("/:id/approve").put(protect, admin, approveProduct);

export default router;


