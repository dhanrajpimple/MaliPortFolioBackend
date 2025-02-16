const express = require("express")
const {createReview, getAllReviews, deleteReview} = require("../controllers/reviewController")
const authenticate = require("../middlewares/authMiddleware")
const multer = require("multer");
const { storage } = require("../config/cloudinary");
const router = express.Router()

const upload = multer({ storage });


router.post("/",authenticate, upload.single("image"), createReview)
router.get("/", getAllReviews)
router.delete("/:id", authenticate, deleteReview)


module.exports = router

