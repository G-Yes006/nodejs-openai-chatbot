import express from "express";
import bot from "./chatbot.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Start the server
app.listen(3000, () => {
  console.log("Server running on port 3000");
  bot();
});
