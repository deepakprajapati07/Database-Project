// routes.js

const express = require("express");
const path = require("path");
const router = express.Router();

// Creating routes to render the html pages

// Define routes
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

router.get("/add", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "add.html"));
});

router.get("/update", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "update.html"));
});

router.get("/delete", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "delete.html"));
});

router.get("/search", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "search.html"));
});

module.exports = router;
