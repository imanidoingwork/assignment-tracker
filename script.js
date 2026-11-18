// VARIABLES: Connect HTML elements to JavaScript
let welcomeScreen = document.getElementById("welcomeScreen");
let infoScreen = document.getElementById("infoScreen");
let toInfoBtn = document.getElementById("toInfoBtn");

// EVENT: Runs when the user clicks the "Next" button
toInfoBtn.addEventListener("click", function() {
  // Hide the Welcome screen and show the Info screen
  welcomeScreen.classList.add("hidden");
  infoScreen.classList.remove("hidden");
});// VARIABLES: Connect the Folders screen and button
let foldersScreen = document.getElementById("foldersScreen");
let toFoldersBtn = document.getElementById("toFoldersBtn");

// EVENT: Runs when the user clicks "Go to Folders"
toFoldersBtn.addEventListener("click", function() {
  // Hide the Info screen and show the Folders screen
  infoScreen.classList.add("hidden");
  foldersScreen.classList.remove("hidden");
});// VARIABLES: Connect the Folder Detail screen, title, back button, and all folder buttons
let folderDetailScreen = document.getElementById("folderDetailScreen");
let selectedClassTitle = document.getElementById("selectedClassTitle");
let backToFoldersBtn = document.getElementById("backToFoldersBtn");
let folderButtons = document.querySelectorAll(".folder-btn");

// VARIABLE: Stores the name of whichever class folder is currently open
let currentClass = "";

// LOOP: Adds a click event to every class folder button
folderButtons.forEach(function(button) {
  button.addEventListener("click", function() {
    // Get the subject name from the clicked button's data-subject attribute
    currentClass = button.getAttribute("data-subject");

    // Update the heading on Screen 4 to match the clicked class
    selectedClassTitle.textContent = currentClass + " Assignments";

    // Hide the Folders screen and show the Folder Detail screen
    foldersScreen.classList.add("hidden");
    folderDetailScreen.classList.remove("hidden");
  });
});

// EVENT: Runs when the user clicks "Back to Folders"
backToFoldersBtn.addEventListener("click", function() {
  // Hide the Folder Detail screen and return to the Folders screen
  folderDetailScreen.classList.add("hidden");
  foldersScreen.classList.remove("hidden");
});