import { products } from "./products.js";

const params = new URLSearchParams(window.location.search);
const productId = Number(params.get("id"));

const product = products.find((item) => item.id === productId);

if (!product) {
    window.location.href = "index.html";
}

const title = document.querySelector(".product-details__title");
const rating = document.querySelector(".product-details__rating");
const currentPrice = document.querySelector(".product-details__current-price");
const oldPrice = document.querySelector(".product-details__old-price");
const discount = document.querySelector(".product-details__discount");
const description = document.querySelector(".product-details__description");
const mainImage = document.querySelector(".product-details__main-image img");
const thumbnails = document.querySelectorAll(".product-details__thumbnail img");
const colors = document.querySelectorAll(".product-details__color");
const sizes = document.querySelectorAll(".product-details__size");
const minusButton = document.querySelector("#quantity-decrease");
const plusButton = document.querySelector("#quantity-increase");
const quantityValue = document.querySelector("#quantity-value");
const addToCartButton = document.querySelector(".product-details__add-to-cart");
const cartIcon = document.querySelector(".header__cart-icon");
function starGenerator(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    let stars = "";

    for (let i = 0; i < fullStars; i++) {
        stars += "★";
    }

    if (hasHalfStar) {
        stars += "⯪";
    }

    return stars;
}

function renderProduct() {
    title.textContent = product.name;

    rating.innerHTML = `
        <span class="product-details__rating-stars">
            ${starGenerator(product.rating)}
        </span>
        <span>${product.rating}/5</span>
    `;

    currentPrice.textContent = `₹${product.price}`;

    description.textContent = product.description;

    mainImage.src = product.image;
    mainImage.alt = product.name;

    if (product.oldPrice) {
        oldPrice.textContent = `₹${product.oldPrice}`;
    } else {
        oldPrice.style.display = "none";
    }

    if (product.discount) {
        discount.textContent = `-${product.discount}%`;
    } else {
        discount.style.display = "none";
    }

    thumbnails.forEach((thumbnail) => {
        thumbnail.src = product.image;
        thumbnail.alt = product.name;
    });
}

renderProduct();

thumbnails.forEach((thumbnail) => {
    thumbnail.addEventListener("click", () => {
        mainImage.src = thumbnail.src;
    });
});

colors.forEach((color) => {
    color.addEventListener("click", () => {
        colors.forEach((item) => {
            item.classList.remove("active");
        });

        color.classList.add("active");
    });
});

sizes.forEach((size) => {
    size.addEventListener("click", () => {
        sizes.forEach((item) => {
            item.classList.remove("active");
        });

        size.classList.add("active");
    });
});

let quantity = 1;

minusButton.addEventListener("click", () => {
    if (quantity > 1) {
        quantity--;
        quantityValue.textContent = quantity;
    }
});

plusButton.addEventListener("click", () => {
    quantity++;
    quantityValue.textContent = quantity;
});

addToCartButton.addEventListener("click", () => {
    const selectedColor = document.querySelector(
        ".product-details__color.active",
    );

    const selectedSize = document.querySelector(
        ".product-details__size.active",
    );

    const cartItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: quantity,
        color: selectedColor ? selectedColor.classList[1] : null,
        size: selectedSize ? selectedSize.textContent.trim() : null,
    };

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingItem = cart.find(
        (item) =>
            item.id === cartItem.id &&
            item.color === cartItem.color &&
            item.size === cartItem.size,
    );

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push(cartItem);
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Product added to cart!");
});

cartIcon.addEventListener("click", () => {
    window.location.href = "cart.html";
});
