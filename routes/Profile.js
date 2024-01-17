const express = require("express");
const { updateDisplayPicture } = require("../controllers/Profile");
const { verifyAuth } = require("../middlewares/auth");

const routes = express.Router();
// updateDisplayPicture
routes.put("/updateDisplayPicture",verifyAuth,updateDisplayPicture)
module.exports = routes;