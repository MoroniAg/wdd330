import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter } from "./utils.mjs";

const dataSource = new ExternalServices("tents");
const element = document.querySelector(".product-list");

if (element) {
  const productList = new ProductList("tents", dataSource, element);
  productList.init();
}

loadHeaderFooter();