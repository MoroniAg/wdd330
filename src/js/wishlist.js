import { alertMessage, getLocalStorage, loadHeaderFooter, setLocalStorage } from "./utils.mjs";

const listElement = document.querySelector(".product-list");
const emptyMessage = document.querySelector(".wishlist-empty");

function getImage(product) {
  return product.Images?.PrimaryMedium
    || product.Images?.PrimaryLarge
    || product.Image
    || product.PrimaryLarge
    || "";
}

function getColor(product) {
  return product.Colors?.[0]?.ColorName || product.Color || "";
}

function getPrice(product) {
  return Number(product.FinalPrice ?? product.Price ?? product.ListPrice ?? 0);
}

function wishlistItemTemplate(product) {
  return `<li class="cart-card divider">
    <a href="../product_pages/index.html?product=${encodeURIComponent(product.Id)}" class="cart-card__image">
      <img src="${getImage(product)}" alt="${product.Name}" />
    </a>
    <a href="../product_pages/index.html?product=${encodeURIComponent(product.Id)}">
      <h2 class="card__name">${product.Name}</h2>
    </a>
    <p class="cart-card__color">${getColor(product)}</p>
    <p class="cart-card__price">$${getPrice(product).toFixed(2)}</p>
    <div class="wishlist-actions">
      <button class="wishlist-add-button" type="button" data-id="${product.Id}">Add to Cart</button>
      <button class="secondary-button wishlist-remove-button" type="button" data-id="${product.Id}">Remove</button>
    </div>
  </li>`;
}

function renderWishlist() {
  const wishlist = getLocalStorage("so-wishlist") || [];
  listElement.innerHTML = wishlist.map(wishlistItemTemplate).join("");
  emptyMessage.classList.toggle("hide", wishlist.length > 0);
}

function handleWishlistAction(event) {
  const button = event.target.closest("button[data-id]");
  if (!button) return;

  const productId = button.dataset.id;
  const wishlist = getLocalStorage("so-wishlist") || [];
  const product = wishlist.find((item) => item.Id === productId);
  if (!product) return;

  if (button.classList.contains("wishlist-add-button")) {
    const cart = getLocalStorage("so-cart") || [];
    cart.push(product);
    setLocalStorage("so-cart", cart);
    alertMessage(`${product.Name} has been added to your cart.`, false);
  }

  setLocalStorage(
    "so-wishlist",
    wishlist.filter((item) => item.Id !== productId)
  );
  renderWishlist();
}

listElement.addEventListener("click", handleWishlistAction);
renderWishlist();
loadHeaderFooter();
