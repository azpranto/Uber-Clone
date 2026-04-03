const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const captainController = require("../controllers/captain.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.post("/register", [
    body("email").isEmail().withMessage("Invalid email"),
    body("fullname.firstname").isLength({ min: 3 }).withMessage("First name must be at least 3 characters long"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"), 
    //vehicle has color, licensePlate, capacity, type, location 
    body("vehicle.color").isLength({ min: 3 }).withMessage("Vehicle color must be at least 3 characters long"),
    body("vehicle.licensePlate").isLength({ min: 3 }).withMessage("Vehicle license plate must be at least 3 characters long"),
    body("vehicle.capacity").isInt({ min: 1 }).withMessage("Vehicle capacity must be at least 1"),
    body("vehicle.type").isIn(['car', 'motorcycle', 'cng']).withMessage("Vehicle type must be car, motorcycle or cng")
],
    captainController.register
);

router.post("/login",[
    body("email").isEmail().withMessage("Invalid email"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long")
],
    captainController.login
);

router.get("/profile", authMiddleware.authCaptain, captainController.getProfile);

router.get("/logout", authMiddleware.authCaptain, captainController.logout);

module.exports = router;