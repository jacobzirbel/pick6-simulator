const express = require("express");
const path = require("path");

const router = express.Router();

router.route("/home").get((req, res) => {
	res.sendFile(path.join(__dirname, "../../app/public/home.html"));
});

router.route("/survey").get((req, res) => {
	res.sendFile(path.join(__dirname, "../../app/public/survey.html"));
});
module.exports = router;
