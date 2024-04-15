import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.post("/api/auth/signup", async (req, res) => {
  try {
    const response = await axios.post(
      "https://instagram-express-app.vercel.app/api/auth/signup",
      req.body
    );
    res.json(response.data);
  } catch (error) {
    console.error("Sign Up Error:", error.response.data);
    res.status(error.response.status).json(error.response.data);
  }
});

app.post("/api/auth/login", async (req, res) => {
  try {
    const response = await axios.post(
      "https://instagram-express-app.vercel.app/api/auth/login",
      req.body
    );
    res.json(response.data);
  } catch (error) {
    console.error("Log In Error:", error.response.data);
    res.status(error.response.status).json(error.response.data);
  }
});

app.post("/api/post/upload", async (req, res) => {
  try {
    res.json({ message: "Image uploaded successfully" });
  } catch (error) {
    console.error("Upload Error:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.delete("/api/auth/logout", async (req, res) => {
  try {
    res.json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout Error:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});
