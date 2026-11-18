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
});