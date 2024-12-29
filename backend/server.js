const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

const corsOptioins = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionSuccessStatus: 200,
};

const port = 3000;

app.use(cors(corsOptioins));

// Middleware
app.use(bodyParser.json());

// In-memory array to store transactions
const transactions = [];

//Testing the server
app.get("/", (req, res) => {
  res.send("Server is up and running 🚀");
});

// Testing webhook endpoint
app.get("/webhook", (req, res) => {
  res.send("Webhook endpoint is active ✅");
});

// Webhook endpoint to receive transaction data
app.post("/webhook", (req, res) => {
  const txn = req.body; // Capture incoming data

  // Keep the array size to a maximum of 500 entries
  if (transactions.length >= 20) {
    transactions.shift(); // Remove the oldest transaction
  }

  transactions.push(txn); // Add new transaction to the array
  console.log("New transaction received:", txn);
  res.status(200).send("Transaction received");
});

// Route to fetch transactions
app.get("/transactions", (req, res) => {
  return res.status(200).json({
    status: "active",
    data: transactions,
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
