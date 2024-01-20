const express = require("express");
const { capturePayment, verifySignature } = require("../controllers/Payments");
const routes = express.Router();

routes.post("/capturePayments",capturePayment)
routes.post("/verifySignature",verifySignature)
module.exports = routes;