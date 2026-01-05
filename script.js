
const faqQuestions = document.querySelectorAll(".faq-question");

faqQuestions.forEach(question => {
  question.addEventListener("click", () => {
    faqQuestions.forEach(q => {
      if (q !== question) {
        q.nextElementSibling.style.display = "none";
      }
    });

    const answer = question.nextElementSibling;
    answer.style.display = answer.style.display === "block" ? "none" : "block";
  });
});


const container = document.getElementById("articlesContainer");
const reloadBtn = document.getElementById("reloadBtn");

async function loadArticles() {
  container.innerHTML = '<p class="loading">Loading articles...</p>';
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    if (!res.ok) throw new Error("Failed to fetch");
    const data = await res.json();

    container.innerHTML = "";
    data.slice(0, 4).forEach(post => {
      const div = document.createElement("div");
      div.className = "article";
      div.innerHTML = `
        <h3>${post.title}</h3>
        <p>${post.body.substring(0, 100)}...</p>
      `;
      container.appendChild(div);
    });
  } catch (error) {
    container.innerHTML = "<p>Error loading articles. Please try again.</p>";
  }
}

reloadBtn.addEventListener("click", loadArticles);
loadArticles();
