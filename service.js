const API = "http://localhost:3000/contacts";

function getContacts() {
    return fetch(API).then(r => r.json());
}

function addContact(contact) {
    return fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contact)
    });
}

function deleteContact(id) {
    return fetch(`${API}/${id}`, { method: "DELETE" });
}
