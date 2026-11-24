// ==========================================
// 1. SCREEN NAVIGATION (Welcome -> Info -> Folders -> Folder Detail)
// ==========================================

// VARIABLES: Connect the screen containers and navigation buttons
let welcomeScreen = document.getElementById("welcomeScreen");
let infoScreen = document.getElementById("infoScreen");
let foldersScreen = document.getElementById("foldersScreen");
let folderDetailScreen = document.getElementById("folderDetailScreen");

let toInfoBtn = document.getElementById("toInfoBtn");
let toFoldersBtn = document.getElementById("toFoldersBtn");
let backToFoldersBtn = document.getElementById("backToFoldersBtn");
let selectedClassTitle = document.getElementById("selectedClassTitle");
let folderButtons = document.querySelectorAll(".folder-btn");

// VARIABLE: Tracks which class folder is currently open
let currentClass = "";

// EVENT: Move from Welcome screen to Info screen
toInfoBtn.addEventListener("click", function() {
  welcomeScreen.classList.add("hidden");
  infoScreen.classList.remove("hidden");
});

// EVENT: Move from Info screen to Folders screen
toFoldersBtn.addEventListener("click", function() {
  infoScreen.classList.add("hidden");
  foldersScreen.classList.remove("hidden");
});

// LOOP: Open the matching class screen when any folder is clicked
folderButtons.forEach(function(button) {
  button.addEventListener("click", function() {
    currentClass = button.getAttribute("data-subject");
    selectedClassTitle.textContent = currentClass + " Assignments";

    foldersScreen.classList.add("hidden");
    folderDetailScreen.classList.remove("hidden");

    // Show the assignments saved for this class
    displayAssignments();
  });
});

// EVENT: Return from a class folder back to the Folders screen
backToFoldersBtn.addEventListener("click", function() {
  folderDetailScreen.classList.add("hidden");
  foldersScreen.classList.remove("hidden");
});


// ==========================================
// 2. ADD, SORT & SAVE ASSIGNMENTS (Features 4 & 5)
// ==========================================

// VARIABLES: Connect the assignment form, inputs, and display list
let assignmentForm = document.getElementById("assignmentForm");
let assignmentNameInput = document.getElementById("assignmentName");
let assignmentDueDateInput = document.getElementById("assignmentDueDate");
let assignmentNotesInput = document.getElementById("assignmentNotes");
let assignmentList = document.getElementById("assignmentList");

// OBJECT: Load saved assignments from localStorage, or start with empty class lists
let savedData = localStorage.getItem("studentAssignments");
let assignmentsByClass = savedData ? JSON.parse(savedData) : {
  Math: [],
  ELA: [],
  Science: [],
  Spanish: [],
  History: [],
  PE: []
};

// EVENT: Runs when the user submits the assignment form
assignmentForm.addEventListener("submit", function(event) {
  // Stop the page from refreshing when submitting the form
  event.preventDefault();

  // Create an object holding the new assignment's details
  let newAssignment = {
    name: assignmentNameInput.value,
    dueDate: assignmentDueDateInput.value,
    notes: assignmentNotesInput.value
  };

  // Add the new assignment into the currently open class's list
  assignmentsByClass[currentClass].push(newAssignment);

  // SAVE: Store the updated assignments object in localStorage as a JSON string
  localStorage.setItem("studentAssignments", JSON.stringify(assignmentsByClass));

  // Clear the form inputs for the next assignment
  assignmentForm.reset();

  // Refresh the displayed list on screen
  displayAssignments();
});

// FUNCTION: Sorts and displays assignments for the currently open class
function displayAssignments() {
  // Clear any old cards currently shown
  assignmentList.innerHTML = "";

  // Get the array of assignments for the open class
  let classAssignments = assignmentsByClass[currentClass];

  // Sort assignments so the earliest due date appears first
  classAssignments.sort(function(a, b) {
    return a.dueDate.localeCompare(b.dueDate);
  });

  // Show a message if this class has no assignments yet
  if (classAssignments.length === 0) {
    assignmentList.innerHTML = "<p>No assignments yet for " + currentClass + ".</p>";
    return;
  }

  // LOOP: Create and display a card for each assignment in this class
  classAssignments.forEach(function(item) {
    let card = document.createElement("div");
    card.classList.add("assignment-card");

    card.innerHTML =
      "<h3>" + item.name + "</h3>" +
      "<p class='assignment-due'>Due: " + item.dueDate + "</p>" +
      "<p>" + item.notes + "</p>";

    assignmentList.appendChild(card);
  });
}// ==========================================
// 3. ADD CUSTOM CLASS FOLDERS (Feature 6)
// ==========================================

// VARIABLES: Connect the add-class form, input, and folder grid
let addClassForm = document.getElementById("addClassForm");
let newClassNameInput = document.getElementById("newClassName");
let folderGrid = document.getElementById("folderGrid");

// FUNCTION: Creates a new folder button and connects its click behavior
function createFolderButton(className) {
  let newBtn = document.createElement("button");
  newBtn.classList.add("folder-btn");
  newBtn.setAttribute("data-subject", className);
  newBtn.textContent = className;

  // Open this class folder when clicked
  newBtn.addEventListener("click", function() {
    currentClass = className;
    selectedClassTitle.textContent = currentClass + " Assignments";

    foldersScreen.classList.add("hidden");
    folderDetailScreen.classList.remove("hidden");

    displayAssignments();
  });

  folderGrid.appendChild(newBtn);
}

// STARTUP: Rebuild buttons for any custom classes saved in localStorage
let defaultClasses = ["Math", "ELA", "Science", "Spanish", "History", "PE"];
Object.keys(assignmentsByClass).forEach(function(className) {
  if (!defaultClasses.includes(className)) {
    createFolderButton(className);
  }
});

// EVENT: Runs when the user submits the "Add Class" form
addClassForm.addEventListener("submit", function(event) {
  event.preventDefault();

  let className = newClassNameInput.value.trim();

  // Stop if the box is empty or the class already exists
  if (className === "" || assignmentsByClass[className]) {
    alert("That class already exists or is empty!");
    return;
  }

  // Create an empty assignment list for the new class and save to localStorage
  assignmentsByClass[className] = [];
  localStorage.setItem("studentAssignments", JSON.stringify(assignmentsByClass));

  // Add the new folder button to the grid and clear the input
  createFolderButton(className);
  addClassForm.reset();
});