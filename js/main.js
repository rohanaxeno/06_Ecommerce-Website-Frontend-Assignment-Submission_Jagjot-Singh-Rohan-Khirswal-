import { products } from "./products.js";

const productGrid = document.querySelector(".product-card__grid");
const productGrid2 = document.querySelector(".product-card__grid2");
const productGrid3 = document.querySelector(".product-card__grid3");
const cartIcon = document.querySelector(".header__cart-icon");
const viewAll = document.querySelector(".product-card-section__viewAllButton1");
const viewAll2 = document.querySelector(
    ".product-card-section__viewAllButton2",
);

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

function renderProducts(grid, startlimit, endlimit) {
    if (!grid) return;

    grid.innerHTML = "";

    const productsToRender = products.slice(startlimit, endlimit);

    productsToRender.forEach((product) => {
        const productCard = document.createElement("article");

        productCard.classList.add("product-card");

        productCard.innerHTML = `
            <div class="product-card__image">
                <img src="${product.image}" alt="${product.name}">
            </div>

            <h4 class="product-card__title">${product.name}</h4>

            <div class="product-card__rating">
                <span>${starGenerator(product.rating)}</span>
                <span>${product.rating}/5</span>
            </div>

            <div class="product-card__price">
                <span>₹${product.price}</span>

                ${
                    product.oldPrice
                        ? `<span class="product-card__old-price">
                            ₹${product.oldPrice}
                           </span>`
                        : ""
                }

                ${
                    product.discount
                        ? `<span class="product-card__discount">
                            -${product.discount}%
                           </span>`
                        : ""
                }
            </div>
        `;

        productCard.addEventListener("click", () => {
            window.location.href = `product.html?id=${product.id}`;
        });

        grid.appendChild(productCard);
    });
}

if (productGrid) {
    renderProducts(productGrid, 0, 4);

    if (viewAll) {
        viewAll.addEventListener("click", () => {
            renderProducts(productGrid, 0, products.length);
            viewAll.style.display = "none";
        });
    }
}

if (productGrid2) {
    renderProducts(productGrid2, 4, 8);

    if (viewAll2) {
        viewAll2.addEventListener("click", () => {
            renderProducts(productGrid2, 0, products.length);
            viewAll2.style.display = "none";
        });
    }
}

if (productGrid3) {
    renderProducts(productGrid3, 2, 6);
}

cartIcon.addEventListener("click", () => {
    window.location.href = "cart.html";
});
