const header = document.querySelector(".site-header");

function updateHeader() {
  header.dataset.elevated = window.scrollY > 48 ? "true" : "false";
}

window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();
