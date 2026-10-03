import {
  alertMessage,
  getLocalStorage,
  getParam,
  setLocalStorage,
} from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductDetails from "./ProductDetails.mjs";
import { loadHeaderFooter } from "./utils.mjs";

const productId = getParam("product");
const dataSource = new ExternalServices();

const productT = new ProductDetails(productId, dataSource);
productT.init();

document.getElementById("addToCart").addEventListener("click", async (event) => {
  const product = await dataSource.findProductById(event.currentTarget.dataset.id);
  const cart = getLocalStorage("so-cart") || [];
  cart.push(product);
  setLocalStorage("so-cart", cart);
  alertMessage(`${product.Name} has been added to your cart!`, false);
});

const wishlistButton = document.getElementById("addToWishlist");
const savedWishlist = getLocalStorage("so-wishlist") || [];
const isSaved = savedWishlist.some((item) => item.Id === wishlistButton.dataset.id);
wishlistButton.textContent = isSaved ? "Remove from Wishlist" : "Add to Wishlist";
wishlistButton.setAttribute("aria-pressed", String(isSaved));
wishlistButton.addEventListener("click", () => {
  const wishlist = getLocalStorage("so-wishlist") || [];
  const saved = wishlist.some((item) => item.Id === wishlistButton.dataset.id);

  if (saved) {
    setLocalStorage(
      "so-wishlist",
      wishlist.filter((item) => item.Id !== wishlistButton.dataset.id)
    );
  } else {
    const detail = document.querySelector(".product-detail");
    const priceText = detail.querySelector(".product-card__price").textContent;
    const product = {
      Id: wishlistButton.dataset.id,
      Name: detail.querySelector("h2").textContent,
      Brand: detail.querySelector("h3").textContent,
      Image: detail.querySelector("img").src,
      Colors: [{ ColorName: detail.querySelector(".product__color").textContent }],
      FinalPrice: Number(priceText.replace(/[^\d.]/g, "")),
      Description: detail.querySelector(".product__description").textContent,
    };
    setLocalStorage("so-wishlist", [...wishlist, product]);
  }

  const nowSaved = !saved;
  wishlistButton.textContent = nowSaved ? "Remove from Wishlist" : "Add to Wishlist";
  wishlistButton.setAttribute("aria-pressed", String(nowSaved));
  alertMessage(
    nowSaved ? "Added to your wishlist." : "Removed from your wishlist.",
    false
  );
});

loadHeaderFooter();
