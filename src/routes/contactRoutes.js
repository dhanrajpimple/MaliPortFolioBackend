const express = require("express");
const {createContact, getAllContacts, deleteContact} = require("../controllers/contactController");
const authenticate = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/", createContact)
router.get("/", authenticate, getAllContacts)
router.delete("/:id", authenticate, deleteContact)

module.exports = router
