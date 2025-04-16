const captainModel = require("../model/captain.model");

module.exports.createCaptain = async (
  firstname,
  lastname,
  password,
  email,
  color,
  type,
  plate,
  capacity
) => {
  if (
    !firstname ||
    !password ||
    !email ||
    !type ||
    !color ||
    !capacity ||
    !plate
  ) {
    console.log(
      firstname,
      lastname,
      password,
      email,
      color,
      type,
      plate,
      capacity
    );
    throw new Error("All Fields are required");
  }
  const captain = await captainModel.create({
    fullname: {
      firstname,
      lastname,
    },
    email,
    password,
    vehicle: {
      capacity,
      color,
      plate,
      type,
    },
  });
  return captain;
};
