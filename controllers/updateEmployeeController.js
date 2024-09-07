// updateEmployeeController.js

const db = require("../dbConfig");

async function updateEmployee(req, res) {
  try {
    let conditions = [];
    let dataObj = req.body;
    // console.log("DataObj: " + dataObj);
    const employee_ID = dataObj.employee_ID;

    // console.log("Employee ID: " + employee_ID);

    // First make a query to check if the employee exists in the database with the given ID

    db.query(
      "SELECT employee_ID FROM employee_details WHERE employee_ID = ?",
      [employee_ID],
      (err, results) => {
        if (err) {
          // console.error("Error updating employee:", err);
          res.status(500).send("Internal Server Error");
        } else if (results.length > 0) {
          // If the employee exists, update the employee
          updateEmployee();
        } else {
          console.error("Error: Employee not found");
          res.status(404).send("Employee not found");
        }
      }
    );

    // Function to update the employee
    const updateEmployee = () => {
      let Query1 = "UPDATE employee_details SET ";
      let Query3 = ` WHERE employee_ID = ${employee_ID}`;

      for (let key in dataObj) {
        if (key === "employee_ID") {
          continue;
        }

        let value = dataObj[key];
        // Check the data type of the value
        if (value) {
          if (key === "salary" || key == "phone") {
            conditions.push(`${key} = ${value}`);
          } else {
            conditions.push(`${key} = '${value}'`);
          }
        }
      }

      let conditionString = conditions.join(" , ");
      const sqlQuery = Query1 + conditionString + Query3;
      // console.log(conditions);
      // console.log(conditionString);
      // console.log(sqlQuery);

      db.query(sqlQuery, (err, results) => {
        if (err) {
          console.error("Error updating employee:", err);
          res.status(500).send("Internal Server Error");
        } else {
          // console.log("Employee updated with ID:", employee_ID);
          res.send(`Employee updated with ID: ${employee_ID}`);
        }
      });
    };
  } catch (error) {
    console.error("Error updating employee:", error);
    res.status(500).send("Internal Server Error");
  }
}

module.exports = updateEmployee;
