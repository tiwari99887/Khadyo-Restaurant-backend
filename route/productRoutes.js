const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");

const {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  getProductsByCategory,
} = require("../controllers/productControllers");

router.post("/", verifyToken, createProduct);
router.get("/", getAllProducts);
router.get("/category/:categoryId", getProductsByCategory)
router.put("/:id", verifyToken, updateProduct);
router.delete("/:id", verifyToken, deleteProduct);

module.exports = router;
