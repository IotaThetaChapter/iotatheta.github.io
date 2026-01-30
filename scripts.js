// Get DOM elements
const toggleButton = document.getElementById("darkToggle");
const body = document.body;

// Function to apply theme
function applyTheme(theme) {
  if (theme === "dark") {
    body.classList.add("dark-mode");
    toggleButton.textContent = "Light Mode";
  } else {
    body.classList.remove("dark-mode");
    toggleButton.textContent = "Dark Mode";
  }
}

// 1. Check LocalStorage
const savedTheme = localStorage.getItem("theme");

// 2. Check System Preference if no local storage is found
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

if (savedTheme) {
  applyTheme(savedTheme);
} else if (prefersDarkScheme.matches) {
  applyTheme("dark");
}

// 3. Toggle Button Logic
toggleButton.addEventListener("click", () => {
  if (body.classList.contains("dark-mode")) {
    applyTheme("light");
    localStorage.setItem("theme", "light");
  } else {
    applyTheme("dark");
    localStorage.setItem("theme", "dark");
  }
});
