const posts = [
  {
    title: "Thiet ke dashboard de nguoi dung quet nhanh hon",
    tag: "Product",
    date: "07/06/2026",
    minutes: "6 phut doc",
    summary:
      "Nhung quy tac nho ve mat do thong tin, trang thai rong va cach giup user ra quyet dinh nhanh trong dashboard.",
  },
  {
    title: "Checklist truoc khi deploy mot website ca nhan len Vercel",
    tag: "Engineering",
    date: "31/05/2026",
    minutes: "4 phut doc",
    summary:
      "Tu metadata, anh Open Graph, responsive, den cach noi GitHub voi Vercel de moi lan push la co ban moi.",
  },
  {
    title: "Viet blog nhu mot cach lam ro suy nghi ky thuat",
    tag: "Notes",
    date: "18/05/2026",
    minutes: "5 phut doc",
    summary:
      "Mot bai viet khong can hoan hao ngay tu dau. Dieu quan trong la no giu lai quyet dinh, ly do va bai hoc.",
  },
  {
    title: "Khi nao nen tach component, khi nao nen de yen",
    tag: "Engineering",
    date: "04/05/2026",
    minutes: "7 phut doc",
    summary:
      "Cach nhin thuc dung ve abstraction: chi tach khi no giam nham lan, lap lai co y nghia, hoac bao ve hanh vi quan trong.",
  },
  {
    title: "Mot portfolio tot nen tra loi cau hoi nao?",
    tag: "Product",
    date: "22/04/2026",
    minutes: "5 phut doc",
    summary:
      "Nguoi xem muon biet ban lam duoc gi, cach ban nghi ra sao, va co nen bat dau mot cuoc tro chuyen voi ban khong.",
  },
  {
    title: "Ghi chu ngan ve toc do va su can than",
    tag: "Notes",
    date: "09/04/2026",
    minutes: "3 phut doc",
    summary:
      "Lam nhanh khong co nghia la bo qua chi tiet. Doi khi nhanh nhat la tao dung cau truc de it phai sua lai.",
  },
];

const postsEl = document.querySelector("#posts");
const filterButtons = document.querySelectorAll(".filter-button");
const header = document.querySelector(".site-header");

function renderPosts(activeFilter = "all") {
  const visiblePosts =
    activeFilter === "all" ? posts : posts.filter((post) => post.tag === activeFilter);

  postsEl.innerHTML = visiblePosts
    .map(
      (post) => `
        <article class="post-card">
          <div class="post-accent"></div>
          <div class="post-body">
            <div class="post-topline">
              <span class="post-tag">${post.tag}</span>
              <span>${post.date}</span>
              <span>${post.minutes}</span>
            </div>
            <h3>${post.title}</h3>
            <p>${post.summary}</p>
            <a class="post-link" href="mailto:hello@example.com?subject=${encodeURIComponent(
              post.title,
            )}">Hoi ve bai nay</a>
          </div>
        </article>
      `,
    )
    .join("");
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    renderPosts(button.dataset.filter);
  });
});

function updateHeader() {
  header.dataset.elevated = window.scrollY > 48 ? "true" : "false";
}

window.addEventListener("scroll", updateHeader, { passive: true });
renderPosts();
updateHeader();
