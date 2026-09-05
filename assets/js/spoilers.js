// ✅ Get club id from URL
const params = new URLSearchParams(window.location.search);
const clubId = params.get("id");

if (!clubId) {
  document.body.innerHTML = "<h2 class='text-center mt-10 font-bold'>Missing club id</h2>";
  throw new Error("Missing club id");
}

// ✅ Form submit
const spoilerForm = document.getElementById("spoilerForm");
const spoilerContent = document.getElementById("spoilerContent");
const spoilerMsg = document.getElementById("spoilerMsg");
const spoilersList = document.getElementById("spoilersList");

spoilerForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const content = spoilerContent.value.trim();
  if (!content) return;

  const { data, error } = await supabaseClient
    .from("spoilers")
    .insert([{ club_id: clubId, content }]);

  if (error) {
    console.error("Error posting spoiler:", error);
    spoilerMsg.textContent = "❌ Error posting spoiler.";
    return;
  }

  spoilerMsg.textContent = "✅ Spoiler posted!";
  spoilerContent.value = "";
  fetchSpoilers();
});

// ✅ Fetch spoilers
async function fetchSpoilers() {
  const { data, error } = await supabaseClient
    .from("spoilers")
    .select("id, content, created_at")
    .eq("club_id", clubId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching spoilers:", error);
    spoilersList.innerHTML = "<p class='text-red-500'>Error loading spoilers</p>";
    return;
  }

  if (!data.length) {
    spoilersList.innerHTML = "<p class='text-gray-500'>No spoilers yet.</p>";
    return;
  }

  spoilersList.innerHTML = data
    .map(
      (s) => `
      <div class="border p-3 rounded">
        <p>${s.content}</p>
        <span class="text-xs text-gray-400">Posted: ${new Date(s.created_at).toLocaleString()}</span>
      </div>
    `
    )
    .join("");
}

document.addEventListener("DOMContentLoaded", fetchSpoilers);