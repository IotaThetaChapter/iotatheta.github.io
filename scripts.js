// --- DARK MODE LOGIC ---
const toggleButton = document.getElementById("darkToggle");
const body = document.body;

function applyTheme(theme) {
  if (theme === "dark") {
    body.classList.add("dark-mode");
    toggleButton.textContent = "Light Mode";
  } else {
    body.classList.remove("dark-mode");
    toggleButton.textContent = "Dark Mode";
  }
}

const savedTheme = localStorage.getItem("theme");
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

if (savedTheme) {
  applyTheme(savedTheme);
} else if (prefersDarkScheme.matches) {
  applyTheme("dark");
}

toggleButton.addEventListener("click", () => {
  if (body.classList.contains("dark-mode")) {
    applyTheme("light");
    localStorage.setItem("theme", "light");
  } else {
    applyTheme("dark");
    localStorage.setItem("theme", "dark");
  }
});

// --- LIGHTBOX GALLERY LOGIC ---

// 1. Create the Lightbox HTML dynamically
const lightboxHTML = `
  <div id="lightbox" class="lightbox-modal">
    <span class="close-lightbox">&times;</span>
    <span class="arrow prev">&#10094;</span>
    <img class="lightbox-content" id="lightbox-img" src="">
    <span class="arrow next">&#10095;</span>
  </div>
`;
document.body.insertAdjacentHTML('beforeend', lightboxHTML);

// 2. Select elements
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.close-lightbox');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

// 3. Find all images in the gallery or board grid
const images = document.querySelectorAll('.gallery-grid img, .board-grid img');
let currentIndex = 0;

// 4. Open Lightbox on click
images.forEach((img, index) => {
  img.addEventListener('click', () => {
    lightbox.style.display = "flex";
    lightboxImg.src = img.src;
    currentIndex = index;
  });
});

// 5. Navigation Functions
function showImage(index) {
  if (index >= images.length) currentIndex = 0; // Loop to start
  else if (index < 0) currentIndex = images.length - 1; // Loop to end
  else currentIndex = index;
  
  lightboxImg.src = images[currentIndex].src;
}

// 6. Event Listeners for controls
closeBtn.addEventListener('click', () => { lightbox.style.display = "none"; });

// Close if clicking outside the image
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) lightbox.style.display = "none";
});

nextBtn.addEventListener('click', () => { showImage(currentIndex + 1); });
prevBtn.addEventListener('click', () => { showImage(currentIndex - 1); });

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  if (lightbox.style.display === "flex") {
    if (e.key === "ArrowRight") showImage(currentIndex + 1);
    if (e.key === "ArrowLeft") showImage(currentIndex - 1);
    if (e.key === "Escape") lightbox.style.display = "none";
  }
});

// --- DYNAMIC CALENDAR NAVIGATION ---
const months = [
  { id: 'januaryView', name: 'January 2026' },
  { id: 'februaryView', name: 'February 2026' },
  { id: 'marchView', name: 'March 2026' },
  { id: 'aprilView', name: 'April 2026' }
];

let currentMonthIndex = 1; // Defaults to February since it's Feb 1st

function updateCalendar(index) {
  // Hide all monthly grids
  document.querySelectorAll('.calendar-view').forEach(view => view.classList.remove('active'));
  
  // Display the selected grid and update the heading
  const activeView = document.getElementById(months[index].id);
  if (activeView) {
    activeView.classList.add('active');
    document.getElementById('monthDisplay').textContent = months[index].name;
  }
}

// Support for Button Clicks
document.getElementById('prevMonth')?.addEventListener('click', () => {
  if (currentMonthIndex > 0) {
    currentMonthIndex--;
    updateCalendar(currentMonthIndex);
  }
});

document.getElementById('nextMonth')?.addEventListener('click', () => {
  if (currentMonthIndex < months.length - 1) {
    currentMonthIndex++;
    updateCalendar(currentMonthIndex);
  }
});

// Support for Keyboard Arrow Keys
document.addEventListener('keydown', (e) => {
  if (e.key === "ArrowLeft" && currentMonthIndex > 0) {
    currentMonthIndex--;
    updateCalendar(currentMonthIndex);
  } else if (e.key === "ArrowRight" && currentMonthIndex < months.length - 1) {
    currentMonthIndex++;
    updateCalendar(currentMonthIndex);
  }
});
