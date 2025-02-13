const express = require("express");
const { createPdf } = require("../controllers/pdfController");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ data: null, message: "Hello from PDF route", success: true });
});

router.post("/", createPdf);

module.exports = router;
