// searchEmployeeController.js

const db = require("../dbConfig");

async function searchEmployee(req, res) {
  try {
    let conditions = [];
    let sqlQuery = "SELECT * FROM employee_details WHERE ";

    let dataObj = req.body;

    for (let key in dataObj) {
      let value = dataObj[key];
      // Check the data type of the value
      if (value) {
        if (key === "employee_ID" || key == "phone") {
          conditions.push(`${key} = ${value}`);
        } else if (key === "salary") {
          if (value === "1") {
            conditions.push(`${key} <= 50000`);
          } else if (value === "2") {
            conditions.push(`${key} > 50000 AND ${key} <= 75000`);
          } else if (value === "3") {
            conditions.push(`${key} > 75000 AND ${key} <= 100000`);
          } else if (value === "4") {
            conditions.push(`${key} > 100000`);
          }
        } else if (key === "fName") {
          conditions.push(`${key} LIKE '%${value}%'`);
        } else {
          conditions.push(`${key} = '${value}'`);
        }
      }
    }

    let conditionString = conditions.join(" AND ");
    sqlQuery += conditionString;

    // console.log("SQL Query:", sqlQuery);

    db.query(sqlQuery, (err, results) => {
      if (err) {
        console.error("Employee Not Found : ", err);
        res.status(500).send("Internal Server Error");
      } else {
        if (results.length > 0) {
          res.json(results);
        } else {
          console.error("Error: Employee not found");
          res.status(404).send("Employee not found");
        }
      }
    });
  } catch (error) {
    console.error("Employee Not Found:", error);
    res.status(500).send("Internal Server Error");
  }
}

module.exports = searchEmployee;
