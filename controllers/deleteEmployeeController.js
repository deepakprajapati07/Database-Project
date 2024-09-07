// deleteEmployeeController.js

const db = require("../dbConfig");

async function deleteEmployee(req, res) {
  try {
    const { employee_ID } = req.body;

    // First make a query to check if the employee exists in the database
    db.query(
      "SELECT employee_ID FROM employee_details WHERE employee_ID = ?",
      [employee_ID],
      (err, results) => {
        if (err) {
          // console.error("Error deleting employee:", err);
          res.status(500).send("Internal Server Error");
        } else if (results.length > 0) {
          // If the employee exists, delete the employee
          deleteEmployee(employee_ID);
        } else {
          console.error("Error: Employee not found");
          res.status(404).send("Employee not found");
        }
      }
    );

    // Function to delete the employee
    const deleteEmployee = (employee_ID) => {
      // Assuming you have a table named 'employee_details'
      const sql = `
          DELETE FROM employee_details
          WHERE employee_ID = ?
        `;

      db.query(sql, [employee_ID], (err, results) => {
        if (err) {
          console.error("Error deleting employee:", err);
          res.status(500).send("Internal Server Error");
        } else {
          // console.log("Employee deleted with ID:", employee_ID);
          res.send(`Employee deleted with ID: ${employee_ID}`);
        }
      });
    };
  } catch (error) {
    console.error("Error deleting employee:", error);
    res.status(500).send("Internal Server Error");
  }
}

module.exports = deleteEmployee;
