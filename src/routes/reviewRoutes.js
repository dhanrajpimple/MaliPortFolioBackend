const express = require("express")
const {createReview, getAllReviews, deleteReview} = require("../controllers/reviewController")
const authenticate = require("../middlewares/authMiddleware")

const router = express.Router()

router.post("/", authenticate, createReview)
router.get("/", getAllReviews)
router.delete("/:id", authenticate,deleteReview)


module.exports = router

