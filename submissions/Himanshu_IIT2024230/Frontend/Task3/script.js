const form = document.getElementById("searchForm");
const input = document.getElementById("usernameInput");
const profile = document.getElementById("profile");
const errorBox = document.getElementById("error");
const loading = document.getElementById("loading");
const historyList = document.getElementById("history");

form.addEventListener("submit", e => {
  e.preventDefault();
  const username = input.value.trim();
  if (!username) return;
  fetchProfile(username);
  addToHistory(username);
});

async function fetchProfile(username) {
  profile.classList.add("hidden");
  errorBox.textContent = "";
  loading.classList.remove("hidden");

  try {
    const res = await fetch(`https://api.github.com/users/${username}`);
    if (!res.ok) {
      throw new Error("User not found");
    }
    const data = await res.json();
    displayProfile(data);
  } catch (err) {
    errorBox.textContent = err.message;
  } finally {
    loading.classList.add("hidden");
  }
}

function displayProfile(user) {
  profile.innerHTML = `
    <img src="${user.avatar_url}" alt="avatar" />
    <h2>${user.name || "No Name"}</h2>
    <p>@${user.login}</p>
    <p>${user.bio || "No bio available"}</p>
    <div class="stats">
      <span>Repos: ${user.public_repos}</span>
      <span>Followers: ${user.followers}</span>
      <span>Following: ${user.following}</span>
    </div>
    <p><a href="${user.html_url}" target="_blank">View Profile</a></p>
  `;
  profile.classList.remove("hidden");
}

function addToHistory(username) {
  let history = JSON.parse(localStorage.getItem("gh-history")) || [];
  if (!history.includes(username)) {
    history.unshift(username);
    if (history.length > 5) history.pop();
    localStorage.setItem("gh-history", JSON.stringify(history));
  }
  renderHistory();
}

function renderHistory() {
  const history = JSON.parse(localStorage.getItem("gh-history")) || [];
  historyList.innerHTML = history.map(u => `<li>${u}</li>`).join("");
}

historyList.addEventListener("click", e => {
  if (e.target.tagName === "LI") {
    const username = e.target.textContent;
    input.value = username;
    fetchProfile(username);
  }
});


renderHistory();
