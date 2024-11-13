const express = require("express");

const router = express.Router();
const {
    registerUser,
    loginUser,
    updateUser,
    getUser
} = require("../controllers/userController");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.patch("/update", updateUser);
router.get("/id", getUser);


module.exports = router;