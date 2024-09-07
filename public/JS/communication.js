// Intercept the form submission

$(document).ready(function () {
  // Add Employee
  $("#addBtn").click(function () {
    var addForm = $("#addForm")[0];
    var addFormInput = document.getElementById("addForm");
    var employeeID = document.getElementById("employeeID");

    if (addForm.checkValidity()) {
      // Serialize form data
      var formData = $("#addForm").serialize();
      // console.log(formData); // Add this line to inspect form data

      // Send the form data to the server using jQuery.ajax
      $.ajax({
        type: "POST",
        url: "/addEmployee",
        data: formData,
        success: function (response) {
          // console.log(response);
          // alert(response);
          employeeID.innerHTML = response;
          addFormInput.reset();
          // You can redirect the user to another page or update the DOM as needed
        },
        error: function (error) {
          addFormInput.reset();
          console.error("Error adding employee:", error);
          alert("Error adding employee. Please try again.");
        },
      });
    } else {
      // If the form is not valid, show the validation message
      addForm.reportValidity();
    }
  });

  // Search Employee
  $("#searchBtn").click(function () {
    // Get values from input fields
    // Serialize form data
    var formData = $("#searchForm").serialize();
    var searchFormInput = document.getElementById("searchForm");
    var resultsCount = document.getElementById("resultsCount");
    // console.log(formData); // Add this line to inspect form data

    let pairs = formData.split("&");
    let values = [];

    // console.log("Pairs: " + pairs);

    // Iterate over each pair
    for (var i = 0; i < pairs.length; i++) {
      let pair = pairs[i].split("=");
      let value = pair[1];

      if (value) {
        values.push(value);
      }
    }

    let length = values.length;
    // console.log("Values: " + values);
    // console.log("Length: " + length);

    if (length > 0) {
      // Send the form data to the server using jQuery.ajax
      $.ajax({
        type: "POST",
        url: "/searchEmployee",
        data: formData,
        success: function (results) {
          // console.log(results);
          // Display search results in the DOM
          resultsCount.innerHTML = "Total records found: " + results.length;
          displaySearchResults(results);
          searchFormInput.reset();
        },
        error: function (error) {
          searchFormInput.reset();
          // console.error("Error searching employees:", error);
          alert("Employee Not found.");
        },
      });
    } else {
      // alert("Please enter at least one search criteria.");
    }
  });

  // Update Employee
  $("#updateBtn").click(function () {
    // Get the form element
    var updateForm = $("#updateForm")[0];
    var updateFormInput = document.getElementById("updateForm");
    var employeeID = document.getElementById("employeeID");

    // Check form validity
    if (updateForm.checkValidity()) {
      // Serialize form data
      var formData = $("#updateForm").serialize();
      // console.log(formData); // Add this line to inspect form data

      // Send the form data to the server using jQuery.ajax
      $.ajax({
        type: "POST",
        url: "/updateEmployee", // Remove :id from the URL
        data: formData,
        success: function (response) {
          // console.log(response);
          employeeID.innerHTML = response;
          updateFormInput.reset();
          // alert("Employee updated successfully!");
          // You can redirect the user to another page or update the DOM as needed
        },
        error: function (error) {
          updateFormInput.reset();
          console.error("Error updating employee:", error);
          employeeID.innerHTML =
            "Employee does not exist with the given ID: " +
            formData.match(/employee_ID=(\d+)/)[1];
          // alert("Error updating employee. Please try again.");
        },
      });
    } else {
      // If the form is not valid, show the validation message
      updateForm.reportValidity();
    }
  });

  // Delete Employee
  $("#deleteBtn").click(function () {
    // Serialize form data
    var formData = $("#deleteForm").serialize();
    var deleteFormInput = document.getElementById("deleteForm");
    var employeeID = document.getElementById("employeeID");

    // Send the form data to the server using jQuery.ajax
    $.ajax({
      type: "POST",
      url: "/deleteEmployee",
      data: formData,
      success: function (response) {
        // console.log(response);
        employeeID.innerHTML = response;
        deleteFormInput.reset();
        // alert("Employee deleted successfully!");
        // You can redirect the user to another page or update the DOM as needed
      },
      error: function (error) {
        console.error("Error deleting employee:", error);
        employeeID.innerHTML =
          "Employee does not exist with the given ID: " +
          formData.split("=")[1];
        deleteFormInput.reset();
        // alert("Error deleting employee. Please try again.");
      },
    });
  });

  // Get counts
  $.ajax({
    url: "/getCounts", // Updated the URL to the new route
    method: "GET",
    dataType: "json",
    success: function (data) {
      // console.log('Data received:', data);
      // Update the content of the span elements
      $("#employee_count").text(data.employeeCount);
      $("#department_count").text(data.departmentCount);
      $("#project_count").text(data.projectCount);
    },
    error: function (error) {
      console.error("Error fetching data:", error);
      // Handle the error (update other span elements if needed)
      $("#employee_count").text("Error fetching data");
      $("#department_count").text("Error fetching data");
      $("#project_count").text("Error fetching data");
    },
  });
});

// Function to display search results in the DOM
function displaySearchResults(results) {
  // console.log(results);
  const displayResultContainer = $("#displayResult");
  displayResultContainer.empty();

  if (results && results.length > 0) {
    const table = $("<table>").addClass("table");

    // Create table header
    const tableHeader = $("<thead>").append(
      $("<tr>").append(
        Object.keys(results[0]).map((header) => {
          const formattedHeader = formatColumnName(header);
          return $("<th>").text(formattedHeader);
        })
      )
    );
    table.append(tableHeader);

    // Create table body
    const tableBody = $("<tbody>").append(
      results.map((result) => {
        // Format dob and joining_date to yyyy-mm-dd
        const formattedResult = {
          ...result,
          dob: result.dob ? new Date(result.dob).toLocaleDateString() : "",
          joining_date: result.joining_date
            ? new Date(result.joining_date).toLocaleDateString()
            : "",
        };

        return $("<tr>").append(
          Object.keys(formattedResult).map((header) => {
            const formattedHeader = formatColumnName(header);
            return $("<td>").text(formattedResult[header]);
          })
        );
      })
    );
    table.append(tableBody);

    displayResultContainer.append(table);
  } else {
    displayResultContainer.text("No results found.");
  }
}

function formatColumnName(columnName) {
  // Custom replacements for specific column names
  const replacements = {
    fName: "First Name",
    lName: "Last Name",
    // Add more replacements as needed
  };

  // If there's a replacement, use it; otherwise, convert camel case to readable format
  const spacedName =
    replacements[columnName] ||
    columnName.replace(/_/g, " ").replace(/([a-z])([A-Z])/g, "$1 $2");

  // Capitalize the first letter
  return spacedName.charAt(0).toUpperCase() + spacedName.slice(1);
}
