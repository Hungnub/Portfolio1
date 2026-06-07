const header = document.querySelector(".site-header");
const table = document.querySelector(".rubric-table");
const tableButtons = document.querySelectorAll(".table-button");

function updateHeader() {
  header.dataset.elevated = window.scrollY > 48 ? "true" : "false";
}

tableButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const level = button.dataset.level;
    table.dataset.filter = level === "all" ? "" : level;

    tableButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
  });
});

window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();
