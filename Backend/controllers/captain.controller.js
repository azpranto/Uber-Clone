const captainModel = require("../models/captain.model");
const captainService = require("../services/captain.service");
const { validationResult } = require("express-validator");
const blacklistTokenModel = require("../models/blacklistToken.model");



module.exports.register = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { fullname, email, password, vehicle } = req.body;

        const isCaptainExists = await captainModel.findOne({ email });

        if (isCaptainExists) {
            return res.status(400).json({ message: "Captain already exists" });
        }

        const hashedPassword = await captainModel.hashPassword(password);

        const captain = await captainService.createCaptain({
            firstname: fullname.firstname,
            lastname: fullname.lastname,
            email,
            password: hashedPassword,
            color: vehicle.color,
            licensePlate: vehicle.licensePlate,
            capacity: vehicle.capacity,
            type: vehicle.type
        });

        const token = await captain.generateAuthToken();

        res.status(201).json({ captain, token });

    } catch (error) {
        console.log(error);
    }
}

module.exports.login = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    const { email, password } = req.body;
    
    const captain = await captainModel.findOne({ email });
    
    if (!captain) {
        return res.status(400).json({ message: "Invalid email or password" });
    }
    
    const isPasswordValid = await captain.comparePassword(password);
    
    if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid email or password" });
    }
    
    const token = await captain.generateAuthToken();

    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 24 * 60 * 60 * 1000
    });
    
    res.json({ captain, token });
}

module.exports.getProfile = async (req, res, next) => {
    res.status(200).json(req.captain);
}

module.exports.logout = async (req, res, next) => {
    res.clearCookie("token");

    const token = req.headers.authorization?.split(" ")[1] || req.cookies.token;
    
    await blacklistTokenModel.create({ token });

    res.json({ message: "Logged out successfully" });
}