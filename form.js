document.getElementById("contactForm").addEventListener("submit", e => {
    e.preventDefault();

    const contact = {
        name: name.value,
        phone: phone.value,
        email: email.value,
        city: city.value,
        address: address.value
    };

    addContact(contact).then(() => {
        window.location.href = "home.html";
    });
});
