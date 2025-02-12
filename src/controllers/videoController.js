const Video = require("../models/Video")
const dotenv = require("dotenv")
dotenv.config()


const createVideo = async (req, res) => {
    const { videoLink, videoName, videoAlt } = req.body;

    try {
        // Extract YouTube Video ID from the URL
        const videoId = extractYouTubeID(videoLink);
        if (!videoId) {
            return res.status(400).json({ message: "Invalid YouTube video link" });
        }

        // Generate the YouTube Thumbnail URL
        const imageLink = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

        // Create and store the video with the thumbnail link
        const video = await Video.create({ videoLink, videoName, videoAlt, imageLink });

        const supabaseResponse = await fetch('https://gcdbzczwturdhvfgoowm.supabase.co/rest/v1/rpc/addvideo', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'apikey': process.env.SUPABASE_API , // Replace with your Supabase API key
                'Authorization': `Bearer ${process.env.SUPABASE_API}` 
            },
            body: JSON.stringify({
                _id: video._id.toString(),  // Store MongoDB ID in Supabase
                imagelink: imageLink,
                videoalt: videoAlt,
                videolink: videoLink,
                videoname: videoName
            })
        });

        const supabaseResult = await supabaseResponse.json();

        if (!supabaseResponse.ok) {
            throw new Error(supabaseResult.message || "Failed to store in Supabase");
        }


        res.status(201).json({ message: "Video created successfully", video });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Function to extract YouTube video ID from different possible URL formats
const extractYouTubeID = (url) => {
    const regex = /(?:youtube\.com\/(?:[^\/]+\/[^\/]+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
};


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

    const {id} = req.params;
    try {
        await Video.findByIdAndDelete(id)
         
        const supabaseResponse = await fetch('https://gcdbzczwturdhvfgoowm.supabase.co/rest/v1/rpc/deletevideobyid', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'apikey': process.env.SUPABASE_API, // Replace with your Supabase API key
                'Authorization':`Bearer ${process.env.SUPABASE_API}` // Replace with your Supabase Bearer token
            },
            body: JSON.stringify({ _input_id: id })
        });


        res.status(200).json({message:"video deleted successfully"})
    } catch (error) {
        res.status(500).json({message:error.message})
        
    }
}

module.exports = {createVideo, getAllVideos, deleteVideo}