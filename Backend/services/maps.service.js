const axios = require('axios');

module.exports.getAddressCoordinates = async (address) => {
  try {
    if (!address) {
      throw new Error('Address is required');
    }

    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
      throw new Error('Google Maps API key is not configured');
    }

    const url = `https://maps.googleapis.com/maps/api/geocode/json`;
    
    const response = await axios.get(url, {
      params: {
        address: address,
        key: apiKey
      }
    });

    if (response.data.status !== 'OK') {
      throw new Error(`Geocoding failed: ${response.data.status} - ${response.data.error_message || 'No error message provided'}`);
    }

    if (!response.data.results || response.data.results.length === 0) {
      throw new Error('No results found for the given address');
    }

    const location = response.data.results[0].geometry.location;
    
    return {
      lat: location.lat,
      lng: location.lng
    };

  } catch (error) {
    if (error.response) {
      throw new Error(`Google Maps API error: ${error.response.data.error_message || error.response.statusText}`);
    } else if (error.request) {
      throw new Error('Network error: Unable to reach Google Maps API');
    } else {
      throw error;
    }
  }
};

module.exports.getDistanceTime = async (origin, destination) => {
  try {
    if (!origin || !destination) {
      throw new Error('Origin and destination are required');
    }

    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
      throw new Error('Google Maps API key is not configured');
    }

    const url = `https://maps.googleapis.com/maps/api/distancematrix/json`;
    
    const response = await axios.get(url, {
      params: {
        origins: origin,
        destinations: destination,
        key: apiKey
      }
    });

    if (response.data.status !== 'OK') {
      throw new Error(`Distance Matrix API error: ${response.data.status} - ${response.data.error_message || 'No error message provided'}`);
    }

    if (!response.data.rows || response.data.rows.length === 0) {
      throw new Error('No results found for the given origin and destination');
    }

    const element = response.data.rows[0].elements[0];
    
    if (element.status !== 'OK') {
      throw new Error(`Distance Matrix API error: ${element.status}`);
    }

    return {
      distance: element.distance.text,
      distanceValue: element.distance.value,
      duration: element.duration.text,
      durationValue: element.duration.value
    };

  } catch (error) {
    if (error.response) {
      throw new Error(`Google Maps API error: ${error.response.data.error_message || error.response.statusText}`);
    } else if (error.request) {
      throw new Error('Network error: Unable to reach Google Maps API');
    } else {
      throw error;
    }
  }
};
