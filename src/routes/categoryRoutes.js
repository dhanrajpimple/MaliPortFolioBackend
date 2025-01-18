const express = require("express")
const {createCategory, getAllCategories, deleteCategory} = require("../controllers/categoryController")
const authenticate = require("../middlewares/authMiddleware")

const router = express.Router()

router.post('/',authenticate, createCategory)
router.get('/', getAllCategories)
router.delete("/:id",authenticate, deleteCategory)


module.exports = router