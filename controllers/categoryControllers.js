const Category = require("../models/category");

//Create new Category
exports.createCategory = async (req, res) => {
    const {name, image} = req.body;

    try{
        const existing = await Category.findOne({name});
        if(existing) {
            return res.status(400).json({msg: "Category already exists"});
        }

        const newCategory = await Category.create({name, image});
        res.status(201).json(newCategory);
    }
    catch(error) {
        res.status(500).json({msg: "Server error", error});
    }
}

//Get all category
exports.getAllCategories = async (req, res) => {
    try{
        const categories = await Category.find();
        res.status(200).json(categories);
    }
    catch(error) {
        res.status(500).json({msg: "Server Error", error});x
    }
}