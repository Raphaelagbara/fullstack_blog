const express = require("express");
const router = express.Router();
const {isAuthenticated} = require("../middleware/authMiddleware");
const { signup, signin, logout, userProfile } = require("../controllers/authController");


//routes
// /api/signup
router.post("/signup", signup);
// /api/signin
router.post("/signin", signin);
// /api/logout
router.get("/logout", logout);
// /api/me
router.get("/me", isAuthenticated, userProfile );


module.exports = router;
