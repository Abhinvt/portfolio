const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config({ path: "./userdet.env" });

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.post("/contact", async (req, res) => {
  const { firstName, lastName, email, phone, message } = req.body;

  try {
    // Create transporter
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // your Gmail address
        pass: process.env.EMAIL_PASS, // your Gmail App Password
      },
    });

    // Email content
    let mailOptions = {
      from: email,
      to: process.env.EMAIL_USER, // where you want to receive messages
      subject: "New Contact Form Submission",
      text: `
        📩 You received a new message from your website contact form:

        Name: ${firstName} ${lastName}
        Email: ${email}
        Phone: ${phone}
        Message: ${message}
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.json({ code: 200, message: "Email sent successfully ✅" });
  } catch (error) {
    console.error("❌ Error sending email:", error);
    res.json({ code: 500, message: "Error sending email. Try again later." });
  }
});
const path = require("path");

// Serve React build folder
app.use(express.static(path.join(__dirname, "build")));

// Handle React routing, return index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
