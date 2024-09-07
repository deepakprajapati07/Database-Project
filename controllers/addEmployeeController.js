// addEmployeeController.js

const db = require("../dbConfig");

async function generateUniqueEmployeeID() {
  const currentYear = new Date().getFullYear().toString();
  let randonNum = Math.floor(100000 + Math.random() * 900000);
  const randomDigits = randonNum.toString();

  const employee_ID = currentYear + randomDigits;

  // Check if the generated ID is unique in the database
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT employee_id FROM employee_details WHERE employee_id = ?",
      [employee_ID],
      (err, results) => {
        if (err) {
          reject(err);
        } else if (results.length > 0) {
          // If not unique, recursively call the function to generate a new ID
          resolve(generateUniqueEmployeeID());
        } else {
          resolve(employee_ID);
        }
      }
    );
  });
}

async function addEmployee(req, res) {
  try {
    let dataObj = req.body;
    // console.log(dataObj);

    const employee_ID = await generateUniqueEmployeeID();

    let Query1 = "INSERT INTO employee_details (employee_ID";
    let Query2 = `Values ( ${employee_ID}`;

    for (let key in dataObj) {
      let value = dataObj[key];
      // Check the data type of the value
      if (value) {
        Query1 += `, ${key}`;

        if (key === "salary" || key == "phone") {
          Query2 += `, ${value}`;
        } else {
          Query2 += `, "${value}"`;
        }
      }
    }

    Query1 += ")";
    Query2 += ")";

    const sqlQuery = Query1 + Query2;
    // console.log(sqlQuery);

    db.query(sqlQuery, (err, results) => {
      if (err) {
        console.error("Error inserting employee:", err);
        res.status(500).send("Internal Server Error");
      } else {
        // console.log("Employee added with ID:", employee_ID);
        res.send(`Employee added with ID: ${employee_ID}`);
      }
    });
  } catch (error) {
    console.error("Error adding employee:", error);
    res.status(500).send("Internal Server Error");
  }
}

module.exports = addEmployee;
