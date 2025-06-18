const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Student = require("../Models/Student");

const app = express();
app.use(express.json());

const JWT_SECRET = "your_secret_key"; // In production, use env variables

// Student Signup API
app.post("/signup", async (req, res) => {
  try {
    const {
      name,
      fatherName,
      DOB,
      branch,
      rollNo,
      section,
      address,
      mobileNo,
      password,
    } = req.body;

    const existingStudent = await Student.findOne({ rollNo });
    if (existingStudent) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const student = new Student({
      name,
      fatherName,
      DOB,
      branch,
      rollNo,
      section,
      address,
      mobileNo,
      password: hashedPassword,
    });

    await student.save();

    res.status(201).json({ message: "Registration completed" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Signup failed" });
  }
});

// Student Signin API
app.post("/signin", async (req, res) => {
  try {
    const { rollNo, password } = req.body;

    const student = await Student.findOne({ rollNo,password });
    if (!student) {
      return res.status(400).json({ message: "Invalid roll number or password" });
    }

    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid roll number or password" });
    }

    const token = jwt.sign({ id: student._id, rollNo: student.rollNo }, JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({ message: "Login successful", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Signin failed" });
  }
});

// Middleware to verify token
function verifyToken(req, res, next) {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).json({ message: "Access Denied. No Token Provided." });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.student = decoded;
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid Token" });
  }
}

// Get specific student details (protected)
app.post("/details", verifyToken, async (req, res) => {
  try {
    const { rollNo } = req.body;
    const user = await Student.findOne({ rollNo });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving details" });
  }
});

// Get all students (protected)
app.get("/details", verifyToken, async (req, res) => {
  try {
    const users = await Student.find();
    if (!users) return res.status(404).json({ message: "No users found" });
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error retrieving users" });
  }
});

module.exports = app;
