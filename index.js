/* Server File (index.js) */

// Importing the required modules
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

// Importing the controllers
const addEmployeeController = require("./controllers/addEmployeeController");
const updateEmployeeController = require("./controllers/updateEmployeeController");
const deleteEmployeeController = require("./controllers/deleteEmployeeController");
const searchEmployeeController = require("./controllers/searchEmployeeController");

// Creating an express app
const app = express();
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
const port = 3000;

// Import the database configuration module
const db = require("./dbConfig");

// Import the routes module
const routes = require("./routes");

// Route to get counts
app.get("/getCounts", (req, res) => {
  // Fetch counts from the database
  const query = `
      SELECT
          (SELECT COUNT(*) FROM employee_details) AS employeeCount,
          (SELECT COUNT(*) FROM department_details) AS departmentCount,
          (SELECT COUNT(*) FROM project_details) AS projectCount;
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching counts:", err);
      res.status(500).send("Internal Server Error");
    } else {
      const counts = results[0];
      res.json(counts);
    }
  });
});

// CRUD Operations

// Add a new employee to the database
app.post("/addEmployee", addEmployeeController);

// Update an existing employee in the database
app.post("/updateEmployee", updateEmployeeController);

// Delete an existing employee from the database
app.post("/deleteEmployee", deleteEmployeeController);

// Search for an employee
app.post("/searchEmployee", searchEmployeeController);

// Listening to the port
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
