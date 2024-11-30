import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
export const signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    //only execute below code completed
    await newUser.save();
    res.status(201).json("User created Successfully!");
  } catch (error) {
    next(error);
  }

  //202-succes
  //500-server error
  //400-user error
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const validUser = await User.findOne({ email: email });
    if (!validUser) return next(errorHandler(404, "User not found!"));

    // Compare passwords
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "Wrong credentials!"));

    // Generate JWT token
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h", // Optional: Add expiration time for security
    });

    // Exclude password from the response
    const { password: pass, ...rest } = validUser.toObject();

    // Send the token as an HTTP-only cookie and respond with user data
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};
