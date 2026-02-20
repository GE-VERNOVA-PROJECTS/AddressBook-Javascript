const BASE_URL = "http://localhost:3000/contacts";

// GET all
function getContacts() {
  return fetch(BASE_URL).then(res => res.json());
}

// ADD
function addContact(contact) {
  return fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(contact)
  });
}

// DELETE
function deleteContact(id) {
  return fetch(`${BASE_URL}/${id}`, {
    method: "DELETE"
  });
}
