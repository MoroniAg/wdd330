import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter } from "./utils.mjs";

const dataSource = new ProductData("tents");
const element = document.querySelector(".product-list");

if (element) {
  const productList = new ProductList("tents", dataSource, element);
  productList.init();
}

loadHeaderFooter();