import { setLocalStorage, getLocalStorage } from "./utils.mjs";

export default class ProductDetails {
    constructor(productId, dataSource) {
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
    }

    async init() {

        this.product = await this.dataSource.findProductById(this.productId);
        this.renderProductDetails();
        document.getElementById('addToCart')
            .addEventListener('click', this.addProductToCart.bind(this));
    }

    renderProductDetails() {
        const container = document.querySelector(".product-detail");
        if (!container) return;

        container.innerHTML = `
      <h3>${this.product.Brand}</h3>
      <h2 class="divider">${this.product.Name}</h2>
      <img class="divider" src="${this.product.Image}" alt="${this.product.Name}" />
      <p class="product-card__price">$${this.product.Price}</p>
      <p class="product__color">${this.product.Color}</p>
      <p class="product__description">${this.product.Description}</p>
      <div class="product-detail__add">
        <button id="addToCart" data-id="${this.product.Id}">Add to Cart</button>
      </div>
    `;
    }

    addProductToCart() {
        const cart = getLocalStorage("so-cart") || [];
        cart.push(this.product);
        setLocalStorage("so-cart", cart);
        alert(`${this.product.Name} has been added to your cart!`);
    }
}
