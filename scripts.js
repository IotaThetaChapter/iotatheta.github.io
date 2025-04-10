// DARK MODE TOGGLE (Persistent + Labeled)
const toggleButton = document.getElementById("darkToggle");

// On page load, apply saved theme
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  document.body.classList.add("dark-mode");
  toggleButton.textContent = "Light Mode";
}

// Toggle button logic
toggleButton.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  if (document.body.classList.contains("dark-mode")) {
    localStorage.setItem("theme", "dark");
    toggleButton.textContent = "Light Mode";
  } else {
    localStorage.setItem("theme", "light");
    toggleButton.textContent = "Dark Mode";
  }
});
