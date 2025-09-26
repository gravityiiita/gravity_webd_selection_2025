async function fetchProfile() {
  const username = document.getElementById("username").value.trim();
  const card = document.getElementById("profile-card");
  const error = document.getElementById("error");
  const loader = document.getElementById("loader");

  card.classList.add("hidden");
  error.classList.add("hidden");

  if (!username) {
    error.textContent = "⚠️ Please enter a username";
    error.classList.remove("hidden");
    return;
  }

  loader.classList.remove("hidden");

  try {
    const res = await fetch(`https://api.github.com/users/${username}`);
    loader.classList.add("hidden");

    if (!res.ok) {
      error.textContent = "❌ User not found!";
      error.classList.remove("hidden");
      return;
    }

    const data = await res.json();
    card.innerHTML = `
      <img src="${data.avatar_url}" alt="${data.login}">
      <h2>${data.name || data.login}</h2>
      <p>📦 Public Repos: ${data.public_repos}</p>
      <p>👥 Followers: ${data.followers} | Following: ${data.following}</p>
      <p>📝 ${data.bio || "No bio available"}</p>
      <a href="${data.html_url}" target="_blank" 
         style="color:#00eaff; font-weight:bold; text-decoration:none;">🔗 View Profile</a>
    `;
    card.classList.remove("hidden");

  } catch (err) {
    loader.classList.add("hidden");
    error.textContent = "⚠️ Something went wrong. Try again!";
    error.classList.remove("hidden");
  }
}
