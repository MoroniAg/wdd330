import { loadHeaderFooter } from "./utils.mjs";
import ShoppingCart from "./ShoppingCart.mjs";

const cartDataSource = {
  async getData() {
    return JSON.parse(localStorage.getItem("so-cart")) ?? [];
  },
};

const cart = new ShoppingCart(
  cartDataSource,
  document.querySelector(".product-list"),
  document.querySelector(".cart-footer")
);

cart.init();
loadHeaderFooter();
