const Video = require("../models/Video")



const createVideo = async(req, res)=>{
    const {videoLink, videoName, videoAlt, imageLink, imageAlt, refCategary} = req.body;
    try {
        const video = await Video.create({videoLink, videoName, videoAlt, imageLink, imageAlt, refCategary})
        res.status(201).json({message:"Video created Successfully", video})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

const getAllVideos = async(req, res)=>{
    try {
        const video = await Video.find();
        res.status(200).json({video})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

const deleteVideo = async(req, res)=>{
    const {id} = req.params;
    try {
        await Video.findByIdAndDelete(id)
        res.status(200).json({message:"video deleted successfully"})
    } catch (error) {
        res.status(500).json({message:error.message})
        
    }
}

module.exports = {createVideo, getAllVideos, deleteVideo}