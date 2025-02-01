const Video = require("../models/Video")



const createVideo = async(req, res)=>{
    const {videoLink, videoName, videoAlt, imageLink, imageAlt, Category} = req.body;
    try {
        const video = await Video.create({videoLink, videoName, videoAlt, imageLink, imageAlt, Category})
        res.status(201).json({message:"Video created Successfully", video})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

const getAllVideos = async (req, res) => {
    try {
      const videos = await Video.find();

      res.status(200).json({ videos });
    } catch (error) {
      console.error("Error fetching videos:", error);
      res.status(500).json({ message: error.message });
    }
  };

const deleteVideo = async(req, res)=>{
    console.log(req)
    const {id} = req.params;
    try {
        await Video.findByIdAndDelete(id)
        res.status(200).json({message:"video deleted successfully"})
    } catch (error) {
        res.status(500).json({message:error.message})
        
    }
}

module.exports = {createVideo, getAllVideos, deleteVideo}