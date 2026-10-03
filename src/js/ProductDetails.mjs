import { setLocalStorage, getLocalStorage, alertMessage } from "./utils.mjs";

export default class ProductDetails {
    constructor(productId, dataSource) {
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
    }

    async init() {

        this.product = await this.dataSource.findProductById(this.productId);
        this.renderProductDetails();
        document.getElementById("addToCart")
            .addEventListener("click", this.addProductToCart.bind(this));
        document.getElementById("addToWishlist")
            .addEventListener("click", this.toggleWishlist.bind(this));
        this.updateWishlistButton();
    }

    renderProductDetails() {
        const container = document.querySelector(".product-detail");
        if (!container) return;

        container.innerHTML = `
      <h3>${this.product.Brand}</h3>
      <h2 class="divider">${this.product.Name}</h2>
      <img class="divider" src="${this.product.PrimaryLarge}" alt="${this.product.Name}" />
      <p class="product-card__price">$${this.product.Price}</p>
      <p class="product__color">${this.product.Color}</p>
      <p class="product__description">${this.product.Description}</p>
      <div class="product-detail__add">
        <button id="addToCart" data-id="${this.product.Id}">Add to Cart</button>
        <button id="addToWishlist" class="secondary-button" type="button" aria-pressed="false">Add to Wishlist</button>
      </div>
    `;
    }

    addProductToCart() {
        const cart = getLocalStorage("so-cart") || [];
        cart.push(this.product);
        setLocalStorage("so-cart", cart);
        alertMessage(`${this.product.Name} has been added to your cart!`, false);
    }

    toggleWishlist() {
        const wishlist = getLocalStorage("so-wishlist") || [];
        const isSaved = wishlist.some((item) => item.Id === this.product.Id);
        const updatedWishlist = isSaved
            ? wishlist.filter((item) => item.Id !== this.product.Id)
            : [...wishlist, this.product];

        setLocalStorage("so-wishlist", updatedWishlist);
        this.updateWishlistButton();
        alertMessage(
            isSaved
                ? `${this.product.Name} has been removed from your wishlist.`
                : `${this.product.Name} has been added to your wishlist.`,
            false
        );
    }

    updateWishlistButton() {
        const wishlist = getLocalStorage("so-wishlist") || [];
        const isSaved = wishlist.some((item) => item.Id === this.product.Id);
        const button = document.getElementById("addToWishlist");

        button.textContent = isSaved ? "Remove from Wishlist" : "Add to Wishlist";
        button.setAttribute("aria-pressed", String(isSaved));
    }
}
