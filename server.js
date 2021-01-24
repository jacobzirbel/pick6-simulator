const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 4200;
const apiRoutes = require("./app/routing/apiRoutes");
const htmlRoutes = require("./app/routing/htmlRoutes");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "app/public")));

app.use("/api", apiRoutes);
app.use("/", htmlRoutes);

app.get("*", function (req, res) {
	res.redirect("/home");
});

app.listen(PORT, () => {
	console.log("on " + PORT);
});
