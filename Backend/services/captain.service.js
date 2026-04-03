const captainModel = require("../models/captain.model");



module.exports.createCaptain = async ({
    firstname, lastname, email, password, color, licensePlate, capacity, type
}) => {
    if (!firstname || !email || !password || !color || !licensePlate || !capacity || !type) {
        throw new Error('All fields are required');
    }
    const captain = await captainModel.create({
        fullname: {
            firstname,
            lastname
        },
        email,
        password,
        vehicle: {
            color,
            licensePlate,
            capacity,
            type
        }
    });
    return captain;
}