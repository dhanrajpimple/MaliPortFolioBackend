const Review = require("../models/Review")
const dotenv = require("dotenv")
dotenv.config()
const createReview = async (req, res) => {
    const { customerName, message, star, imageUrl, imagePublicId } = req.body;

    try {
        // Create review in MongoDB
        const review = await Review.create({ customerName, star, message, imageUrl, imagePublicId });

        // Prepare data for Supabase
        const supabaseData = {
            "_id": review._id.toString(), // Convert MongoDB ObjectId to string
            "customername": customerName,
            "imagepublicid": imagePublicId,
            "imageurl": imageUrl,
            "message": message,
            "star": star
        };

        // Send data to Supabase
        const supabaseResponse = await fetch('https://gcdbzczwturdhvfgoowm.supabase.co/rest/v1/rpc/createdata', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'apikey': process.env.SUPABASE_API , // Replace with your Supabase API key
                'Authorization': `Bearer ${process.env.SUPABASE_API}` // Replace with your Supabase Bearer token
            },
            body: JSON.stringify(supabaseData)
        });

        const supabaseResult = await supabaseResponse.json();
     
        if (!supabaseResponse) {
            throw new Error(supabaseResult.message || "Failed to sync with Supabase");
        }

        res.status(201).json({ message: "Review created successfully and synced with Supabase" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

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

        const supabaseResponse = await fetch('https://gcdbzczwturdhvfgoowm.supabase.co/rest/v1/rpc/deletedataby_id', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'apikey': process.env.SUPABASE_API, // Replace with your Supabase API key
                'Authorization':`Bearer ${process.env.SUPABASE_API}` // Replace with your Supabase Bearer token
            },
            body: JSON.stringify({ _input_id: id })
        });


        res.status(200).json({message:"Review deleted Successfully"})
    }catch(error){
        res.status(500).json({message:error.message})
    }
}

module.exports = {deleteReview, getAllReviews, createReview}