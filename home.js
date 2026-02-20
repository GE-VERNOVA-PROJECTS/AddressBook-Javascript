const cards = document.getElementById("cards");
const count = document.getElementById("count");
const search = document.getElementById("search");
const sortBtn = document.getElementById("sortBtn");

let contacts = [];
let asc = true;

function loadContacts() {
    getContacts().then(data => {
        contacts = data;
        render(data);
    });
}

function render(list) {
    cards.innerHTML = "";
    count.innerText = list.length;

    list.forEach(c => {
        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <div class="avatar">${c.name[0]}</div>
            <h3>${c.name}</h3>
            <p>📞 ${c.phone}</p>
            <p>✉️ ${c.email}</p>
            <p>📍 ${c.city || ""}</p>
            <div class="actions">
                <button class="btn delete" onclick="remove(${c.id})">Delete</button>
            </div>
        `;

        cards.appendChild(card);
    });
}

search.addEventListener("input", e => {
    const v = e.target.value.toLowerCase();
    render(contacts.filter(c =>
        c.name.toLowerCase().includes(v) ||
        c.email.toLowerCase().includes(v)
    ));
});

sortBtn.addEventListener("click", () => {
    asc = !asc;
    sortBtn.innerText = asc ? "Sort A–Z" : "Sort Z–A";
    contacts.sort((a,b) =>
        asc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    );
    render(contacts);
});

function remove(id) {
    if (!confirm("Delete contact?")) return;
    deleteContact(id).then(loadContacts);
}

loadContacts();
