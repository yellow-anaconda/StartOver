const express = require("express");
const mongoose = require("mongoose");
const nodeMailer = require("nodemailer");
const bodyParser = require("body-parser");
const crypto = require("crypto");

const app = express();
// app.use(bodyParser.json({ limit: '10mb' }));
const port = 8000;
const cors = require("cors");
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const jwt = require("jsonwebtoken");

mongoose
  .connect("mongodb+srv://lulyabdy:Babakiya75@cluster0.r9ytm.mongodb.net/")
  .then(() => {
    console.log("connected to MongoDb");
  })
  .catch((err) => {
    console.log("error connecting to mongodb", err);
  });

app.listen(port, () => {
  console.log("server is running on port 8000");
});

const User = require("./src/models/User");
const Order = require("./src/models/Order");

// function to send verification email to the user

const sendVerificationEmail = async (email, verificationToken) => {
  // create nodemailer transport object
  const transporter = nodeMailer.createTransport({
    // congigure the email service
    service: "gmail",
    auth: {
      user: "lulukaala@gmail.com",
      pass: "sjqarauepnrzyoze",
    },
  });

  // compose the email message
  const mailOptions = {
    from: "Lafemm.com",
    to: email,
    subject: "Email Verification",
    text: `please click on the link to verify your email: http://localhost:8000/verify/${verificationToken}`,
  };
  // send the email
  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log("Error sending verification email", error);
  }
};


// endpoints to register in the app
app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log("Received registration data:", req.body);

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("Email already registered:", email);
      return res.status(400).json({ message: "Email already registered" });
    }

    // Create new User
    const newUser = new User({ name, email, password });

    // Generate and store verification token
    newUser.verificationToken = crypto.randomBytes(20).toString("hex");

    // Save the user to the database
    await newUser.save();

    // Debug statement to verify data
    console.log("New User Registered");

    // Send verification email to the user
    sendVerificationEmail(newUser.email, newUser.verificationToken);

    res.status(201).json({
      message:
        "Registration successful. Please check your email for verification.",
    });

  } catch (error) {
    console.log("Error in registering user:", error);
    res.status(500).json({ message: "Registration failed" });
  }
});


app.get("/verify/:token", async (req, res) => {
  try {
    const token = req.params.token;
    // find the user with the given verification
    const user = await User.findOne({ verificationToken: token });
    if (!user) {
      return res.status(404).json({ message: "Invalid Verification Token" });
    } 
    // mark the verified user
    user.verified = true;
    user.verificationToken = undefined;

    await user.save();

    res.status(200).json({ message: "Email Verified successfully" });
  } catch {
    res.status(500).json({ message: "Email verification failed" });
  }
});

const generateSecretKey = () => {
  const secretKey = crypto.randomBytes(32).toString("hex");

  return secretKey;
};

const secretKey = generateSecretKey();
// const userId = "64e2b32173a2adb8375e0b06"

//endpoint to login the user!
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    //check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    //check if the password is correct
    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid password" });
    }

    //generate a token
    const token = jwt.sign({ userId: user._id  }, secretKey);

    res.status(200).json({ token });

  } catch (error) {
    res.status(500).json({ message: "Login Failed" });
  }
  
});







