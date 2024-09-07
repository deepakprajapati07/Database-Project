// Dropdown Controller

// Department Dropdown

// Fetch department data from JSON file and populate the dropdown
function populateDepartments() {
  const departmentDropdown = document.getElementById("department");

  // Load JSON data from the same directory
  fetch("departments.json")
    .then((response) => response.json())
    .then((data) => {
      data.departments.forEach((department) => {
        const option = document.createElement("option");
        option.value = department.value;
        option.text = department.label;
        departmentDropdown.appendChild(option);
      });
    })
    .catch((error) => console.error("Error loading department data:", error));
}

// Job Roles Dropdown

// Fetch job roles data from JSON file and populate the dropdown
function populateJobRoles() {
  const jobRoleDropdown = document.getElementById("jobRole");

  // Load JSON data from the same directory
  fetch("jobRoles.json")
    .then((response) => response.json())
    .then((data) => {
      data.jobRoles.forEach((role) => {
        const option = document.createElement("option");
        option.value = role.value;
        option.text = role.label;
        jobRoleDropdown.appendChild(option);
      });
    })
    .catch((error) => console.error("Error loading job roles data:", error));
}

// Update job roles based on the selected department
function updateJobRoles() {
  // Get the selected department value
  const selectedDepartment = document.getElementById("department").value;

  // Get the job role dropdown
  const jobRoleDropdown = document.getElementById("jobRole");

  // Clear existing options
  jobRoleDropdown.innerHTML =
    '<option value="" selected>Select Job Role</option>';

  // Load JSON data from the same directory
  fetch("jobRolesData.json")
    .then((response) => response.json())
    .then((data) => {
      // Populate job roles based on the selected department
      if (selectedDepartment && data.hasOwnProperty(selectedDepartment)) {
        const jobRoles = data[selectedDepartment];
        jobRoles.forEach((role) => {
          const option = document.createElement("option");
          option.value = role.short; // Set short name as the value
          option.text = role.full; // Set full name as the display text
          jobRoleDropdown.appendChild(option);
        });
      } else {
        // If no department is selected, populate all job roles
        populateJobRoles();
      }
    })
    .catch((error) => console.error("Error loading JSON data:", error));
}

// Call the function to update job roles when the department dropdown changes
document.getElementById("department").onchange = updateJobRoles;


// Project Dropdown

// Fetch project data from JSON file and populate the dropdown
function populateProjects() {
  const projectDropdown = document.getElementById("project");

  // Load JSON data from the same directory
  fetch("projects.json")
    .then((response) => response.json())
    .then((data) => {
      data.projects.forEach((project) => {
        const option = document.createElement("option");
        option.value = project.value;
        option.text = project.label;
        projectDropdown.appendChild(option);
      });
    })
    .catch((error) => console.error("Error loading project data:", error));
}


// Call the function to populate departments, job roles and projects when the page loads
window.onload = function () {
  populateDepartments();
  populateJobRoles();
  populateProjects();
};