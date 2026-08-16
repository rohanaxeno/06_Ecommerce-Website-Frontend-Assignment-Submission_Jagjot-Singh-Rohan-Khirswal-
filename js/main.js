import { products } from "./products.js";

const productGrid = document.querySelector(".product-card__grid");

function starGenerator(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    let stars = "";

    for (let i = 0; i < fullStars; i++) {
        stars += "⭐";
    }

    if (hasHalfStar) {
        stars += "⭐";
    }

    return stars;
}

function renderProducts() {
    productGrid.innerHTML = "";

    products.forEach((product) => {
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
                ? `<span class="product-card__old-price">₹${product.oldPrice}</span>`
                : ""
        }
        ${
            product.discount
                ? `<span class="product-card__discount">-${product.discount}%</span>`
                : ""
        }
      </div>
    `;

        productGrid.appendChild(productCard);
    });
}

renderProducts();
