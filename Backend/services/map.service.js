const axios = require("axios");
const captainModel = require("../model/captain.model");
module.exports.getAddress = async (address) => {
  const apikey = process.env.GOOGLE_MAPS_API_KEY;
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
    address
  )}&key=${apikey}`;

  try {
    const response = await axios.get(url);
    if (response.data.status === "OK") {
      const { lat, lng } = response.data.results[0].geometry.location;
      return { ltd: lat, lng };
    } else {
      throw new Error(`Geocoding error: ${response.data.status}`);
    }
  } catch (error) {
    console.error("Error fetching coordinates:", error.message);
    throw error;
  }
};

module.exports.getDistace = async (origin, destination) => {
  if (!origin || !destination) {
    throw new Error("Origin and destination are required");
  }
  const apikey = process.env.GOOGLE_MAPS_API_KEY;
  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(
    origin
  )}&destinations=${encodeURIComponent(destination)}&key=${apikey}`;
  try {
    const response = await axios.get(url);
    if (response.data.status === "OK") {
      const res = response.data.rows[0].elements[0];
      return { res };
    } else {
      throw new Error(`Distance Matrix error: ${response.data.status}`);
    }
  } catch (error) {
    console.error("Error fetching distance:", error.message);
    throw error;
  }
};

module.exports.getSuggestion = async (input) => {
  const apikey = process.env.GOOGLE_MAPS_API_KEY;
  const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
    input
  )}&key=${apikey}`;
  try {
    const response = await axios.get(url);
    if (response.data.status === "OK") {
      return response.data.predictions;
    } else {
      throw new Error(`Suggestion error: ${response.data.status}`);
    }
  } catch (error) {
    console.error("Error fetching suggestion:", error.message);
    throw error;
  }
};

module.exports.getCaptainInTheRadius = async (ltd, lng, radius) => {
  // in km
  const captains = await captainModel.find({
    location: {
      $geoWithin: {
        $centerSphere: [[ltd, lng], radius / 6371],
      },
    },
  });
  return captains;
};
