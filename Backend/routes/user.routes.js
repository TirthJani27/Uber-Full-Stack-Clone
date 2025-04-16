const express = require("express");
const router = express.Router();
const { validationResult, body } = require("express-validator");
const userController = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invaild Email"),
    body("fullname.firstname")
      .isLength({ min: 3 })
      .withMessage("First name must have 3 characters"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must have 6 characters"),
  ],
  userController.registerUser
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invaild Email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must have 6 characters"),
  ],
  userController.loginUser
);

router.get("/profile", authMiddleware.authUser, userController.getProfile);

router.get("/logout", authMiddleware.authUser, userController.logoutUser);

module.exports = router;
