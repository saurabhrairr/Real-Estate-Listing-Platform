const express = require("express");
const routers = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/userschema");

routers.get("/", (req, res) => {
  res.send("<h1>this was user page</h1>");
});

routers.post("/Register", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the username already exists in the database
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ msg: "Username already exists" });
    }

    // Hash the password
    const hashPassword = await bcrypt.hash(password, 10);

    // Create a new user instance
    const newUser = new User({ username, password: hashPassword });

    // Save the user to the database
    await newUser.save();

    res.status(200).send(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
});



routers.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ error: "Invalid password" });
    }

    const token = jwt.sign({ userId: user.id }, process.env.Secure_Key, {
      expiresIn: "1h"
    });

    res.json({ token });
  } catch (error) {
    console.error("Login failed:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


module.exports = routers;
