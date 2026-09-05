// ✅ Get club id from URL
const params = new URLSearchParams(window.location.search);
const clubId = params.get("id");

if (!clubId) {
  document.body.innerHTML = "<h2>No club selected</h2>";
  throw new Error("Missing club id");
}

// ✅ Fetch club details
async function fetchClub() {
  const { data, error } = await supabase
    .from("clubs")
    .select("id, name, description")
    .eq("id", clubId)
    .single();

  if (error) {
    console.error("Error loading club:", error);
    document.body.innerHTML = "<h2>Could not load club</h2>";
    return;
  }

  // ✅ Render details
  document.getElementById("clubName").textContent = data.name;
  document.getElementById("clubDescription").textContent = data.description;

  // ✅ Add Polls button dynamically
  const pollsBtn = document.createElement("a");
  pollsBtn.href = `polls.html?club=${data.id}`;
  pollsBtn.textContent = "Go to Polls";
  pollsBtn.className = "px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 ml-3";

  const header = document.getElementById("clubHeader");
  if (header) {
    header.appendChild(pollsBtn);
  }
}

document.addEventListener("DOMContentLoaded", fetchClub);

