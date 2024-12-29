const express = require("express")
const {createVideo, getAllVideos, deleteVideo} = require("../controllers/videoController")
const authenticate = require("../middlewares/authMiddleware")


const router = express.Router()

router.post("/", authenticate, createVideo)
router.get("/", getAllVideos)
router.delete("/:id", authenticate,deleteVideo)


module.exports = router