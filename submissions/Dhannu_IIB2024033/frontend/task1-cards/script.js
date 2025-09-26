const team = [
  { name: "Alice Johnson", role: "Frontend Engineer", photo: "https://i.pravatar.cc/150?img=1" },
  { name: "Bob Smith", role: "Backend Engineer", photo: "https://i.pravatar.cc/150?img=2" },
  { name: "Cathy Lee", role: "UI/UX Designer", photo: "https://i.pravatar.cc/150?img=3" },
  { name: "David Kim", role: "DevOps Specialist", photo: "https://i.pravatar.cc/150?img=4" },
  { name: "Esha Patel", role: "QA Engineer", photo: "https://i.pravatar.cc/150?img=5" },
  { name: "Frank Wright", role: "Project Manager", photo: "https://i.pravatar.cc/150?img=6" }
];

const container = document.getElementById("team-container");

team.forEach(member => {
  const col = document.createElement("div");
  col.className = "col-12 col-sm-6 col-md-4 col-lg-4";

  col.innerHTML = `
    <div class="card card-custom h-100 text-center p-3">
      <img src="${member.photo}" class="card-img-top" alt="${member.name}">
      <div class="card-body">
        <h5 class="card-title">${member.name}</h5>
        <p class="card-text">${member.role}</p>
        <button class="btn btn-outline-light mt-3 hover:scale-105 transition-transform">Connect</button>
      </div>
    </div>
  `;

  container.appendChild(col);
});
