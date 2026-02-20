document.getElementById("contactForm").addEventListener("submit", e => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const email = document.getElementById("email").value.trim();
  const city = document.getElementById("city").value.trim();
  const address = document.getElementById("address").value.trim();

  if (!name || !phone || !email) {
    alert("Name, Phone and Email are required");
    return;
  }

  const contact = { name, phone, email, city, address };

  addContact(contact)
    .then(() => window.location.href = "home.html")
    .catch(err => alert("Failed to save contact"));
});
