const userModel = require("../model/user.model");
const captainModel = require("../model/captain.model");
const jwt = require("jsonwebtoken");
const blacklistTokenModel = require("../model/blacklistToken.model");

const extractToken = (req) => {
  const bearerHeader = req.headers.authorization;
  return req.cookies.token || (bearerHeader && bearerHeader.split(" ")[1]);
};

module.exports.authUser = async (req, res, next) => {
  const token = extractToken(req);

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const isBlackListed = await blacklistTokenModel.findOne({ token });
  if (isBlackListed) {
    console.log("Blacklisted Token:", isBlackListed);
    return res.status(401).json({ message: "Unauthorized as Blacklisted" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded._id);

    if (!user) {
      return res.status(401).json({ error: "Unauthorized...." });
    }

    req.user = user;
    next();
  } catch (e) {
    console.log("JWT verification failed:", e);
    return res.status(401).json({ error: "Unauthorized.." });
  }
};

module.exports.authCaptain = async (req, res, next) => {
  const token = extractToken(req);

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const isBlackListed = await blacklistTokenModel.findOne({ token });
  if (isBlackListed) {
    console.log("Blacklisted Token:", isBlackListed);
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const captain = await captainModel.findById(decoded._id);

    if (!captain) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    req.captain = captain;
    next();
  } catch (e) {
    console.log("JWT verification failed:", e);
    return res.status(401).json({ error: "Unauthorized" });
  }
};
