document.addEventListener("DOMContentLoaded", async () => {
  const clubsList = document.getElementById("clubsList");
  const searchInput = document.getElementById("clubSearch");

  async function loadClubs(search = "") {
    let query = supabase.from("clubs").select("id, name, description");

    if (search) {
      query = query.ilike("name", `%${search}%`);
    }

    const { data, error } = await query;

    clubsList.innerHTML = "";

    if (error) {
      clubsList.innerHTML = `<p class="text-red-500">Error loading clubs: ${error.message}</p>`;
      return;
    }

    if (!data || data.length === 0) {
      clubsList.innerHTML = `<p class="text-gray-500 italic">No clubs found</p>`;
      return;
    }

    // Render each club card
    data.forEach(club => {
      const div = document.createElement("div");
      div.className =
        "p-4 border rounded-xl bg-white shadow hover:shadow-lg transition flex flex-col justify-between";

      div.innerHTML = `
        <div>
          <h2 class="text-lg font-semibold text-gray-800">${club.name}</h2>
          <p class="text-gray-600 text-sm mt-1">${club.description || ""}</p>
        </div>
        <a href="club.html?id=${club.id}" 
           class="mt-4 inline-block px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition">
          View
        </a>
        <a href="spoilers.html?id=1">Go to Spoilers</a>

      `;

      clubsList.appendChild(div);
    });
  }

  // Initial load
  loadClubs();

  // Search feature
  searchInput.addEventListener("input", (e) => {
    loadClubs(e.target.value.trim());
  });
});




  
