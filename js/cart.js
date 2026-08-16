let cart = JSON.parse(localStorage.getItem("cart")) || [];
let coupon = null;

const cartItems = document.querySelector(".cart__items");

const subtotal = document.querySelector(".cart__subtotal");
const discount = document.querySelector(".cart__discount");
const delivery = document.querySelector(".cart__delivery");
const total = document.querySelector(".cart__total");

const couponInput = document.querySelector(".cart__coupon-input");
const couponButton = document.querySelector(".cart__coupon-button");
const couponMessage = document.querySelector(".cart__coupon-message");

const checkoutButton = document.querySelector(".cart__checkout");
const successBox = document.querySelector(".cart__success");
const closeButton = document.querySelector(".cart__success-close");

const deliveryFee = 15;

const coupons = {
    SAVE10: 10,
    SAVE20: 20,
};

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function getSubtotal() {
    let amount = 0;

    cart.forEach((item) => {
        amount += item.price * item.quantity;
    });

    return amount;
}

function getDiscount(amount) {
    if (!coupon) {
        return 0;
    }

    return amount * (coupons[coupon] / 100);
}

function updateTotal() {
    const amount = getSubtotal();
    const discountAmount = getDiscount(amount);

    let finalAmount = amount - discountAmount;

    if (cart.length > 0) {
        finalAmount += deliveryFee;
    }

    subtotal.textContent = `₹${amount.toFixed(2)}`;
    discount.textContent = `-₹${discountAmount.toFixed(2)}`;
    delivery.textContent = cart.length > 0 ? `₹${deliveryFee}` : "₹0";
    total.textContent = `₹${finalAmount.toFixed(2)}`;
}

function showCart() {
    cartItems.innerHTML = "";

    if (cart.length === 0) {
        cartItems.innerHTML = `
            <p class="cart__empty">Your cart is empty.</p>
        `;

        updateTotal();
        return;
    }

    cart.forEach((item) => {
        const product = document.createElement("article");

        product.classList.add("cart-item");

        product.innerHTML = `
            <div class="cart-item__image">
                <img src="${item.image}" alt="${item.name}">
            </div>

            <div class="cart-item__details">
                <h2 class="cart-item__name">
                    ${item.name}
                </h2>

                <p class="cart-item__size">
                    Size: <span>${item.size || "-"}</span>
                </p>

                <p class="cart-item__color">
                    Color: <span>${item.color || "-"}</span>
                </p>

                <p class="cart-item__price">
                    ₹${item.price}
                </p>
            </div>

            <button class="cart-item__remove" type="button">
                <img
                    src="./assets/icons/cart-page-icons/Vector (4).svg"
                    alt="remove-icon"
                />
            </button>

            <div class="cart-item__quantity">
                <button
                    class="cart-item__quantity-button cart-item__decrease"
                    type="button"
                >
                    -
                </button>

                <span class="cart-item__quantity-value">
                    ${item.quantity}
                </span>

                <button
                    class="cart-item__quantity-button cart-item__increase"
                    type="button"
                >
                    +
                </button>
            </div>
        `;

        const decrease = product.querySelector(".cart-item__decrease");
        const increase = product.querySelector(".cart-item__increase");
        const remove = product.querySelector(".cart-item__remove");

        decrease.addEventListener("click", () => {
            if (item.quantity > 1) {
                item.quantity--;

                saveCart();
                showCart();
            }
        });

        increase.addEventListener("click", () => {
            item.quantity++;

            saveCart();
            showCart();
        });

        remove.addEventListener("click", () => {
            cart = cart.filter((cartItem) => {
                return !(
                    cartItem.id === item.id &&
                    cartItem.color === item.color &&
                    cartItem.size === item.size
                );
            });

            saveCart();
            showCart();
        });

        cartItems.appendChild(product);
    });

    updateTotal();
}

couponButton.addEventListener("click", () => {
    const code = couponInput.value.trim().toUpperCase();

    if (code === "SAVE10" || code === "SAVE20") {
        coupon = code;

        couponMessage.textContent = `${code} applied successfully.`;

        updateTotal();
    } else {
        couponMessage.textContent = "Invalid promo code.";
    }
});

checkoutButton.addEventListener("click", () => {
    if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
    }

    successBox.style.display = "flex";
});

closeButton.addEventListener("click", () => {
    cart = [];

    localStorage.removeItem("cart");

    successBox.style.display = "none";

    showCart();

    window.location.href = "index.html";
});

showCart();
