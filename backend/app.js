const express = require('express');
const path = require('path');
const db = require('./db/dbConfig');
const cors = require('cors');

const app = express();

app.use(express.json());

app.use(cors());

app.use(
  "/uploads/documents",
  express.static(path.join(__dirname, "uploads/documents"))
);

// Auth Route
const authRoute = require('./route/authRoute');
app.use("/api", authRoute);

// Application Route
const applicationRoute = require('./route/applicationRoute');
app.use("/api", applicationRoute);

// Program Route
const programRoute = require('./route/programRoute');
app.use("/api", programRoute);

// Document Route
const documentRoute = require("./route/documentRoute");
app.use("/api/documents", documentRoute);

// Payment Route
const paymentRoute = require("./route/paymentRoute");
app.use("/api/payments", paymentRoute);

// Comment Route
const commentRoute = require("./route/commentRoute");
app.use("/api", commentRoute);

// Student Route
const studentRoute = require('./route/studentRoute');
app.use("/api", studentRoute);

// Student Dashboard Route
const dashboardRoute = require('./route/dashboardRoute');
app.use("/api", dashboardRoute);

// Registrar Dashboard Route
const registerDshRoute = require('./route/registerDshRoute');
app.use('/api', registerDshRoute);

// Report Route
const reportRoute = require('./route/reportRoute');
app.use('/api/reports', reportRoute);

// Dean Dashboard Route
const deanRoute = require('./route/deanRoute');
app.use('/api/dean', deanRoute);

module.exports = app;