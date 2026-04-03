const captainModel = require("../models/captain.model");
const captainService = require("../services/captain.service");
const { validationResult } = require("express-validator");



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