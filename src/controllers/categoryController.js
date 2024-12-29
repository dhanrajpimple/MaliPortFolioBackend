const Category = require("../models/Category")

const createCategory = async(req, res)=>{
    const {categoryName} = req.body;
    try {
        const category = await Category.create({CategoryName})
        res.status(201).json({message:"Category created successfully ", category})
    } catch (error) {
        res.status(500).json({message:error.message})
    }

}

const getAllCategories = async(req, res)=>{
    try {
        const category = await Category.find();
        res.status(200).json({category})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

const deleteCategory = async(req, res)=>{
    const {id} = req.params;
    try {
        await Category.findByIdAndDelete(id)
        res.status(200).json({message:"Category deleted Successfully"})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}





module.exports = {createCategory, getAllCategories, deleteCategory}