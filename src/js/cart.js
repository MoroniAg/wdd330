import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") ?? [];
  const productList = document.querySelector(".product-list");
  const cartFooter = document.querySelector(".cart-footer");

  if (!cartItems.length) {
    productList.innerHTML = "";
    cartFooter.classList.add("hide");
    cartFooter.innerHTML = "";
    return;
  }

  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  productList.innerHTML = htmlItems.join("");

  const total = cartItems.reduce((sum, item) => sum + Number(item.FinalPrice || 0), 0);
  cartFooter.classList.remove("hide");
  cartFooter.innerHTML = `<p class="cart-total">Total: $${total.toFixed(2)}</p>`;
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

renderCartContents();
