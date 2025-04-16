const userModel = require("../model/user.model");

module.exports.createUser = async (firstname, lastname, password, email) => {
  if (!firstname || !password || !email) {
    throw new Error("All Fields are required");
  }
  const user = await userModel.create({
    fullname: {
      firstname,
      lastname,
    },
    email,
    password,
  });
  return user;
};
