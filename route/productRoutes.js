const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");

const {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  getProductByCategory,
} = require("../controllers/productControllers");

router.post("/", verifyToken, createProduct);
router.get("/", getAllProducts);
router.get("/category/:category", getProductByCategory)
router.put("/:id", verifyToken, updateProduct);
router.delete("/:id", verifyToken, deleteProduct);

module.exports = router;
