import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    condition: {
      type: String,
      required: true,
    },
    usagePeriod: {
      type: String,
      required: true,
    },
    askingPrice: {
      type: String,
      required: true,
    },
    transectionID: {
      type: String,
      required: true,
    },
    keyword: {
      type: String,
      default: "",
    },
    isSold: {
      type: Boolean,
      required: true,
      default: false,
    },
    isApprove: {
      type: Boolean,
      required: true,
      default: false,
    },
    isDiscard: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
