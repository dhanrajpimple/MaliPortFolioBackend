const Review = require("../models/Review")

const createReview = async(req, res)=>{
    const {customerName, message, star, createVideoCategory} = req.body;

    try {
        const review = await Review.create({customerName, star, message, createVideoCategory})
        res.status(201).json({message:"Review created successfully"})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

const getAllReviews = async(req, res)=>{
    try {
        const review = await Review.find();
        res.status(200).json({review})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

const deleteReview = async(req, res)=>{
    const {id} = req.params;
    try{
        await Review.findByIdAndDelete(id)
        res.status(200).json({message:"Review deleted Successfully"})
    }catch(error){
        res.status(500).json({message:error.message})
    }
}

module.exports = {deleteReview, getAllReviews, createReview}