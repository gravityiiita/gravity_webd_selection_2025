// --- Element Selection ---
// Get all the elements we will need to update
const usernameInput = document.getElementById("username-input");
const Searchbtn = document.querySelector(".Btn");
const statusMessage = document.getElementById("status-message");
const profileContainer = document.querySelector(".InfoBox");
const repoContainer = document.querySelector(".Repo-container");
const repohead = document.querySelector(".repohead");

const avatar = document.getElementById("avatar");
const nameField = document.getElementById("name");
const usernameDisplay = document.getElementById("username-display");
const bioField = document.getElementById("bio");
const reposField = document.getElementById("repos");
const followersField = document.getElementById("followers");
const followingField = document.getElementById("following");
const companyField = document.getElementById("company");
const profileLink = document.getElementById("profile-link");
const createdAtField = document.getElementById("created-at");

// --- Event Listener ---
// Listen for the Enter key press in the input field
usernameInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    const username = usernameInput.value.trim();
    if (username) {
      fetchRepos(username);
      fetchUser(username);
    }
  }
});

// Listen for click events on the search button
Searchbtn.addEventListener("click", function () {
  const username = usernameInput.value.trim();
  if (username) {
    fetchRepos(username);
    fetchUser(username);
  }else{
    statusMessage.textContent = "Please enter a username.";
    statusMessage.classList.add("red");
  }
});

async function fetchUser(username) {
  statusMessage.textContent = "Loading...";
  statusMessage.style.color = "white";
  profileContainer.classList.add("hidden");

  try {
    const response = await fetch(`https://api.github.com/users/${username}`);

    if (!response.ok) {
      throw new Error(
        response.status === 404 ? "User not found!" : "An error occurred."
      );
    }

    const data = await response.json();

    displayUser(data);
    saveToHistory(username);
    statusMessage.textContent = "";

  } catch (error) {
    statusMessage.textContent = error.message;
    statusMessage.style.color = "#ff6b6b";
  }
}

const fetchRepos = async (username) => {
  try {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch repositories");
    }

    const repos = await response.json();
    displayRepos(repos);
    console.log(repos);
  } catch (error) {
    console.error(error);
  }
};

const displayRepos = (repos) => {
  repohead.textContent = `Top Repositories (${repos.length}):`;
  if(repos.length === 0) {
    repoContainer.innerHTML = "<p class='no-repo'>No repositories found.</p>";
    return;
  }
  repoContainer.innerHTML = ""; 
  repos.forEach((repo) => {
    repoContainer.innerHTML += `
    <div class="repo" onClick="window.open('${repo.html_url}', '_blank')">
            <p class="repo-name">${repo.name}</p>
            <p class="repo-description">${repo.description || "No description available"}</p>
            <div class="repo-stats"> <p>
              Fork Count: <span id="forks">${repo.forks_count}</span>
            </p>
          <p> Language: <span id="language">${repo.language || "N/A"} </span></p>
        </div>
          </div>`
});
};

function displayUser(data) {
  avatar.src = data.avatar_url;

  avatar.alt = `${data.login}'s avatar`;

  nameField.textContent = data.name || "N/A";

  usernameDisplay.textContent = data.login;

  bioField.textContent = data.bio || "N/A";

  reposField.textContent = data.public_repos;

  followersField.textContent = data.followers;

  followingField.textContent = data.following;

  companyField.textContent = data.company || "N/A";

  profileLink.href = data.html_url;

  profileLink.textContent = data.html_url;

  createdAtField.textContent = new Date(data.created_at).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  profileContainer.classList.remove("hidden");
}

function saveToHistory(username) {
  let history = JSON.parse(localStorage.getItem("githubHistory")) || [];
  if (!history.includes(username)) {
    history.unshift(username);
    history = history.slice(0, 10); // Keep only the last 10 searches
    localStorage.setItem("githubHistory", JSON.stringify(history));
  }
}
