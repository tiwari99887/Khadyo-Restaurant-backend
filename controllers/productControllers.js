const { isAbsolute } = require("path");
const Product = require("../models/product");

//Create Product
exports.createProduct = async (req, res) => {
  try {
    const { image, title, description, price, category, isActive } = req.body;

    const newProduct = new Product({
      image,
      title,
      description,
      price,
      category,
      isActive: isActive ?? true,
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: "Failed to create Product" });
  }
};

//Read all product
exports.getAllProducts = async (req, res) => {
  try {
    const { activeOnly } = req.query;

    const filter = activeOnly === "true" ? { isActive: true } : {};
    const products = await Product.find(filter);

    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

// Get products by category
exports.getProductByCategory = async (req, res) => {
  try {
    const { category } = req.params;

    const products = await Product.find({
      category: { $regex: new RegExp(category, "i") },
    });

    if (products.length === 0) {
      return res
        .status(404)
        .json({ msg: "No products found in this category" });
    }

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products by category" });
  }
};

//Update Product
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const updateProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updateProduct) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(updateProduct);
  } catch (error) {
    res.status(500).json({ error: "Failed to update product" });
  }
};

//Delete Product
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const deleteProduct = await Product.findByIdAndDelete(id);

    if (!deleteProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json({ message: "Product deleated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete product" });
  }
};
