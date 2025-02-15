const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { default: chalk } = require("chalk");

const app = express();
app.use((req, res, next) => {
  const method = req.method;
  const url = req.url;
  const clientIp = req.ip;

  // Temporarily capture response status before sending
  const start = Date.now();
  res.on("finish", () => {
    const duration = Date.now() - start;
    const status = res.statusCode;

    // Color the method based on type
    const methodColor =
      method === "GET"
        ? chalk.green
        : method === "POST"
        ? chalk.blue
        : chalk.yellow;

    // Color status codes
    const statusColor =
      status >= 500
        ? chalk.red.bold
        : status >= 400
        ? chalk.yellow.bold
        : status >= 300
        ? chalk.cyan
        : chalk.green;

    console.log(
      `${chalk.gray(`[${new Date().toISOString()}]`)}  ${methodColor(
        method
      )}  ${chalk.magenta(url)}  ${statusColor(status)}   ${chalk.gray(
        `${duration}ms`
      )} ${chalk.gray(clientIp)}`
    );
  });

  next();
});

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
