const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const captainSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [ 3, 'Firstname must be at least 3 characters long' ]
        },
        lastname: {
            type: String, 
            minlength: [ 3, 'Lastname must be at least 3 characters long' ]
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: true,
        minlength: [ 8, 'Password must be at least 8 characters long' ]
    },
    socketId: {
        type: String
    },
    status: {
        type: String,
        enum: ['online', 'offline'],
        default: 'offline'
    },
    vehicle: {
        color: {
            type: String,
            required: true,
            minlength: [ 3, 'Color must be at least 3 characters long' ]
        },
        licensePlate: {
            type: String,
            required: true,
            minlength: [ 3, 'License plate must be at least 3 characters long' ]
        },
        capacity: {
            type: Number,
            required: true,
            min: [ 1, 'Capacity must be at least 1' ]
        },
        type: {
            type: String,
            required: true,
            enum: ['car', 'motorcycle', 'cng']
        },
        location: {
            lat: {
                type: Number
            },
            lng: {
                type: Number
            }
        }
    }
});

captainSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '730h' });
    return token;
};

captainSchema.methods.comparePassword = async function(password) {
    const isMatch = await bcrypt.compare(password, this.password);
    return isMatch;
};

captainSchema.statics.hashPassword = async function(password) {
    return await bcrypt.hash(password, 10);
};

module.exports = mongoose.model('Captain', captainSchema);