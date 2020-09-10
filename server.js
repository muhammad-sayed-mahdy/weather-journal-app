// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require("express");
// Start up an instance of app
const app = express();

/* Dependencies */
/* Middleware*/

//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

// Spin up the server
// Callback to debug
const port = 8000;
app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});

// Initialize "/all" route with a callback function
app.get("/all", (req, res) => {
	res.send(projectData);
});

// Post Route
app.post("/data", (req, res) => {
	projectData = {
		temperature: req.body.temperature,
		date: req.body.date,
		user_response: req.body.user_response
	};
	res.send({"message": "data updated successfully"});
});