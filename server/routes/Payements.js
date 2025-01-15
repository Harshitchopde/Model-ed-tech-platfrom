import { Router } from "express";
import { capturePayment, verifySignature } from "../controllers/Payments.js";
const routes = Router();

routes.post("/capturePayments",capturePayment)
routes.post("/verifySignature",verifySignature)
export default routes;