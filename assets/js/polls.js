// Supabase init
const SUPABASE_URL = "https://hfhvbvddffbezjecqusy.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhmaHZidmRkZmZiZXpqZWNxdXN5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg5NTUyNjMsImV4cCI6MjA3NDUzMTI2M30.6_n4KVqrK6KlivcrD5CQeAcp1Wr8Ng_8Jqp2e_uiviA";
const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// --- Elements
const pollQuestionInput = document.getElementById("pollQuestion");
const pollsList = document.getElementById("pollsList");
const addOptionBtn = document.getElementById("addOptionBtn");
const createPollBtn = document.getElementById("createPollBtn");

// --- Add new option input
addOptionBtn.addEventListener("click", () => {
  const input = document.createElement("input");
  input.type = "text";
  input.className = "pollOption";
  input.placeholder = `Option ${document.querySelectorAll(".pollOption").length + 1}`;
  document.body.insertBefore(input, createPollBtn);
});

// --- Create new poll
createPollBtn.addEventListener("click", async () => {
  const question = pollQuestionInput.value.trim();
  const options = Array.from(document.querySelectorAll(".pollOption"))
    .map(opt => opt.value.trim())
    .filter(v => v);

  if (!question || options.length < 2) {
    alert("Please enter a question and at least 2 options.");
    return;
  }

  const { data: poll, error: pollError } = await supabaseClient
    .from("polls")
    .insert([{ question }])
    .select()
    .single();

  if (pollError) {
    console.error(pollError);
    alert("Error creating poll");
    return;
  }

  const optionRows = options.map(text => ({ poll_id: poll.id, text }));
  await supabaseClient.from("poll_options").insert(optionRows);

  pollQuestionInput.value = "";
  document.querySelectorAll(".pollOption").forEach((opt, i) => {
    if (i < 2) opt.value = "";
    else opt.remove();
  });

  loadPolls();
});

// --- Load polls
async function loadPolls() {
  pollsList.innerHTML = "";
  const { data: polls, error } = await supabaseClient
    .from("polls")
    .select("id, question, poll_options (id, text, poll_votes (id))");

  if (error) {
    console.error(error);
    return;
  }

  polls.forEach(poll => {
    const div = document.createElement("div");
    div.className = "poll";
    div.innerHTML = `<h3>${poll.question}</h3>`;
    poll.poll_options.forEach(opt => {
      const votes = opt.poll_votes.length;
      const btn = document.createElement("button");
      btn.textContent = `${opt.text} (${votes})`;
      btn.onclick = () => vote(opt.id);
      div.appendChild(btn);
    });
    pollsList.appendChild(div);
  });
}

// --- Cast a vote
async function vote(optionId) {
  const { error } = await supabaseClient.from("poll_votes").insert([{ option_id: optionId }]);
  if (error) {
    console.error(error);
    alert("Error voting");
  } else {
    loadPolls();
  }
}

// Initial load
loadPolls();