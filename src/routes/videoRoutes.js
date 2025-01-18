const express = require("express")
const {createVideo, getAllVideos, deleteVideo} = require("../controllers/videoController")
const authMiddleware = require("../middlewares/authMiddleware")

const router = express.Router()

router.post("/", authMiddleware,createVideo)
router.get("/",getAllVideos)
router.delete("/:id",authMiddleware,  deleteVideo)


module.exports = router