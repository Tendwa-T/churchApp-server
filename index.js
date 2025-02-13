const express = require("express");
require("dotenv").config();
const cors = require("cors");

const app = express();
const pdfRoute = require("./routes/pdfRoute");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("API Online");
});
app.use("/api/v1/pdf", pdfRoute);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
