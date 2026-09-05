// script.js
// Initialize Supabase client
console.log("✅ script.js loaded");

const SUPABASE_URL = "https://hfhvbvddffbezjecqusy.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhmaHZidmRkZmZiZXpqZWNxdXN5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg5NTUyNjMsImV4cCI6MjA3NDUzMTI2M30.6_n4KVqrK6KlivcrD5CQeAcp1Wr8Ng_8Jqp2e_uiviA";

const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/* -------------------- LOGIN -------------------- */
async function login(email, password) {
  const { data, error } = await supabaseClient.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    alert("Login failed: " + error.message);
    return;
  }

  alert("Login successful!");
  window.location.href = "index.html"; 
}

/* -------------------- SIGNUP -------------------- */
async function signup(email, password) {
  const { data, error } = await supabaseClient.auth.signUp({
    email,
    password,
  });

  if (error) {
    alert("Signup failed: " + error.message);
    return;
  }

  alert("Account created! Welcome to AnimeTracker 🎉");
  window.location.href = "index.html"; 
}

/* -------------------- CLUBS -------------------- */
async function loadClubs() {
  const { data: clubs, error } = await supabaseClient.from("clubs").select("*");

  if (error) {
    console.error("Error fetching clubs:", error);
    return;
  }

  const list = document.getElementById("clubs-list");
  if (!list) return; 
  list.innerHTML = "";

  clubs.forEach((club) => {
    const imgUrl = club.image_url
      ? club.image_url
      : "assets/images/default.jpg";

    const card = document.createElement("div");
    card.className = "club-card";
    card.innerHTML = `
      <img src="${imgUrl}" alt="${club.name}" class="thumb">
      <div class="card-body">
        <h3>${club.name}</h3>
        <p>${club.description}</p>
        <button class="btn btn-primary">Join Club</button>
      </div>
    `;
    list.appendChild(card);
  });
}

/* -------------------- CREATE CHARTS -------------------- */
function createCharts() {
  const textColor = getComputedStyle(document.body).getPropertyValue("--text-color").trim();
  const gridColor = getComputedStyle(document.body).getPropertyValue("--chart-grid").trim();

  // Pie Chart
  const pieCtx = document.getElementById("watchedChart");
  if (pieCtx) {
    new Chart(pieCtx, {
      type: "doughnut",
      data: {
        labels: ["Watched", "Remaining"],
        datasets: [{
          data: [247, 100],
          backgroundColor: ["#6c5ce7", "#dfe6e9"]
        }]
      },
      options: {
        responsive: false,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "bottom",
            labels: { color: textColor }
          }
        }
      }
    });
  }

  // Bar Chart
  const barCtx = document.getElementById("ratingChart");
  if (barCtx) {
    new Chart(barCtx, {
      type: "bar",
      data: {
        labels: ["1★", "2★", "3★", "4★", "5★"],
        datasets: [{
          label: "Number of Shows",
          data: [2, 5, 12, 30, 50],
          backgroundColor: "#6c5ce7"
        }]
      },
      options: {
        responsive: false,
        maintainAspectRatio: false,
        scales: {
          x: { ticks: { color: textColor }, grid: { color: gridColor } },
          y: { ticks: { color: textColor }, grid: { color: gridColor } }
        },
        plugins: {
          legend: {
            position: "bottom",
            labels: { color: textColor }
          }
        }
      }
    });
  }
}

/* -------------------- EVENT LISTENERS -------------------- */
document.addEventListener("DOMContentLoaded", () => {
  // Load clubs if needed
  if (document.getElementById("clubs-list")) {
    loadClubs();
  }

  // Login form
  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      login(email, password);
    });
  }

  // Signup form
  const signupForm = document.getElementById("signup-form");
  if (signupForm) {
    signupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("signup-email").value;
      const password = document.getElementById("signup-password").value;
      signup(email, password);
    });
  }

  // Apply saved theme
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-theme");
  }

  // Theme toggle button
  const toggleBtn = document.getElementById("theme-toggle");
  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      document.body.classList.toggle("dark-theme");

      if (document.body.classList.contains("dark-theme")) {
        toggleBtn.textContent = "☀️ Light Mode";
      } else {
        toggleBtn.textContent = "🌙 Dark Mode";
      }

      localStorage.setItem(
        "theme",
        document.body.classList.contains("dark-theme") ? "dark" : "light"
      );

      // Recreate charts with new theme colors
      document.querySelectorAll("canvas").forEach(c => {
        const newCanvas = c.cloneNode(true);
        c.parentNode.replaceChild(newCanvas, c);
      });
      createCharts();
    });
  }

  // Create charts on page load (if canvases exist)
  createCharts();
});