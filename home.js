const cards = document.getElementById("cards");
const count = document.getElementById("count");
const search = document.getElementById("search");
const sortBtn = document.getElementById("sortBtn");

let contacts = [];
let asc = true;

// LOAD CONTACTS
function loadContacts() {
  getContacts()
    .then(data => {
      contacts = data || [];
      render(contacts);
    })
    .catch(err => {
      console.error(err);
      cards.innerHTML = "<p>Error loading contacts</p>";
    });
}

// RENDER CARDS
function render(list) {
  cards.innerHTML = "";
  count.innerText = list.length;

  if (list.length === 0) {
    cards.innerHTML = "<p>No contacts found</p>";
    return;
  }

  list.forEach(c => {
    const card = document.createElement("div");
    card.className = "card";
    card.dataset.id = c.id; // 🔥 IMPORTANT

    const firstLetter = c.name ? c.name[0].toUpperCase() : "?";

    card.innerHTML = `
      <div class="avatar">${firstLetter}</div>
      <h3>${c.name || "No Name"}</h3>
      <p>📞 ${c.phone || "-"}</p>
      <p>✉️ ${c.email || "-"}</p>
      <p>📍 ${c.city || "-"}</p>
      <div class="actions">
        <button class="btn delete">Delete</button>
      </div>
    `;

    cards.appendChild(card);
  });
}

// 🔥 DELETE (EVENT DELEGATION)
cards.addEventListener("click", e => {
  if (e.target.classList.contains("delete")) {
    const card = e.target.closest(".card");
    const id = card.dataset.id;

    if (!confirm("Delete contact?")) return;

    deleteContact(id).then(loadContacts);
  }
});

// SEARCH
search.addEventListener("input", e => {
  const v = e.target.value.toLowerCase();
  render(
    contacts.filter(c =>
      (c.name || "").toLowerCase().includes(v) ||
      (c.email || "").toLowerCase().includes(v)
    )
  );
});

// SORT
sortBtn.addEventListener("click", () => {
  asc = !asc;
  sortBtn.innerText = asc ? "Sort A–Z" : "Sort Z–A";

  contacts.sort((a, b) => {
    const n1 = a.name || "";
    const n2 = b.name || "";
    return asc ? n1.localeCompare(n2) : n2.localeCompare(n1);
  });

  render(contacts);
});

loadContacts();
