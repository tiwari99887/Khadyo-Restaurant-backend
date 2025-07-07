const express = require("express");
const router = express.Router();
const {contactResturant} = require("../controllers/contactController");

router.post("/contact", contactResturant);

module.exports = router;