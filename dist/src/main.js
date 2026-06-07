const header = document.querySelector(".site-header");

function updateHeader() {
  header.dataset.elevated = window.scrollY > 48 ? "true" : "false";
}

window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

// PDF Preview Modal Logic
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("pdf-preview-modal");
  const modalTitle = document.getElementById("modal-title");
  const modalDownload = document.getElementById("modal-download");
  const modalClose = document.getElementById("modal-close");
  const iframe = document.getElementById("preview-iframe");
  const spinner = document.getElementById("preview-spinner");

  if (!modal || !iframe || !spinner) return;

  // Find all PDF links that don't have download attribute
  const pdfLinks = document.querySelectorAll('a[href$=".pdf"]:not([download])');

  // Open modal
  const openPreview = (e) => {
    e.preventDefault();
    const link = e.currentTarget;
    const pdfUrl = link.getAttribute("href");

    // Attempt to get a friendly title from parent elements
    const parentArticle = link.closest("article");
    let titleText = "Xem trước tài liệu";
    if (parentArticle) {
      const h3 = parentArticle.querySelector("h3");
      const label = parentArticle.querySelector(".project-topline span, span");
      if (h3) {
        titleText = h3.textContent.trim();
        if (label) {
          titleText = `${label.textContent.trim()}: ${titleText}`;
        }
      }
    }

    // Set content and state
    modalTitle.textContent = titleText;
    modalDownload.setAttribute("href", pdfUrl);
    
    // Show spinner & reset iframe state
    spinner.classList.remove("hidden");
    iframe.classList.remove("loaded");
    
    // Show modal
    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("preview-open");

    // Set iframe source to start loading
    iframe.src = pdfUrl;
  };

  // Close modal
  const closePreview = () => {
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("preview-open");
    
    // Delay resetting source to allow transition to complete
    setTimeout(() => {
      iframe.src = "";
      iframe.classList.remove("loaded");
      spinner.classList.remove("hidden");
    }, 300);
  };

  // Iframe load handler
  iframe.addEventListener("load", () => {
    // Check if iframe has a valid source (not empty reset)
    if (iframe.src && iframe.src !== window.location.href) {
      spinner.classList.add("hidden");
      iframe.classList.add("loaded");
    }
  });

  // Attach click listeners to PDF links
  pdfLinks.forEach(link => {
    link.addEventListener("click", openPreview);
  });

  // Close button click
  modalClose.addEventListener("click", closePreview);

  // Click outside modal to close
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closePreview();
    }
  });

  // Keyboard shortcut Esc to close
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      closePreview();
    }
  });
});

