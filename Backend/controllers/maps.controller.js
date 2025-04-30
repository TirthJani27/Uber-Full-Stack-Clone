const mapService = require("../services/map.service");
const { validationResult } = require("express-validator");

module.exports.getCoordinates = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty) {
    res.status(404).json({ errors: errors.array() });
  }
  const { address } = req.query;
  try {
    const coordinates = await mapService.getAddress(address);
    res.status(200).json(coordinates);
  } catch (e) {
    res.status(404).json({ error: "Coordinates not found" });
  }
};

module.exports.getDistanceTime = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty) {
    res.status(404).json({ errors: errors.array() });
  }
  const { origin, destination } = req.query;
  try {
    const distanceTime = await mapService.getDistace(origin, destination);
    res.status(200).json(distanceTime);
  } catch (e) {
    res.status(404).json({ error: "Distance not found" });
  }
};

module.exports.getSuggestion = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty) {
    res.status(404).json({ errors: errors.array() });
  }
  const { input } = req.query;
  if (input.length < 3) {
    return res
      .status(400)
      .json({ error: "Input must be at least 3 characters long" });
  }
  try {
    const suggestion = await mapService.getSuggestion(input);
    res.status(200).json(suggestion);
  } catch (e) {
    res.status(404).json({ error: "Suggestion not found" });
  }
};
