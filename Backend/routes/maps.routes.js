const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const mapController = require('../controllers/maps.controller');
const { query } = require('express-validator');

router.get('/getcoordinates', authMiddleware, 
  query('address').notEmpty().withMessage('Address is required'), 
  mapController.getCoordinates);

router.get('/getdistancetime', authMiddleware, 
  query('origin').notEmpty().withMessage('Origin is required'), 
  query('destination').notEmpty().withMessage('Destination is required'), 
  mapController.getDistanceTime);


module.exports = router;