const express = require("express");
const {
  handleBulkPDF,
  handleTransactionPDF,
} = require("../controllers/pdfController");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ data: null, message: "Hello from PDF route", success: true });
});

router.post("/transaction", handleTransactionPDF);
router.post("/bulk", handleBulkPDF);

module.exports = router;
