// src/controllers/authController.js
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// ==========================
// User Register
// ==========================
export const register = async (req, res) => {
  try {
    // 1️⃣ Hash password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    // 2️⃣ Create new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
      photo: req.body.photo,
    });

    await newUser.save();

    // 3️⃣ Create JWT token
    const token = jwt.sign(
      { id: newUser._id, role: newUser.role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "15d" }
    );

    // 4️⃣ Remove password from response
    const { password, ...userData } = newUser._doc;

    // 5️⃣ Send response with user & token
    res.status(200).json({
      success: true,
      message: "Successfully created",
      user: userData,
      token,
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Failed to create. Try again!!" });
  }
};

// ==========================
// User Login
// ==========================
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1️⃣ Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found!" });
    }

    // 2️⃣ Check password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: "Incorrect email or password!",
      });
    }

    // 3️⃣ Remove password from response
    const { password: pass, ...userData } = user._doc;

    // 4️⃣ Create JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "15d" }
    );

    // 5️⃣ Send response
    res
      .cookie("accessToken", token, {
        httpOnly: true,
        maxAge: 15 * 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({
        success: true,
        message: "Successfully logged in",
        token,
        data: userData,
      });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Failed to login" });
  }
};
