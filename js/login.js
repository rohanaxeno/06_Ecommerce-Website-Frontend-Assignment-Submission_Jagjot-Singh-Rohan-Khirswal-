const loginForm = document.querySelector(".login__form");
const emailInput = document.querySelector(".login__input[type='email']");
const passwordInput = document.querySelector(".login__input[type='password']");
const message = document.querySelector(".login__message");

const isLoggedIn = localStorage.getItem("isLoggedIn");
if (isLoggedIn === "true") {
    window.location.href = "index.html";
}
const email = "admin@axeno.co";
const password = "Test@123";

loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (emailInput.value === email && passwordInput.value === password) {
        localStorage.setItem("isLoggedIn", "true");

        window.location.href = "index.html";
    } else {
        message.textContent = "Invalid email or password.";
    }
});
